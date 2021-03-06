/** Add */
operation[operation.ADI]   = function (reg, a) { reg.A = reg.A + a; reg.PC += 2; };
operation[operation.ADD_B] = function (reg) { reg.A = reg.A + reg.B; reg.PC++; };
operation[operation.ADD_C] = function (reg) { reg.A = reg.A + reg.C; reg.PC++; };
operation[operation.ADD_D] = function (reg) { reg.A = reg.A + reg.D; reg.PC++; };
operation[operation.ADD_E] = function (reg) { reg.A = reg.A + reg.E; reg.PC++; };
operation[operation.ADD_H] = function (reg) { reg.A = reg.A + reg.H; reg.PC++; };
operation[operation.ADD_L] = function (reg) { reg.A = reg.A + reg.L; reg.PC++; };
operation[operation.ADD_M] = function (reg) { reg.A = reg.A + reg.M; reg.PC++; };
operation[operation.ADD_A] = function (reg) { reg.A = reg.A + reg.A; reg.PC++; };

/** Add with carry */
operation[operation.ADC_B] = function (reg) { reg.A = reg.A + reg.B + reg.CARRY; reg.PC++; };
operation[operation.ADC_C] = function (reg) { reg.A = reg.A + reg.C + reg.CARRY; reg.PC++; };
operation[operation.ADC_D] = function (reg) { reg.A = reg.A + reg.D + reg.CARRY; reg.PC++; };
operation[operation.ADC_E] = function (reg) { reg.A = reg.A + reg.E + reg.CARRY; reg.PC++; };
operation[operation.ADC_H] = function (reg) { reg.A = reg.A + reg.H + reg.CARRY; reg.PC++; };
operation[operation.ADC_L] = function (reg) { reg.A = reg.A + reg.L + reg.CARRY; reg.PC++; };
operation[operation.ADC_M] = function (reg) { reg.A = reg.A + reg.M + reg.CARRY; reg.PC++; };
operation[operation.ADC_A] = function (reg) { reg.A = reg.A + reg.A + reg.CARRY; reg.PC++; };
operation[operation.ADI]   = function (reg, a) { reg.A = reg.A + a + reg.CARRY; reg.PC += 2; };

/** Subtract */
operation[operation.SUB_B] = function (reg) { reg.A = reg.A - reg.B; reg.PC++; };
operation[operation.SUB_C] = function (reg) { reg.A = reg.A - reg.C; reg.PC++; };
operation[operation.SUB_D] = function (reg) { reg.A = reg.A - reg.D; reg.PC++; };
operation[operation.SUB_E] = function (reg) { reg.A = reg.A - reg.E; reg.PC++; };
operation[operation.SUB_H] = function (reg) { reg.A = reg.A - reg.H; reg.PC++; };
operation[operation.SUB_L] = function (reg) { reg.A = reg.A - reg.L; reg.PC++; };
operation[operation.SUB_M] = function (reg) { reg.A = reg.A - reg.M; reg.PC++; };
operation[operation.SUB_A] = function (reg) { reg.A = reg.A - reg.A; reg.PC++; };
operation[operation.SUI] = function (reg, a) { reg.A = reg.A - a; reg.PC += 2; };

/** Subtract with carry */
operation[operation.SBB_B] = function (reg) { reg.A = reg.A - reg.B - reg.CARRY; reg.PC++; };
operation[operation.SBB_C] = function (reg) { reg.A = reg.A - reg.C - reg.CARRY; reg.PC++; };
operation[operation.SBB_D] = function (reg) { reg.A = reg.A - reg.D - reg.CARRY; reg.PC++; };
operation[operation.SBB_E] = function (reg) { reg.A = reg.A - reg.E - reg.CARRY; reg.PC++; };
operation[operation.SBB_H] = function (reg) { reg.A = reg.A - reg.H - reg.CARRY; reg.PC++; };
operation[operation.SBB_L] = function (reg) { reg.A = reg.A - reg.L - reg.CARRY; reg.PC++; };
operation[operation.SBB_M] = function (reg) { reg.A = reg.A - reg.M - reg.CARRY; reg.PC++; };
operation[operation.SBB_A] = function (reg) { reg.A = reg.A - reg.A - reg.CARRY; reg.PC++; };
operation[operation.SBI] = function (reg, a){ reg.A = reg.A - a  - reg.CARRY; reg.PC += 2; };

/** and */
operation[operation.ANA_B] = function (reg) { reg.A = reg.A & reg.B; reg.PC++; };
operation[operation.ANA_C] = function (reg) { reg.A = reg.A & reg.C; reg.PC++; };
operation[operation.ANA_D] = function (reg) { reg.A = reg.A & reg.D; reg.PC++; };
operation[operation.ANA_E] = function (reg) { reg.A = reg.A & reg.E; reg.PC++; };
operation[operation.ANA_H] = function (reg) { reg.A = reg.A & reg.H; reg.PC++; };
operation[operation.ANA_L] = function (reg) { reg.A = reg.A & reg.L; reg.PC++; };
operation[operation.ANA_M] = function (reg) { reg.A = reg.A & reg.M; reg.PC++; };
operation[operation.ANA_A] = function (reg) { reg.A = reg.A & reg.A; reg.PC++; };
operation[operation.ANI] = function (reg, a){ reg.A = reg.A & a;     reg.PC += 2; };

/** xor */
operation[operation.XRA_B] = function (reg) { reg.A = reg.A ^ reg.B; reg.PC++; };
operation[operation.XRA_C] = function (reg) { reg.A = reg.A ^ reg.C; reg.PC++; };
operation[operation.XRA_D] = function (reg) { reg.A = reg.A ^ reg.D; reg.PC++; };
operation[operation.XRA_E] = function (reg) { reg.A = reg.A ^ reg.E; reg.PC++; };
operation[operation.XRA_H] = function (reg) { reg.A = reg.A ^ reg.H; reg.PC++; };
operation[operation.XRA_L] = function (reg) { reg.A = reg.A ^ reg.L; reg.PC++; };
operation[operation.XRA_M] = function (reg) { reg.A = reg.A ^ reg.M; reg.PC++; };
operation[operation.XRA_A] = function (reg) { reg.A = reg.A ^ reg.A; reg.PC++; };
operation[operation.XRI] = function (reg, a) { reg.A = reg.A ^ a; reg.PC += 2; };

/** or */
operation[operation.ORA_B] = function (reg) { reg.A = reg.A | reg.B; reg.PC++; };
operation[operation.ORA_C] = function (reg) { reg.A = reg.A | reg.C; reg.PC++; };
operation[operation.ORA_D] = function (reg) { reg.A = reg.A | reg.D; reg.PC++; };
operation[operation.ORA_E] = function (reg) { reg.A = reg.A | reg.E; reg.PC++; };
operation[operation.ORA_H] = function (reg) { reg.A = reg.A | reg.H; reg.PC++; };
operation[operation.ORA_L] = function (reg) { reg.A = reg.A | reg.L; reg.PC++; };
operation[operation.ORA_M] = function (reg) { reg.A = reg.A | reg.M; reg.PC++; };
operation[operation.ORA_A] = function (reg) { reg.A = reg.A | reg.A; reg.PC++; };
operation[operation.ORI] = function (reg, a) { reg.A = reg.A | a; reg.PC += 2; };

/** compare (take difference and set flags for result) */
operation[operation.CMP_B] = function (reg) { reg.byte(reg.A - reg.B); reg.PC++; };
operation[operation.CMP_C] = function (reg) { reg.byte(reg.A - reg.C); reg.PC++; };
operation[operation.CMP_D] = function (reg) { reg.byte(reg.A - reg.D); reg.PC++; };
operation[operation.CMP_E] = function (reg) { reg.byte(reg.A - reg.E); reg.PC++; };
operation[operation.CMP_H] = function (reg) { reg.byte(reg.A - reg.H); reg.PC++; };
operation[operation.CMP_L] = function (reg) { reg.byte(reg.A - reg.L); reg.PC++; };
operation[operation.CMP_M] = function (reg) { reg.byte(reg.A - reg.M); reg.PC++; };
operation[operation.CMP_A] = function (reg) { reg.byte(reg.A - reg.A); reg.PC++; };
operation[operation.CPI] = function (reg, a) { reg.A = reg.A - a; reg.PC += 2; };

/** Increment */
operation[operation.INR_B] = function (reg) { reg.B++; };
operation[operation.INR_C] = function (reg) { reg.C++; };
operation[operation.INR_D] = function (reg) { reg.D++; };
operation[operation.INR_E] = function (reg) { reg.E++; };
operation[operation.INR_H] = function (reg) { reg.H++; };
operation[operation.INR_L] = function (reg) { reg.L++; };
operation[operation.INR_M] = function (reg) { reg.M++; };
operation[operation.INR_A] = function (reg) { reg.A++; };

/** Decrement */
operation[operation.DCR_B] = function (reg) { reg.B--; };
operation[operation.DCR_C] = function (reg) { reg.C--; };
operation[operation.DCR_D] = function (reg) { reg.D--; };
operation[operation.DCR_E] = function (reg) { reg.E--; };
operation[operation.DCR_H] = function (reg) { reg.H--; };
operation[operation.DCR_L] = function (reg) { reg.L--; };
operation[operation.DCR_M] = function (reg) { reg.M--; };
operation[operation.DCR_A] = function (reg) { reg.A--; };

/** Rotate bits (w/ and w/o carry) */
operation[operation.RLC] = function (reg) { reg.A = (reg.A << 1) + Math.floor(reg.A / 128);  reg.PC++; };
operation[operation.RRC] = function (reg) { reg.A = (reg.A >>> 1) + 128 * (reg.A % 2); reg.PC++; };
operation[operation.RAL] = function (reg) { reg.A = reg.A << 1;  reg.PC++; };
operation[operation.RAR] = function (reg) { reg.A = reg.A >>> 1; reg.PC++; };
