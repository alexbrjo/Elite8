
operation[operation.SUI] = function (reg, a) { reg.A = reg.A - a; reg.PC += 2;};
operation[operation.SUB_B] = function (reg) { reg.A = reg.A - reg.B; reg.PC++;};
operation[operation.SUB_C] = function (reg) { reg.A = reg.A - reg.C; reg.PC++;};
operation[operation.SUB_D] = function (reg) { reg.A = reg.A - reg.D; reg.PC++;};
operation[operation.SUB_E] = function (reg) { reg.A = reg.A - reg.E; reg.PC++;};
operation[operation.SUB_H] = function (reg) { reg.A = reg.A - reg.H; reg.PC++;};
operation[operation.SUB_L] = function (reg) { reg.A = reg.A - reg.L; reg.PC++;};
operation[operation.SUB_M] = function (reg) { throw "Unsupported operation"; reg.PC++;};
operation[operation.SUB_A] = function (reg) { reg.A = reg.A - reg.A; reg.PC++;};

operation[operation.SBI] = function (reg, a){ reg.A = reg.A - a  - reg.CARRY; reg.PC += 2;};
operation[operation.SBB_B] = function (reg) { reg.A = reg.A - reg.B - reg.CARRY; reg.PC++;};
operation[operation.SBB_C] = function (reg) { reg.A = reg.A - reg.C - reg.CARRY; reg.PC++;};
operation[operation.SBB_D] = function (reg) { reg.A = reg.A - reg.D - reg.CARRY; reg.PC++;};
operation[operation.SBB_E] = function (reg) { reg.A = reg.A - reg.E - reg.CARRY; reg.PC++;};
operation[operation.SBB_H] = function (reg) { reg.A = reg.A - reg.H - reg.CARRY; reg.PC++;};
operation[operation.SBB_L] = function (reg) { reg.A = reg.A - reg.L - reg.CARRY; reg.PC++;};
operation[operation.SBB_M] = function (reg) { throw "Unsupported operation"; reg.PC++; };
operation[operation.SBB_A] = function (reg) { reg.A = reg.A - reg.A - reg.CARRY; reg.PC++;};
