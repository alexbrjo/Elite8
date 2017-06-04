# Molasses8080

The global variables opcode and operation are doing the real heavy lifting here. The Cpu uses the registers, opcodes and memory to complete an instruction set.

## i8008 to i8080 Refractor

The Processor simulator was refactored from the Intel 8008 to Intel 8080 because the 8080 instruction set features more modern operations and less redundancy with input and output instructions

1. 14-bit address bus -&gt; upgrade to 16-bit
2. No flag register -&gt; upgrade to complete flag register that model modern flag registers
3. No scratch-pad register stack -&gt; Add stack for scratch-pad registers



