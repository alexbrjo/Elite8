
operation[operation.JMP] = function (reg, l, h) {
    reg.PC = l * 0x100 + h; 
};

operation[0x54] = operation[operation.JMP];
operation[0x64] = operation[operation.JMP];
operation[0x74] = operation[operation.JMP];
operation[0x4C] = operation[operation.JMP];
operation[0x5C] = operation[operation.JMP];
operation[0x6C] = operation[operation.JMP];
operation[0x7C] = operation[operation.JMP];

operation[operation.JNC] = function (reg, l, h) {
    if (reg.CARRY === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3;
};

operation[operation.JNZ] = function (reg, l, h) {
    if (reg.ZERO === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JP] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JPO] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JC] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JZ] = function (reg, l, h) {
    if (reg.RESULT === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JM] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};

operation[operation.JPE] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) 
        reg.PC = l * 0x100 + h; 
    reg.PC += 3; 
};
