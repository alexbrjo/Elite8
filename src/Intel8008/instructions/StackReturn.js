/** Instruction:     RET                     Opcode:         0x07         *
 *  Bytes:            3                      Alternatives:   0x17, 0x27,  *
 *  Affected flags:   -                                0x37, 0x1F, 0x2F,  *
 *                                                     0x3F, 0x4F         *
 *  Description: Unconditionally return, pop stack                       **/
operation[0x07] = function (reg, l, h) {
    reg.POP();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x17] = operation[0x46];
operation[0x27] = operation[0x46];
operation[0x37] = operation[0x46];
operation[0x1F] = operation[0x46];
operation[0x2F] = operation[0x46];
operation[0x3F] = operation[0x46]; 
operation[0x4F] = operation[0x46]; 

/** Instruction:     RNC                     Opcode:         0x03         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: If carry = 0, pop stack                                 **/
operation[0x03] = function (reg, l, h) {
    reg.POP();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

/** Instruction:     RNZ                     Opcode:         0x0E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if result flag <> 0                           **/
operation[0x0E] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RP                      Opcode:         0x13         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if sign flag = 0 (positive)                   **/
operation[0x13] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RPO                     Opcode:         0x1E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if parity = odd                               **/
operation[0x1E] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RC                      Opcode:         0x23         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if carry = 1                                  **/
operation[0x23] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RZ                      Opcode:         0x2E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if result = 0                                 **/
operation[0x2E] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RM                      Opcode:         0x33         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if sign = 1 (negative)                        **/
operation[0x33] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RPE                     Opcode:         0x3E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if parity = even                              **/
operation[0x3E] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RST A                   Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: Call the subroutine at memory (0-7b)000, up one stack   **/

// TODO unfamiliar with operation, leaving unimeplented
operation[0x05] = operation[0x03];
operation[0x15] = operation[0x13];
operation[0x25] = operation[0x23];
operation[0x3D] = operation[0x33];
operation[0x0D] = operation[0x0E];
operation[0x1D] = operation[0x1E];
operation[0x2D] = operation[0x2E];
operation[0x3D] = operation[0x3E];


