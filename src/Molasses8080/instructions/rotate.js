/** Instruction:     RLC                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A left                                **/
operation[0x02] = function () {};

/** Instruction:     RRC                     Opcode:         0x0A         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A right                               **/
operation[0x0A] = function () {};

/** Instruction:     RAL                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A left through CY                     **/
operation[0x12] = function () {};

/** Instruction:     RAR                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A right through CY                    **/
operation[0x1A] = function () {};
