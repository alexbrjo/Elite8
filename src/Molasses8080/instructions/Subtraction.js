/* global operation */

/** Instruction:     SUB R                   Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: subtracts register R from A                             **/

/** SUB for register A */
operation[operation.SUB_A] = function (reg) {
    var diff = reg.A - reg.A;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register B */
operation[operation.SUB_B] = function (reg) {
    var diff = reg.A - reg.B;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register C */
operation[operation.SUB_C] = function (reg) {
    var diff = reg.A - reg.C;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register D */
operation[operation.SUB_D] = function (reg) {
    var diff = reg.A - reg.D;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register E */
operation[operation.SUB_E] = function (reg) {
    var diff = reg.A - reg.E;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register H */
operation[operation.SUB_H] = function (reg) {
    var diff = reg.A - reg.H;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register L */
operation[operation.SUB_L] = function (reg) {
    var diff = reg.A - reg.L;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUB for register M */
operation[operation.SUB_M] = function (reg) {
    var diff = reg.A - reg.M;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};

/** SUI for register immed */
operation[operation.SUI] = function (reg, a) {
    var diff = reg.A - a;
    
    if (diff < 0) {
        diff += 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.PARITY = diff % 2 === 0 ? 1 : 0;
    reg.ZERO = diff === 0 ? 1 : 0;
    reg.SIGN = 0;
    reg.A = diff;
};
