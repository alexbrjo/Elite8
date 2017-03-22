/** SUB for register A */
operation[operation.SUB_A] = function (reg) {
    reg.acc = reg.A - reg.A;
    reg.PC += 1;             // next instruction
};

/** SUB for register B */
operation[operation.SUB_B] = function (reg) {
    reg.acc = reg.A - reg.B;
    reg.PC += 1;             // next instruction
};

/** SUB for register C */
operation[operation.SUB_C] = function (reg) {
    reg.acc = reg.A - reg.C;
    reg.PC += 1;             // next instruction
};

/** SUB for register D */
operation[operation.SUB_D] = function (reg) {
    reg.acc = reg.A - reg.D;
    reg.PC += 1;             // next instruction
};

/** SUB for register E */
operation[operation.SUB_E] = function (reg) {
    reg.acc = reg.A - reg.E;
    reg.PC += 1;             // next instruction
};

/** SUB for register H */
operation[operation.SUB_H] = function (reg) {
    reg.acc = reg.A - reg.H;
    reg.PC += 1;             // next instruction
};

/** SUB for register L */
operation[operation.SUB_L] = function (reg) {
    reg.acc = reg.A - reg.L;
    reg.PC += 1;             // next instruction
};

/** SUB for register M */
operation[operation.SUB_M] = function (reg) {
    reg.acc = reg.A - reg.M;
    reg.PC += 1;             // next instruction
};

/** SUI for register immed */
operation[operation.SUI] = function (reg, a) {
    reg.acc = reg.A - a;
    reg.PC += 2; // next instruction, skip immed
};
