
operation[operation.ADI]   = function (reg, a) { reg.A = reg.A + a; reg.PC += 2; };
operation[operation.ADD_B] = function (reg) { reg.A = reg.A + reg.B; reg.PC += 1; };
operation[operation.ADD_C] = function (reg) { reg.A = reg.A + reg.C; reg.PC += 1; };
operation[operation.ADD_D] = function (reg) { reg.A = reg.A + reg.D; reg.PC += 1; };
operation[operation.ADD_E] = function (reg) { reg.A = reg.A + reg.E; reg.PC += 1; };
operation[operation.ADD_H] = function (reg) { reg.A = reg.A + reg.H; reg.PC += 1; };
operation[operation.ADD_L] = function (reg) { reg.A = reg.A + reg.L; reg.PC += 1; };
operation[operation.ADD_M] = function (reg) { throw "Unsupported operation"; reg.PC += 1; };
operation[operation.ADD_A] = function (reg) { reg.A = reg.A + reg.A; reg.PC += 1; };

operation[operation.ADI]   = function (reg, a) { reg.A = reg.A + a + reg.CARRY; reg.PC += 2; };
operation[operation.ADC_B] = function (reg) { reg.A = reg.A + reg.B + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_C] = function (reg) { reg.A = reg.A + reg.C + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_D] = function (reg) { reg.A = reg.A + reg.D + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_E] = function (reg) { reg.A = reg.A + reg.E + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_H] = function (reg) { reg.A = reg.A + reg.H + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_L] = function (reg) { reg.A = reg.A + reg.L + reg.CARRY; reg.PC += 1; };
operation[operation.ADC_M] = function (reg) { throw "Unsupported operation"; reg.PC += 1; };
operation[operation.ADC_A] = function (reg) { reg.A = reg.A + reg.A + reg.CARRY; reg.PC += 1; };
