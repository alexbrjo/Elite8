/** Instruction:     CALL                    Opcode:         0x46         *
 *  Bytes:            3                      Alternatives:   0x56, 0x66,  *
 *  Affected flags:   -                                0x76, 0x4E, 0x5E,  *
 *                                                     0x6E, 0x7E         *
 *  Description: Push address to stack and JMP to immed address          **/
operation[0x46] = function (reg, l, h) {
    reg.PUSH();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x56] = operation[0x46];
operation[0x66] = operation[0x46];
operation[0x76] = operation[0x46];
operation[0x4E] = operation[0x46];
operation[0x5E] = operation[0x46];
operation[0x6E] = operation[0x46];
operation[0x7E] = operation[0x46];

/** Instruction:     CNC                     Opcode:         0x40         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: If carry = 0, push address and JMP to immed address     **/
operation[0x40] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3;
    }
};

/** Instruction:     CNZ                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if result flag <> 0                **/
operation[0x44] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP  if sign flag = 0 (positive)       **/
operation[0x48] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if parity = odd                    **/
operation[0x58] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if carry = 1                       **/
operation[0x60] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if result = 0                      **/
operation[0x68] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if sign = 1 (negative)             **/
operation[0x70] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if parity = even                   **/
operation[0x78] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};
