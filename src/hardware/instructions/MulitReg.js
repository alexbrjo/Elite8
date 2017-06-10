
operation[operation.XCHG] = function (reg) {
    var x = reg.H;
    var y = reg.L;
    reg.H = reg.D;
    reg.L = reg.E;
    reg.D = x;
    reg.E = y;
};

operation[operation.XTHL] = function (reg) {
    var x = reg.H;
    reg.SP = reg.H + reg.L * 256;
    reg.H = x % 256;
    reg.L = Math.floor(x / 256);
};

operation[operation.SPHL] = function (reg) { reg.SP = reg.H + reg.L * 256; };
operation[operation.PCHL] = function (reg) { reg.PC = reg.H + reg.L * 256; };

operation[operation.STAX_B] = function (reg) {
    var add = reg.B + reg.C * 256;
    reg.memory.write(add, Math.floor(reg.A / 256));
    reg.memory.write(add + 1, reg.A % 256);
};

operation[operation.STAX_D] = function (reg) {
    var add = reg.D + reg.E * 256;
    reg.memory.write(add, Math.floor(reg.A / 256));
    reg.memory.write(add + 1, reg.A % 256);
};

operation[operation.LDAX_B] = function (reg) {
    var add = reg.B + reg.C * 256;
    reg.A = reg.memory.read(add) + reg.memory.read(add + 1);
};

operation[operation.LDAX_D] = function (reg) {
    var add = reg.D + reg.E * 256;
    reg.A = reg.memory.read(add) + reg.memory.read(add + 1);
};

operation[operation.SHLD] = function (reg, l, h) {
    var add = h * 256 + l;
    reg.memory.write(add, H);
    reg.memory.write(add + 1, L);
};

operation[operation.LHLD] = function (reg, l, h) {
    var add = h * 256 + l;
    reg.L = reg.memory.read(add);
    reg.H = reg.memory.read(add + 1);
};

operation[operation.STA] = function (reg, l, h) {
    var add = h * 256 + l;
    reg.memory.write(add, Math.floor(reg.A / 256));
    reg.memory.write(add + 1, reg.A % 256);
};

operation[operation.LDA] = function (reg, l, h) {
    var add = h * 256 + l;
    reg.L = reg.memory.read(add);
    reg.H = reg.memory.read(add + 1);
};

operation[operation.LXI_B] = function (reg, l, h) { reg.B = l; reg.C = h; };
operation[operation.LXI_D] = function (reg, l, h) { reg.D = l; reg.E = h; };
operation[operation.LXI_H] = function (reg, l, h) { reg.H = l; reg.L = h; };
operation[operation.LXI_SP]= function (reg, l, h) { reg.SP = l + 256 * h; };
