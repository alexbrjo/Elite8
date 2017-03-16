/**
* The Intel 8008 instruction set: CPU control group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:   0x00, 0x01   *
 *  Affected flags:  none                                                 *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};

operation[0x00] = operation[0xFF];
operation[0x01] = operation[0xFF];
