
operation[operation.RET] = function (reg) { reg.POP(); };
operation[0xD9] = operation[operation.RET];

operation[operation.RNZ] = function (reg) {
    if (reg.ZERO === 0) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RNC] = function (reg) {
    if (reg.CARRY === 0) {
        reg.POP(); 
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RP] = function (reg) {
    if (reg.SIGN === 0) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RPO] = function (reg) {
    if (reg.PARITY === 0) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RC] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RZ] = function (reg, l, h) {
    if (reg.ZERO === 1) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RM] = function (reg, l, h) {
    if (reg.SIGN === 1) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

operation[operation.RPE] = function (reg, l, h) {
    if (reg.PARITY === 1) {
        reg.POP();
    } else {
        reg.PC += 3; 
    }
};

/** return to interrupt function TODO: implement */
operation[operation.RST_0] = function () {};
operation[operation.RST_1] = function () {};
operation[operation.RST_2] = function () {};
operation[operation.RST_3] = function () {};
operation[operation.RST_4] = function () {};
operation[operation.RST_5] = function () {};
operation[operation.RST_6] = function () {};
operation[operation.RST_7] = function () {};


