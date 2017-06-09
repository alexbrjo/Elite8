/** Loads B with R */
operation[operation.MOV_B_B] = function (reg) { reg.B = reg.B; reg.PC++;};
operation[operation.MOV_B_C] = function (reg) { reg.B = reg.C; reg.PC++;};
operation[operation.MOV_B_D] = function (reg) { reg.B = reg.D; reg.PC++;};
operation[operation.MOV_B_E] = function (reg) { reg.B = reg.E; reg.PC++;};
operation[operation.MOV_B_H] = function (reg) { reg.B = reg.H; reg.PC++;};
operation[operation.MOV_B_L] = function (reg) { reg.B = reg.L; reg.PC++;};
operation[operation.MOV_B_M] = function (reg) { reg.B = reg.M; reg.PC++;};
operation[operation.MOV_B_A] = function (reg) { reg.B = reg.A; reg.PC++;};

/** Loads C with R */
operation[operation.MOV_C_B] = function (reg) { reg.C = reg.B; reg.PC++;};
operation[operation.MOV_C_C] = function (reg) { reg.C = reg.C; reg.PC++;};
operation[operation.MOV_C_D] = function (reg) { reg.C = reg.D; reg.PC++;};
operation[operation.MOV_C_E] = function (reg) { reg.C = reg.E; reg.PC++;};
operation[operation.MOV_C_H] = function (reg) { reg.C = reg.H; reg.PC++;};
operation[operation.MOV_C_L] = function (reg) { reg.C = reg.L; reg.PC++;};
operation[operation.MOV_C_M] = function (reg) { reg.C = reg.M; reg.PC++;};
operation[operation.MOV_C_A] = function (reg) { reg.C = reg.A; reg.PC++;};

/** Loads D with R */
operation[operation.MOV_D_B] = function (reg) { reg.D = reg.B; reg.PC++;};
operation[operation.MOV_D_C] = function (reg) { reg.D = reg.C; reg.PC++;};
operation[operation.MOV_D_D] = function (reg) { reg.D = reg.D; reg.PC++;};
operation[operation.MOV_D_E] = function (reg) { reg.D = reg.E; reg.PC++;};
operation[operation.MOV_D_H] = function (reg) { reg.D = reg.H; reg.PC++;};
operation[operation.MOV_D_L] = function (reg) { reg.D = reg.L; reg.PC++;};
operation[operation.MOV_D_M] = function (reg) { reg.D = reg.M; reg.PC++;};
operation[operation.MOV_D_A] = function (reg) { reg.D = reg.A; reg.PC++;};

/** Loads E with R */
operation[operation.MOV_E_B] = function (reg) { reg.E = reg.B; reg.PC++;};
operation[operation.MOV_E_C] = function (reg) { reg.E = reg.C; reg.PC++;};
operation[operation.MOV_E_D] = function (reg) { reg.E = reg.D; reg.PC++;};
operation[operation.MOV_E_E] = function (reg) { reg.E = reg.E; reg.PC++;};
operation[operation.MOV_E_H] = function (reg) { reg.E = reg.H; reg.PC++;};
operation[operation.MOV_E_L] = function (reg) { reg.E = reg.L; reg.PC++;};
operation[operation.MOV_E_M] = function (reg) { reg.E = reg.M; reg.PC++;};
operation[operation.MOV_E_A] = function (reg) { reg.E = reg.A; reg.PC++;};

/** Loads H with R */
operation[operation.MOV_H_B] = function (reg) { reg.H = reg.B; reg.PC++;};
operation[operation.MOV_H_C] = function (reg) { reg.H = reg.C; reg.PC++;};
operation[operation.MOV_H_D] = function (reg) { reg.H = reg.D; reg.PC++;};
operation[operation.MOV_H_E] = function (reg) { reg.H = reg.E; reg.PC++;};
operation[operation.MOV_H_H] = function (reg) { reg.H = reg.H; reg.PC++;};
operation[operation.MOV_H_L] = function (reg) { reg.H = reg.L; reg.PC++;};
operation[operation.MOV_H_M] = function (reg) { reg.H = reg.M; reg.PC++;};
operation[operation.MOV_H_A] = function (reg) { reg.H = reg.A; reg.PC++;};

/** Loads L with R */
operation[operation.MOV_L_B] = function (reg) { reg.L = reg.B; reg.PC++;};
operation[operation.MOV_L_C] = function (reg) { reg.L = reg.C; reg.PC++;};
operation[operation.MOV_L_D] = function (reg) { reg.L = reg.D; reg.PC++;};
operation[operation.MOV_L_E] = function (reg) { reg.L = reg.E; reg.PC++;};
operation[operation.MOV_L_H] = function (reg) { reg.L = reg.H; reg.PC++;};
operation[operation.MOV_L_L] = function (reg) { reg.L = reg.L; reg.PC++;};
operation[operation.MOV_L_M] = function (reg) { reg.L = reg.M; reg.PC++;};
operation[operation.MOV_L_A] = function (reg) { reg.L = reg.A; reg.PC++;};

/** Loads M with R */
operation[operation.MOV_M_B] = function (reg) { reg.M = reg.B; reg.PC++;};
operation[operation.MOV_M_C] = function (reg) { reg.M = reg.C; reg.PC++;};
operation[operation.MOV_M_D] = function (reg) { reg.M = reg.D; reg.PC++;};
operation[operation.MOV_M_E] = function (reg) { reg.M = reg.E; reg.PC++;};
operation[operation.MOV_M_H] = function (reg) { reg.M = reg.H; reg.PC++;};
operation[operation.MOV_M_L] = function (reg) { reg.M = reg.L; reg.PC++;};
// MOV M M is HLT
operation[operation.MOV_M_A] = function (reg) { reg.M = reg.A; reg.PC++;};

/** Loads A with R */
operation[operation.MOV_A_B] = function (reg) { reg.A = reg.B; reg.PC++;};
operation[operation.MOV_A_C] = function (reg) { reg.A = reg.C; reg.PC++;};
operation[operation.MOV_A_D] = function (reg) { reg.A = reg.D; reg.PC++;};
operation[operation.MOV_A_E] = function (reg) { reg.A = reg.E; reg.PC++;};
operation[operation.MOV_A_H] = function (reg) { reg.A = reg.H; reg.PC++;};
operation[operation.MOV_A_L] = function (reg) { reg.A = reg.L; reg.PC++;};
operation[operation.MOV_A_M] = function (reg) { reg.A = reg.M; reg.PC++;};
operation[operation.MOV_A_A] = function (reg) { reg.A = reg.A; reg.PC++;};

/** Loads R with I */
operation[operation.MOV_B_I] = function (reg, a) { reg.B = a; reg.PC += 2;};
operation[operation.MOV_C_I] = function (reg, a) { reg.C = a; reg.PC += 2;};
operation[operation.MOV_D_I] = function (reg, a) { reg.D = a; reg.PC += 2;};
operation[operation.MOV_E_I] = function (reg, a) { reg.E = a; reg.PC += 2;};
operation[operation.MOV_H_I] = function (reg, a) { reg.H = a; reg.PC += 2;};
operation[operation.MOV_L_I] = function (reg, a) { reg.L = a; reg.PC += 2;};
operation[operation.MOV_M_I] = function (reg, a) { reg.M = a; reg.PC += 2;};
operation[operation.MOV_A_I] = function (reg, a) { reg.A = a; reg.PC += 2;};