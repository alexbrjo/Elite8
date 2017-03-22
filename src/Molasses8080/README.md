Sugar8080
=========
The global variables opcode and operation are doing the real heavy lifting here.
The Cpu uses the registers, opcodes and memory to complete an instruction set.

Name Refractor
--------------
The Processor simulator was renamed from Intel 8008 to follow the sweetener 
project module names. Ditched the following limitations of the 
Intel 8008 refractored:

1. 14-bit address bus -> upgrade to 16-bit
2. No flag register -> upgrade to complete flag register that model modern flag registers
3. No scratch-pad register stack -> Add stack for scratch-pad registers
