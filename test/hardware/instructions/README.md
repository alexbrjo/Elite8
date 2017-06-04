Instructions Tests
==================
All the instructions tests check values of registers and flags after each 
operation. Multiple paths through each operation are checked.

Jump, Call and Return operations
--------------------------------
JMP, CALL, RET <16 bit address>
- important to test PC of course and SP 

Addition Operations
-------------------
A = A + A, B, C, D, E, H, L, M or immed
- Check all flags
- Check value of Accumulation and read registers

Subtraction Operations
-------------------
A = A - A, B, C, D, E, H, L, M or immed
- Check all flags
- Check value of Accumulation and read registers

Boolean Operations
------------------
A [xor|or|and|cmp] A, B, C, D, E, H, L, M or immed
- Check all flags
- Check value of Accumulation and read registers
- Pay special attention to carry

Increment / Decrement Operations
--------------------------------
