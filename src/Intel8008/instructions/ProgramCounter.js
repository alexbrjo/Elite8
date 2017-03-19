
/** Instruction:     JMP                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:   0x54, 0x64   *
 *  Affected flags:   -                                0x74, 0x4C, 0x5C   *
 *                                                     0x6C, 0x7C         *
 *  Description: uncoditionally jumps to an address                      **/
operation[operation.JMP] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x54] = operation[operation.JMP];
operation[0x64] = operation[operation.JMP];
operation[0x74] = operation[operation.JMP];
operation[0x4C] = operation[operation.JMP];
operation[0x5C] = operation[operation.JMP];
operation[0x6C] = operation[operation.JMP];
operation[0x7C] = operation[operation.JMP];

/** Instruction:     JNC                     Opcode:         0x40         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if carry flag = 0                                  **/
operation[operation.JNC] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

/** Instruction:     JNZ                     Opcode:         0x46         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result flag <> 0                                **/
operation[operation.JNZ] = function (reg, l, h) {
    if (reg.CARRY > 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign flag = 0 (positive)                        **/
operation[operation.JP] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = odd                                    **/
operation[operation.JPO] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if  carry = 1                                      **/
operation[operation.JC] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if zero = 1                                      **/
operation[operation.JZ] = function (reg, l, h) {
    if (reg.RESULT === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign = 1 (negative)                             **/
operation[operation.JM] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = even                                   **/
operation[operation.JPE] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};
