The Intel 8008 Instruction Chart
================================

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

The Lookup Chart
----------------
All operations are listed in their entirety except move operations and I/O 
because they're very redundant. Sugar Assembly uses a modified version of the
updated mnemonics (new) that more closely resembles modern x86 assembly.

|  Binary  | hex | old | new*| bytes | flags| Description                                   |
|----------|-----|-----|-----|-------|------|-----------------------------------------------|
|11 111 111|0xFF | HLT | HALT|   1   | none | unconditionally stops system process          |
|00 000 000|0x00 |     |     |   1   | none | alternate for HLT                             |
|00 000 001|0x01 |     |     |   1   | none | alternate for HLT                             |
|11 000 000|0xC0 | NOP | NOP |   1   | none | no operation                                  |
|01 000 100|0x44 | JMP | JMP |   3   | none | unconditionally jumps to immed 16-bit address |
|01 000 000|0x40 | JFC | JNC |   3   | none | jumps if carry = 0                            |
|01 001 000|0x48 | JFZ | JNZ |   3   | none | jumps if zero  = 0                            |
|01 010 000|0x50 | JFS | JP  |   3   | none | jumps if sign  = 0                            |
|01 011 000|0x58 | JFP | JPO |   3   | none | jumps if parity= 0                            |
|01 100 000|0x60 | JTC | JC  |   3   | none | jumps if carry = 1                            |
|01 101 000|0x68 | JTZ | JZ  |   3   | none | jumps if zero  = 1                            |
|01 110 000|0x70 | JTS | JM  |   3   | none | jumps if sign  = 1                            |
|01 111 000|0x78 | JTP | JPE |   3   | none | jumps if parity= 1                            |
|01 000 110|0x46 | CAL | CALL|   3   | none | unconditionally pushes to stack and jumps     |
|01 000 010|0x42 | CFC | CNC |   3   | none | calls if carry = 0                            |
|01 001 010|0x4A | CFZ | CNZ |   3   | none | calls if zero  = 0                            |
|01 010 010|0x52 | CFS | CP  |   3   | none | calls if sign  = 0                            |
|01 011 010|0x5A | CFP | CPO |   3   | none | calls if parity= 0                            |
|01 100 010|0x62 | CTC | CC  |   3   | none | calls if carry = 1                            |
|01 101 010|0x6A | CTZ | CZ  |   3   | none | calls if zero  = 1                            |
|01 110 010|0x72 | CTS | CM  |   3   | none | calls if sign  = 1                            |
|01 111 010|0x7A | CTP | CPE |   3   | none | calls if parity= 1                            |
|00 000 011|0x07 | RET | RET |   3   | none | unconditionally returns a stack level         |
|00 000 011|0x03 | RFC | RNC |   3   | none | returns if carry = 0                          |
|00 001 011|0x0B | RFZ | RNZ |   3   | none | returns if zero  = 0                          |
|00 010 011|0x13 | RFS | RP  |   3   | none | returns if sign  = 0                          |
|00 011 011|0x1B | RFP | RPO |   3   | none | returns if parity= 0                          |
|00 100 011|0x23 | RTC | RC  |   3   | none | returns if carry = 1                          |
|00 101 011|0x1B | RTZ | RZ  |   3   | none | returns if zero  = 1                          |
|00 110 011|0x33 | RTS | RM  |   3   | none | returns if sign  = 1                          |
|00 111 011|0x1B | RTP | RPE |   3   | none | returns if parity= 1                          |
|00 000 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 000000          |
|00 001 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 001000          |
|00 010 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 010000          |
|00 011 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 011000          |
|00 100 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 100000          |
|00 101 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 101000          |
|00 110 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 110000          |
|00 111 101|0x00 | RST | RST |   3   | none | call the subroutine at memory 111000          |
|01 000 000|0x00 | ADA |ADD A|   1   | all  | A = A + A                                     |
|01 000 001|0x00 | ADB |ADD B|   1   | all  | A = A + B                                     |
|01 000 010|0x00 | ADC |ADD C|   1   | all  | A = A + C                                     |
|01 000 011|0x00 | ADD |ADD D|   1   | all  | A = A + D                                     |
|01 000 100|0x00 | ADE |ADD E|   1   | all  | A = A + E                                     |
|01 000 101|0x00 | ADH |ADD H|   1   | all  | A = A + H                                     |
|01 000 110|0x00 | ADL |ADD L|   1   | all  | A = A + L                                     |
|01 000 111|0x00 | ADM |ADD M|   1   | all  | A = A + value at address M                    |
|01 000 000|0x00 | ADI | ADI |   2   | all  | A = A + immediate value                       |
|01 001 000|0x00 | ACA |ADC A|   1   | all  | A = Carry + A                                 |
|01 001 001|0x00 | ACB |ADC B|   1   | all  | A = Carry + B                                 |
|01 001 010|0x00 | ACC |ADC C|   1   | all  | A = Carry + C                                 |
|01 001 011|0x00 | ACD |ADC D|   1   | all  | A = Carry + D                                 |
|01 001 100|0x00 | ACE |ADC E|   1   | all  | A = Carry + E                                 |
|01 001 101|0x00 | ACH |ADC H|   1   | all  | A = Carry + H                                 |
|01 001 110|0x00 | ACL |ADC L|   1   | all  | A = Carry + L                                 |
|01 001 111|0x00 | ACM |ADC M|   1   | all  | A = Carry + value at address M                |
|01 001 000|0x00 | ACI | ACI |   2   | all  | A = Carry + immediate value                   |
|01 010 000|0x00 | SUA |SUB A|   1   | all  | A = A - A                                     |
|01 010 001|0x00 | SUB |SUB B|   1   | all  | A = A - B                                     |
|01 010 010|0x00 | SUC |SUB C|   1   | all  | A = A - C                                     |
|01 010 011|0x00 | SUD |SUB D|   1   | all  | A = A - D                                     |
|01 010 100|0x00 | SUE |SUB E|   1   | all  | A = A - E                                     |
|01 010 101|0x00 | SUH |SUB H|   1   | all  | A = A - H                                     |
|01 010 110|0x00 | SUL |SUB L|   1   | all  | A = A - L                                     |
|01 010 111|0x00 | SUM |SUB M|   1   | all  | A = A - value at address M                    |
|00 010 100|0x00 | SUI | SUI |   2   | all  | A = A - immediate value                       |
|10 011 000|0x00 | SBA |SBB A|   1   | all  | A = A - (Carry + A)                           |
|10 011 001|0x00 | SBB |SBB B|   1   | all  | A = A - (Carry + B)                           |
|10 011 010|0x00 | SBC |SBB C|   1   | all  | A = A - (Carry + C)                           |
|10 011 011|0x00 | SBD |SBB D|   1   | all  | A = A - (Carry + D)                           |
|10 011 100|0x00 | SBE |SBB E|   1   | all  | A = A - (Carry + E)                           |
|10 011 101|0x00 | SBH |SBB H|   1   | all  | A = A - (Carry + H)                           |
|10 011 110|0x00 | SBL |SBB L|   1   | all  | A = A - (Carry + L)                           |
|10 011 111|0x00 | SBM |SBB M|   1   | all  | A = A - (Carry + value at address M)          |
|00 011 100|0x00 | SBI | SBI |   2   | all  | A = A - (Carry + immediate value)             |
|10 100 000|0x00 | NDA |AND A|   1   | all  | A = A and A                                   |
|10 100 001|0x00 | NDB |AND B|   1   | all  | A = A and B                                   |
|10 100 010|0x00 | NDC |AND C|   1   | all  | A = A and C                                   |
|10 100 011|0x00 | NDD |AND D|   1   | all  | A = A and D                                   |
|10 100 100|0x00 | NDE |AND E|   1   | all  | A = A and E                                   |
|10 100 101|0x00 | NDH |AND H|   1   | all  | A = A and H                                   |
|10 100 110|0x00 | NDL |AND L|   1   | all  | A = A and L                                   |
|10 100 111|0x00 | NDM |AND M|   1   | all  | A = A and value at address M                  |
|00 100 100|0x00 | NDI | ANI |   2   | all  | A = A and immediate value                     |
|10 101 000|0x00 | XRA |XOR A|   1   | all  | A = A xor A                                   |
|10 101 001|0x00 | XRB |XOR B|   1   | all  | A = A xor B                                   |
|10 101 010|0x00 | XRC |XOR C|   1   | all  | A = A xor C                                   |
|10 101 011|0x00 | XRD |XOR D|   1   | all  | A = A xor D                                   |
|10 101 100|0x00 | XRE |XOR E|   1   | all  | A = A xor E                                   |
|10 101 101|0x00 | XRH |XOR H|   1   | all  | A = A xor H                                   |
|10 101 110|0x00 | XRL |XOR L|   1   | all  | A = A xor L                                   |
|10 101 111|0x00 | XRM |XOR M|   1   | all  | A = A xor value at address M                  |
|00 101 100|0x00 | XRI | ANI |   2   | all  | A = A xor immediate value                     |
|10 110 000|0x00 | ORA | OR A|   1   | all  | A = A or A                                    |
|10 110 001|0x00 | ORB | OR B|   1   | all  | A = A or B                                    |
|10 110 010|0x00 | ORC | OR C|   1   | all  | A = A or C                                    |
|10 110 011|0x00 | ORD | OR D|   1   | all  | A = A or D                                    |
|10 110 100|0x00 | ORE | OR E|   1   | all  | A = A or E                                    |
|10 110 101|0x00 | ORH | OR H|   1   | all  | A = A or H                                    |
|10 110 110|0x00 | ORL | OR L|   1   | all  | A = A or L                                    |
|10 110 111|0x00 | ORM | OR M|   1   | all  | A = A or value at address M                   |
|00 110 100|0x00 | ORI | ANI |   2   | all  | A = A or immediate value                      |
|10 111 000|0x00 | CRA |CMP A|   1   | all  | compare A and A, set flags                    |
|10 111 001|0x00 | CRB |CMP B|   1   | all  | compare A and B, set flags                    |
|10 111 010|0x00 | CRC |CMP C|   1   | all  | compare A and C, set flags                    |
|10 111 011|0x00 | CRD |CMP D|   1   | all  | compare A and D, set flags                    |
|10 111 100|0x00 | CRE |CMP E|   1   | all  | compare A and E, set flags                    |
|10 111 101|0x00 | CRH |CMP H|   1   | all  | compare A and H, set flags                    |
|10 111 110|0x00 | CRL |CMP L|   1   | all  | compare A and L, set flags                    |
|10 111 111|0x00 | CRM |CMP M|   1   | all  | compare A and value at address M, set flags   |
|00 111 100|0x00 | CRI | CPI |   2   | all  | compare A and immediate value, set flags      |
|00 000 010|0x00 | RLC | ROL |   1   | C    | Rotate bits in A left once                    |
|00 001 010|0x00 | RRC | ROR |   1   | C    | Rotate bits in A right once                   |
|00 010 010|0x00 | RAL | RCL |   1   | C    | Rotate A left through Carry once              |
|00 011 010|0x00 | RAR | RCR |   1   | C    | Rotate A right through Carry once             |
|01 00x xx1|0x00 | INP | IN  |   1   | C    | A = Port xxx                                  |
|01 xxy yy1|0x00 | OUT | OUT |   1   | C    | A = Port xxyyy = A(xx != 00)                  |
|11 xxx yyy|0x00 | Lxy |MOV x,y|1    | C    | set x to y                                    |
|11 xxx 111|0x00 | LxM |MOV x,M|1    | C    | set x to value at memory location M           |
|11 111 xxx|0x00 | LMx |MOV M,x|1    | C    | set value at memory location M to x           |
|00 xxx 110|0x00 | LxI |MVI x|   1   | C    | set x to immediate value                      |
|00 111 110|0x00 | LMI |MVI M|   1   | C    | set value at memory location M to immed value |
|00 000 000|0x00 | INA |INC A|   1   | SPZ  | Increment A                                   |
|00 001 000|0x00 | INB |INC B|   1   | SPZ  | Increment B                                   |
|00 010 000|0x00 | INC |INC C|   1   | SPZ  | Increment C                                   |
|00 011 000|0x00 | IND |INC D|   1   | SPZ  | Increment D                                   |
|00 100 000|0x00 | INE |INC E|   1   | SPZ  | Increment E                                   |
|00 101 000|0x00 | INH |INC H|   1   | SPZ  | Increment H                                   |
|00 110 000|0x00 | INL |INC L|   1   | SPZ  | Increment L                                   |
|00 111 000|0x00 | INM |INC M|   1   | SPZ  | Increment M                                   |
|00 000 001|0x00 | DCA |DEC A|   1   | SPZ  | Decrement A                                   |
|00 001 001|0x00 | DCB |DEC B|   1   | SPZ  | Decrement B                                   |
|00 010 001|0x00 | DCC |DEC C|   1   | SPZ  | Decrement C                                   |
|00 011 001|0x00 | DCD |DEC D|   1   | SPZ  | Decrement D                                   |
|00 100 001|0x00 | DCE |DEC E|   1   | SPZ  | Decrement E                                   |
|00 101 001|0x00 | DCH |DEC H|   1   | SPZ  | Decrement H                                   |
|00 110 001|0x00 | DCL |DEC L|   1   | SPZ  | Decrement L                                   |
|00 111 001|0x00 | DCM |DEC M|   1   | SPZ  | Decrement M                                   |

Sources / further reading
-------------------------
1. [An explanation of registers and opcode chart](en.wikichip.org/wiki/intel/mcs-8/isa)
2. [A 2D chart of 8008 opcodes in hex](pastraiser.com/cpu/i8008/i8008_opcodes.html)
3. [A 2D chart of 8080 opcodes in hex](http://pastraiser.com/cpu/i8080/i8080_opcodes.html)
4. [An attractive opcode list](petsd.net/8008.php)
