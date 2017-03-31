
operation[operation.CALL] = function (reg, l, h) {
    reg.PUSH(l * 0x100 + h);
};

operation[0x56] = operation[operation.CALL];
operation[0x66] = operation[operation.CALL];
operation[0x76] = operation[operation.CALL];
operation[0x4E] = operation[operation.CALL];
operation[0x5E] = operation[operation.CALL];
operation[0x6E] = operation[operation.CALL];
operation[0x7E] = operation[operation.CALL];

operation[operation.CNC] = function (reg, l, h) {
    if (reg.CARRY === 0) {
        reg.PUSH(l * 0x100 + h);
    } else {
        reg.PC += 3;
    }
};

operation[operation.CNZ] = function (reg, l, h) {
    if (reg.ZERO === 0) {
        reg.PUSH(l * 0x100 + h);
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CP] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH(l * 0x100 + h);
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CPO] = function (reg, l, h) {
    if (reg.PARITY === 0) {
        reg.PUSH(l * 0x100 + h);
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CC] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.PUSH(l * 0x100 + h);
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CZ] = function (reg, l, h) {
    if (reg.ZERO === 1) {
        reg.PUSH(l * 0x100 + h);
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CM] = function (reg, l, h) {
    if (reg.SIGN === 1) {
        reg.PUSH(l * 0x100 + h);
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CPE] = function (reg, l, h) {
    if (reg.PARITY === 1) {
        reg.PUSH(l * 0x100 + h);
    } else { 
        reg.PC += 3; 
    }
};
