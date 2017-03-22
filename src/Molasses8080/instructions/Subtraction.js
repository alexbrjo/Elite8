/** SUI for register immed */
operation[operation.SUI] = function (reg, a) {
    reg.A = reg.A - a;
    reg.PC += 2; // next instruction, skip immed
};

/** SUB for register A */
operation[operation.SUB_A] = function (reg) {
    reg.A = reg.A - reg.A;
    reg.PC++;             // next instruction
};

/** SUB for register B */
operation[operation.SUB_B] = function (reg) {
    reg.A = reg.A - reg.B;
    reg.PC++;             // next instruction
};

/** SUB for register C */
operation[operation.SUB_C] = function (reg) {
    reg.A = reg.A - reg.C;
    reg.PC++;             // next instruction
};

/** SUB for register D */
operation[operation.SUB_D] = function (reg) {
    reg.A = reg.A - reg.D;
    reg.PC++;             // next instruction
};

/** SUB for register E */
operation[operation.SUB_E] = function (reg) {
    reg.A = reg.A - reg.E;
    reg.PC++;             // next instruction
};

/** SUB for register H */
operation[operation.SUB_H] = function (reg) {
    reg.A = reg.A - reg.H;
    reg.PC++;             // next instruction
};

/** SUB for register L */
operation[operation.SUB_L] = function (reg) {
    reg.A = reg.A - reg.L;
    reg.PC++;             // next instruction
};

/** SUB for register M */
operation[operation.SUB_M] = function (reg) {
    throw "Unsupported operation";
    reg.PC++;             // next instruction
};

/** SBI for register immed */
operation[operation.SBI] = function (reg, a) {
    reg.A = reg.A - a - reg.CARRY;
    reg.PC += 2; // next instruction, skip immed
};

/** SBB for register A */
operation[operation.SBB_A] = function (reg) {
    reg.A = reg.A - reg.A - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register B */
operation[operation.SBB_B] = function (reg) {
    reg.A = reg.A - reg.B - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register C */
operation[operation.SBB_C] = function (reg) {
    reg.A = reg.A - reg.C - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register D */
operation[operation.SBB_D] = function (reg) {
    reg.A = reg.A - reg.D - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register E */
operation[operation.SBB_E] = function (reg) {
    reg.A = reg.A - reg.E - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register H */
operation[operation.SBB_H] = function (reg) {
    reg.A = reg.A - reg.H - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register L */
operation[operation.SBB_L] = function (reg) {
    reg.A = reg.A - reg.L - reg.CARRY;
    reg.PC++;             // next instruction
};

/** SBB for register M */
operation[operation.SBB_M] = function (reg) {
    throw "Unsupported operation";
    reg.PC++;
};
