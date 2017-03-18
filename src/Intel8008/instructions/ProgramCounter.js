
/** Instruction:     JMP                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:   0x54, 0x64   *
 *  Affected flags:   -                                0x74, 0x4C, 0x5C   *
 *                                                     0x6C, 0x7C         *
 *  Description: uncoditionally jumps to an address                      **/
operation[0x44] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x54] = operation[0x44];
operation[0x64] = operation[0x44];
operation[0x74] = operation[0x44];
operation[0x4C] = operation[0x44];
operation[0x5C] = operation[0x44];
operation[0x6C] = operation[0x44];
operation[0x7C] = operation[0x44];

/** Instruction:     JNC                     Opcode:         0x40         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if carry flag = 0                                  **/
operation[0x40] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

/** Instruction:     JNZ                     Opcode:         0x46         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result flag <> 0                                **/
operation[0x46] = function (reg, l, h) {
    if (reg.CARRY > 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign flag = 0 (positive)                        **/
operation[0x50] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = odd                                    **/
operation[0x58] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if  carry = 1                                      **/
operation[0x60] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if zero = 1                                      **/
operation[0x68] = function (reg, l, h) {
    if (reg.RESULT === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign = 1 (negative)                             **/
operation[0x70] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = even                                   **/
operation[0x78] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};
