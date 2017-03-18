Intel 8008 Operation code chart
===============================
TODO: PROOFREAD

* Pre-reqs
  * microprocessors: registers, flags and memory

What are Opcodes?
-----------------
Microprocessors can't read if-else statements like you can. Microprocessors 
only understand pre-defined machine codes of 0s and 1s. The Intel 8008's opcodes 
are 8-bit and thus there can only be 256 of them. All opcodes have a binary 
translation, hexadecimal translation and a mnemonic (HLT, JMP, RET). Depending 
on the operation the opcode could have more than one byte of information and can 
affected flags.

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

1 Byte Instructions
------------------------
All data is stored as 8-bit binary integers and operations are no exception. 
Depending on the operation the instruction may take up 1 to 3 bytes of data. The 
first byte is always the operation code (listed below). Some operations do not 
require any other values and only take up this single byte.

The Second Operation Byte
-------------------------
The next byte is called the immediate value (immed). This is used in arithmetic
operations were a number is added to the accumulator.

Affected Flags
--------------
Flags are set as a result of arithmetic operations. For example when the math unit 
preforms "2 + 2" it will set carry to false, zero to false, sign to false and 
parity to true.

|  Binary  | hex | old | new | bytes | flags | Description                                        |
|----------|-----|-----|-----|-------|-------|----------------------------------------------------|
|11 111 111|0xFF | HLT | HLT |   1   | none  | unconditionally stops system process               |
|00 000 000|0x00 |     |     |   1   | none  | alternate for HLT                                  |
|00 000 001|0x01 |     |     |   1   | none  | alternate for HLT                                  |
|01 000 100|0x44 | JMP | JMP |   3   | none  | unconditionally jumps to immed 16-bit address      |
|01 000 000|0x40 | JFC | JNC |   3   | none  | jumps if carry = 0                                 |
|01 001 000|0x48 | JFZ | JNZ |   3   | none  | jumps if zero  = 0                                 |
|01 010 000|0x50 | JFS | JP  |   3   | none  | jumps if sign  = 0                                 |
|01 011 000|0x58 | JFP | JPO |   3   | none  | jumps if parity= 0                                 |
|01 100 000|0x60 | JTC | JC  |   3   | none  | jumps if carry = 1                                 |
|01 101 000|0x68 | JTZ | JZ  |   3   | none  | jumps if zero  = 1                                 |
|01 110 000|0x70 | JTS | JM  |   3   | none  | jumps if sign  = 1                                 |
|01 111 000|0x78 | JTP | JPE |   3   | none  | jumps if parity= 1                                 |
|01 000 110|0x46 | CAL | CALL|   3   | none  | unconditionally pushes onto the stack and jumps    |
|01 000 010|0x42 | CFC | CNC |   3   | none  | calls if carry = 0                                 |
|01 001 010|0x4A | CFZ | CNZ |   3   | none  | calls if zero  = 0                                 |
|01 010 010|0x52 | CFS | CP  |   3   | none  | calls if sign  = 0                                 |
|01 011 010|0x5A | CFP | CPO |   3   | none  | calls if parity= 0                                 |
|01 100 010|0x62 | CTC | CC  |   3   | none  | calls if carry = 1                                 |
|01 101 010|0x6A | CTZ | CZ  |   3   | none  | calls if zero  = 1                                 |
|01 110 010|0x72 | CTS | CM  |   3   | none  | calls if sign  = 1                                 |
|01 111 010|0x7A | CTP | CPE |   3   | none  | calls if parity= 1                                 |
|00 000 011|0x07 | RET | RET |   3   | none  | unconditionally returns a stack level              |
|00 000 011|0x03 | RFC | RNC |   3   | none  | returns if carry = 0                               |
|00 001 011|0x0B | RFZ | RNZ |   3   | none  | returns if zero  = 0                               |
|00 010 011|0x13 | RFS | RP  |   3   | none  | returns if sign  = 0                               |
|00 011 011|0x1B | RFP | RPO |   3   | none  | returns if parity= 0                               |
|00 100 011|0x23 | RTC | RC  |   3   | none  | returns if carry = 1                               |
|00 101 011|0x1B | RTZ | RZ  |   3   | none  | returns if zero  = 1                               |
|00 110 011|0x33 | RTS | RM  |   3   | none  | returns if sign  = 1                               |
|00 111 011|0x1B | RTP | RPE |   3   | none  | returns if parity= 1                               |
|01 000 000|0x00 | ADA |ADD A|   1   | all   | A = A + A                                          |
|01 000 001|0x00 | ADB |ADD B|   1   | all   | A = A + B                                          |
|01 000 010|0x00 | ADC |ADD C|   1   | all   | A = A + C                                          |
|01 000 011|0x00 | ADD |ADD D|   1   | all   | A = A + D                                          |
|01 000 100|0x00 | ADE |ADD E|   1   | all   | A = A + E                                          |
|01 000 101|0x00 | ADH |ADD H|   1   | all   | A = A + H                                          |
|01 000 110|0x00 | ADL |ADD L|   1   | all   | A = A + L                                          |
|01 000 111|0x00 | ADM |ADD M|   1   | all   | A = A + value at address                           |
|01 000 000|0x00 | ADI | ADI |   2   | all   | A = A + immediate value                            |
|01 001 000|0x00 | ACA |ADC A|   1   | all   | A = Carry + A                                      |
|01 001 001|0x00 | ACB |ADC B|   1   | all   | A = Carry + B                                      |
|01 001 010|0x00 | ACC |ADC C|   1   | all   | A = Carry + C                                      |
|01 001 011|0x00 | ACD |ADC D|   1   | all   | A = Carry + D                                      |
|01 001 100|0x00 | ACE |ADC E|   1   | all   | A = Carry + E                                      |
|01 001 101|0x00 | ACH |ADC H|   1   | all   | A = Carry + H                                      |
|01 001 110|0x00 | ACL |ADC L|   1   | all   | A = Carry + L                                      |
|01 001 111|0x00 | ACM |ADC M|   1   | all   | A = Carry + value at address                       |
|01 001 000|0x00 | ACI | ACI |   1   | all   | A = Carry + immediate value                        |

Sources / further reading
-------------------------
1. [An explanation of registers and opcode chart](en.wikichip.org/wiki/intel/mcs-8/isa)
2. [A 2D chart of opcodes in hex](pastraiser.com/cpu/i8008/i8008_opcodes.html)
3. [An attractive opcode list](petsd.net/8008.php)
