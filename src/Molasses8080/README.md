Molasses8080
============
The global variables opcode and operation are doing the real heavy lifting here.
The Cpu uses the registers, opcodes and memory to complete an instruction set.

i8008 to i8080 Refractor
------------------------
The Processor simulator was renamed from Intel 8008 to Molasses8080 because the
8080 instruction set features more modern operations and less redundancy with 
input and output instructions

1. 14-bit address bus -> upgrade to 16-bit
2. No flag register -> upgrade to complete flag register that model modern flag registers
3. No scratch-pad register stack -> Add stack for scratch-pad registers
