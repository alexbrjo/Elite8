
operation[operation.RET] = function (reg, l, h) { reg.POP(); reg.PC = l * 0xFF + h; };
operation[0x17] = operation[operation.RET];
operation[0x27] = operation[operation.RET];
operation[0x37] = operation[operation.RET];
operation[0x1F] = operation[operation.RET];
operation[0x2F] = operation[operation.RET];
operation[0x3F] = operation[operation.RET]; 
operation[0x4F] = operation[operation.RET];

operation[operation.RNZ] = function (reg, l, h) {
    if (reg.ZERO === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RNC] = function (reg, l, h) {
    if (reg.CARRY === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RP] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RPO] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RC] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RZ] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RM] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RPE] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RST_0] = function () {};
operation[operation.RST_1] = function () {};
operation[operation.RST_2] = function () {};
operation[operation.RST_3] = function () {};
operation[operation.RST_4] = function () {};
operation[operation.RST_5] = function () {};
operation[operation.RST_6] = function () {};
operation[operation.RST_7] = function () {};


