/**
* The Intel 8008 instruction set: Load group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
