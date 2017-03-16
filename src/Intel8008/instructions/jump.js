/**
* The Intel 8008 instruction set: Jump group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     JMP                     Opcode:         0x44         *
 *  Bytes:            1                      Alternatives:   0x54, 0x64   *
 *  Affected flags:   -                                0x74, 0x4C, 0x5C   *
 *                                                     0x6C, 0x7C         *
 *  Description: uncoditionally jumps to a certain line                  **/
operation[0x44] = function () {};

operation[0x54] = operation[0x44];
operation[0x64] = operation[0x44];
operation[0x74] = operation[0x44];
operation[0x4C] = operation[0x44];
operation[0x5C] = operation[0x44];
operation[0x6C] = operation[0x44];
operation[0x7C] = operation[0x44];

/** Instruction:     JNC                     Opcode:         0x40         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if carry flag = 0                                  **/
operation[0x40] = function () {};

/** Instruction:     JNZ                     Opcode:         0x44         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result flag <> 0                                **/
operation[0x44] = function () {};

/** Instruction:     JP                      Opcode:         0x48         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign flag = 0 (positive)                        **/
operation[0x48] = function () {};

/** Instruction:     JPO                     Opcode:         0x48         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = odd                                    **/
operation[0x58] = function () {};

/** Instruction:     JC                      Opcode:         0x60         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if  carry = 1                                      **/
operation[0x60] = function () {};

/** Instruction:     JZ                      Opcode:         0x68         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result = 0                                      **/
operation[0x68] = function () {};

/** Instruction:     JM                      Opcode:         0x70         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign = 1 (negative)                             **/
operation[0x70] = function () {};

/** Instruction:     JPE                     Opcode:         0x78         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = even                                   **/
operation[0x78] = function () {};
