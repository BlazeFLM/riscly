# Riscly

**Build with blocks. See the bits.** Riscly is a visual RISC-V playground for curious learners. Arrange instruction blocks, run them one step at a time, and see what changes inside a small computer.

## Try it

Open **[Riscly.html](Riscly.html)** in a modern browser, or serve the project locally with [Node.js](https://nodejs.org/) 22 or newer:

```sh
git clone https://github.com/BlazeFLM/riscly.git
cd riscly
npm start
```

Visit `http://localhost:4173`. No dependency installation or build step is required. Keep the HTML and its companion assets together when copying or hosting the app.

## What you can do

- Click or drag instruction blocks into a program and edit their registers, constants, and labels.
- Switch between blocks, generated assembly, and real 32-bit machine instructions.
- Run, pause, single-step, reset, and step backward through register and memory changes.
- Explore the same 32 bits in binary, hexadecimal, and signed decimal.
- Try arithmetic, bit manipulation, loops, and memory examples.
- Export `.s` assembly files. Programs also save in browser-local storage when available.

## The little computer

Riscly implements the instructions listed on pages 1–2 of the **CS 61C Reference Card v5.0.3**: the listed RV32I instructions, `mul`, and the listed pseudoinstructions, plus a label helper. Pseudoinstructions expand into real instructions before execution and encoding.

The learning sandbox has 32 32-bit integer registers, an immutable `x0`, and 4 KiB of little-endian data memory. `sp` starts at 4096, and code starts at byte address zero in separate instruction memory. Loads and stores check alignment and bounds. `ecall` and `ebreak` pause execution; there is no emulated operating system or system-call convention.

This is a block-to-assembly translator and instruction simulator, not a complete RISC-V toolchain or hardware emulator. Exported programs omit an environment-specific exit syscall. The [RISC-V ISA specification](https://docs.riscv.org/reference/isa/unpriv/rv32.html) is the encoding reference; the card's reversed ECALL/EBREAK immediates are corrected here.

## Development

```sh
npm test     # Instruction behavior and encoding checks
npm start    # Local static server; Ctrl+C to stop
```

The app uses browser APIs and plain HTML, CSS, and JavaScript. There are no npm dependencies, accounts, analytics, or backend services. See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow.

## Where next?

Start with a few instructions and reveal more as learners need them. Planned directions include prediction-before-stepping lessons, memory-mapped pixel art, animated data flow through the ALU, visible call frames, and an editable assembly view. Later lessons could introduce ASCII, floating point, and pipelining.

## Credits and licensing

Inspired by the block-based learning experiences of [Blockly](https://developers.google.com/blockly) and [Scratch](https://scratch.mit.edu/). Riscly uses its own block editor; it does not embed either project. Instruction coverage follows the CS 61C reference card.

A software license has not yet been selected. No third-party code or license is implied by these inspirations.
