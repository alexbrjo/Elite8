
operation[operation.NOP] = function () {};
operation[operation.HLT] = function () { /* wait for interrupt */ };
operation[0x00] = operation[0xFF];
operation[0x01] = operation[0xFF];

operation[operation.IN] = function () {};
operation[operation.OUT] = function () {};

operation[operation.EI] = function (reg) { reg.INTE = 1; reg.PC++; };
operation[operation.DI] = function (reg) { reg.INTE = 0; reg.PC++; };
