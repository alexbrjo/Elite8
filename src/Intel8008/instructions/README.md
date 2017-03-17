Intel 8008 Operation code chart
===============================
TODO: PROOFREAD

* Pre-reqs
  * microprocessors: registers, flags and memory

What are Opcodes?
-----------------
Microprocessors cannot read if-else statements or for-loops. Microprocessors 
only understand machine codes of 0s and 1s and the Intel 8008 is no exception.
The Intel 8008's opcodes are 8-bit and thus there can only be 256 of them. 
All opcodes have a binary translation, hexadecimal translation and a mnemonic 
(HLT, JMP, RET). Depending on the operation the opcode could have more than one 
byte of information and can affected flags.

Alternate Opcodes
-----------------
Some common operations are given several alternative machine codes. For example 
HLT, which halts the system process, assembles to 0xFF. So, if the processor 
reads the code 0xFF (0b11111111) it will halt. But if it reads the alternates, 
0x00 or 0x01, it will also halt. Why? To protect the processor from error. If 
the developer jumps the program counter out to a memory address that is not 
machine code the processor has a higher chance of stopping instead of executing 
a command (Designers figured that the patterns 00000000 and 00000001 were more 
common than others).

But the alternatives are not just a protection for programmer error. In the case
of a memory error (a 0 reading as a 1 or vice versa) 

Old and New Mnemonics
---------------------
In 1972 Intel released the first set of mnemonics for their assembly codes. All
the original mnemonics fit nicely into three characters. But later in 1975 when
the Intel 8080 was released the 8008 mnemonics were updated to more closely 
model the 8080's. The Sugar Assembler uses the new mnemonics because they are 
more readable and closer to modern day assembly.

Bytes
-----


Affect Flags
------------

| Binary | hex | old | new | bytes | flags | Description                                        |
|--------|-----|-----|-----|-------|-------|----------------------------------------------------|
|11111111|0xFF | HLT | HLT |   1   | none  | unconditionally stops system process               |
|00000000|0x00 |     |     |   1   | none  | alternate for HLT                                  |
|00000001|0x01 |     |     |   1   | none  | alternate for HLT                                  |
TODO: opcode chart

Sources / further reading
-------------------------
1. An explanation of registers and opcode chart: en.wikichip.org/wiki/intel/mcs-8/isa
2. A 2D chart of opcodes in hex: pastraiser.com/cpu/i8008/i8008_opcodes.html
3. An attractive opcode list: petsd.net/8008.php

