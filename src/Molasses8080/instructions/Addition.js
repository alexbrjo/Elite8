/** Add immed to A */
operation[operation.ADD_I] = function (reg, a) {
    reg.A = reg.A + a; // sum A and immediate value
    reg.PC += 2;         // next instruction, skip over immediate value
};

/* Add 'R' for A */
operation[operation.ADD_A] = function (reg) {
    reg.A = reg.A + reg.A; // sum A and A
    reg.PC += 1;             // next instruction
};

/* ADD 'R' for B */
operation[operation.ADD_B] = function (reg) {
    reg.A = reg.A + reg.B; // sum A and B
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for C */
operation[operation.ADD_C] = function (reg) {
    reg.A = reg.A + reg.C; // sum A and C
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for D */
operation[operation.ADD_D] = function (reg) {
    reg.A = reg.A + reg.D; // sum A and D
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for E */
operation[operation.ADD_E] = function (reg) {
    reg.A = reg.A + reg.E; // sum A and E
    reg.PC += 1;             // next instruction
};

/* ADD 'R' for H */
operation[operation.ADD_H] = function (reg) {
    reg.A = reg.A + reg.H; // sum A and H
    reg.PC += 1;             // next instruction
};

/* ADD 'R' for L */
operation[operation.ADD_L] = function (reg) {
    reg.A = reg.A + reg.L; // sum A and L
    reg.PC += 1;             // next instruction
};

/* ADD 'R' for M */
operation[operation.ADD_M] = function (reg) {
    throw "Unsupported operation";
    reg.PC += 1;             // next instruction
};

/* ADC 'R' for A */
operation[operation.ADC_A] = function (reg) {
    reg.A = reg.A + reg.A + reg.CARRY; // sum A and A
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for B */
operation[operation.ADC_B] = function (reg) {
    reg.A = reg.A + reg.B + reg.CARRY; // sum A and B
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for C */
operation[operation.ADC_C] = function (reg) {
    reg.A = reg.A + reg.C + reg.CARRY; // sum A and C
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for D */
operation[operation.ADC_D] = function (reg) {
    reg.A = reg.A + reg.D + reg.CARRY; // sum A and D
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for E */
operation[operation.ADC_E] = function (reg) {
    reg.A = reg.A + reg.E + reg.CARRY; // sum A and E
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for H */
operation[operation.ADC_H] = function (reg) {
    reg.A = reg.A + reg.H + reg.CARRY; // sum A and H
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for L */
operation[operation.ADC_L] = function (reg) {
    reg.A = reg.A + reg.L + reg.CARRY; // sum A and L
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for M */
operation[operation.ADC_M] = function (reg) {
    throw "Unsupported operation";
    reg.PC += 1;                // next instruction
};
