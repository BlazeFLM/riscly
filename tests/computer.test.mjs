import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import { randomUUID } from "node:crypto";

const html = readFileSync(new URL("../Riscly.html", import.meta.url), "utf8");
const source = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
const engine = source.slice(0, source.indexOf("const $"));
const { compile, Computer, makeBlock, catalog } = vm.runInNewContext(
  engine + ";({compile, Computer, makeBlock, catalog})",
  { crypto: { randomUUID } },
);
const b = (op, args = {}) => ({ ...makeBlock(op), ...args });
function run(blocks) {
  const program = compile(blocks);
  const computer = new Computer();
  while (!computer.halted && computer.steps < 100) computer.step(program);
  assert.ok(computer.halted, "Program should finish within 100 steps");
  return computer;
}

test("the browser script parses", () => {
  assert.doesNotThrow(() => new vm.Script(source));
});

test("all card instructions expand and encode", () => {
  assert.equal(Object.keys(catalog).length, 52);
  for (const op of Object.keys(catalog)) {
    if (op === "label") continue;
    assert.doesNotThrow(() => compile([
      b(op, { target: "end", imm: "1" }), b("label", { name: "end" }),
    ]), op);
  }
  assert.equal(compile([b("ecall")]).code[0].word, 0x73);
  assert.equal(compile([b("ebreak")]).code[0].word, 0x100073);
});

test("large immediates, overflow and x0 follow RV32 semantics", () => {
  const c = run([
    b("li", { rd: 0, imm: "42" }),
    b("li", { rd: 5, imm: "2147483647" }),
    b("addi", { rd: 6, rs1: 5, imm: "1" }),
  ]);
  assert.equal(c.regs[0], 0);
  assert.equal(c.regs[6], -2147483648);
  assert.throws(() => compile([b("addi", { imm: "2048" })]));
});

test("branches return to labels", () => {
  const c = run([
    b("li", { rd: 5, imm: "0" }), b("li", { rd: 6, imm: "5" }),
    b("label", { name: "loop" }), b("addi", { rd: 5, rs1: 5, imm: "1" }),
    b("blt", { rs1: 5, rs2: 6, target: "loop" }),
  ]);
  assert.equal(c.regs[5], 5);
  assert.equal(c.steps, 12);
});

test("memory is little-endian, signed loads extend, and steps reverse", () => {
  const c = run([
    b("li", { rd: 5, imm: "0x123456FF" }),
    b("sw", { rs1: 0, rs2: 5, imm: "0" }),
    b("lb", { rd: 6, rs1: 0, imm: "0" }),
    b("lbu", { rd: 7, rs1: 0, imm: "0" }),
  ]);
  assert.deepEqual([...c.mem.slice(0, 4)], [255, 86, 52, 18]);
  assert.equal(c.regs[6], -1);
  assert.equal(c.regs[7], 255);
  c.back(); c.back(); c.back();
  assert.deepEqual([...c.mem.slice(0, 4)], [0, 0, 0, 0]);
});
