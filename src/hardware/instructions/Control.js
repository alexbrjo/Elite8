
operation[operation.NOP] = function (reg) { reg.SP++; };
operation[operation.HLT] = function () { /* wait for interrupt */ };
operation[0x00] = operation[0xFF];
operation[0x01] = operation[0xFF];

operation[operation.IN] = function () {};
operation[operation.OUT] = function () {};

operation[operation.EI] = function (reg) { reg.ITRP = 1; reg.PC++; };
operation[operation.DI] = function (reg) { reg.ITRP = 0; reg.PC++; };

/** return to interrupt function TODO: implement */
operation[operation.RST_0] = function () {};
operation[operation.RST_1] = function () {};
operation[operation.RST_2] = function () {};
operation[operation.RST_3] = function () {};
operation[operation.RST_4] = function () {};
operation[operation.RST_5] = function () {};
operation[operation.RST_6] = function () {};
operation[operation.RST_7] = function () {};
