
operation[operation.NOP] = function (reg) { reg.SP++; };
operation[operation.HLT] = function () { /* wait for interrupt */ };
operation[0x00] = operation[0xFF];
operation[0x01] = operation[0xFF];

operation[operation.IN] = function () {};
operation[operation.OUT] = function () {};

operation[operation.EI] = function (reg) { reg.ITRP = 1; reg.PC++; };
operation[operation.DI] = function (reg) { reg.ITRP = 0; reg.PC++; };

/** return to interrupt function */
operation[operation.RST_0] = function (reg) { reg.PC = 0x00; };
operation[operation.RST_1] = function (reg) { reg.PC = 0x08; };
operation[operation.RST_2] = function (reg) { reg.PC = 0x10; };
operation[operation.RST_3] = function (reg) { reg.PC = 0x18; };
operation[operation.RST_4] = function (reg) { reg.PC = 0x20; };
operation[operation.RST_5] = function (reg) { reg.PC = 0x28; };
operation[operation.RST_6] = function (reg) { reg.PC = 0x30; };
operation[operation.RST_7] = function (reg) { reg.PC = 0x38; };
