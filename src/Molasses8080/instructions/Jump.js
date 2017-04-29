
operation[operation.JMP] = function (reg, l, h) {
    reg.PC = h * 0x100 + l;
};
operation[0xCB] = operation[operation.JMP];

operation[operation.JNC] = function (reg, l, h) {
    if (reg.CARRY === 0) 
        reg.PC = h * 0x100 + l; 
    else 
        reg.PC += 3;
};

operation[operation.JNZ] = function (reg, l, h) {
    if (reg.ZERO === 0) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JP] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JPO] = function (reg, l, h) {
    if (reg.PARITY === 0) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JC] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JZ] = function (reg, l, h) {
    if (reg.ZERO === 1) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JM] = function (reg, l, h) {
    if (reg.SIGN === 1) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};

operation[operation.JPE] = function (reg, l, h) {
    if (reg.PARITY === 1) 
        reg.PC = h * 0x100 + l; 
    else
        reg.PC += 3; 
};
