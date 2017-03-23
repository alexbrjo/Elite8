
operation[operation.CALL] = function (reg, l, h) {
    reg.PUSH();
    reg.PC = l * 0xFF + h; 
};

operation[0x56] = operation[operation.CALL];
operation[0x66] = operation[operation.CALL];
operation[0x76] = operation[operation.CALL];
operation[0x4E] = operation[operation.CALL];
operation[0x5E] = operation[operation.CALL];
operation[0x6E] = operation[operation.CALL];
operation[0x7E] = operation[operation.CALL];

operation[operation.CNC] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3;
    }
};

operation[operation.CNZ] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CP] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CPO] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CC] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else { 
        reg.PC += 3; 
    }
};

operation[operation.CZ] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CM] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.CPE] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; 
    } else { 
        reg.PC += 3; 
    }
};
