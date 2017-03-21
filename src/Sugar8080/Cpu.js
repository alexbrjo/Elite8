/**
 * The Sugar8080 CPU emulator. Contains operation functions, registers, memory
 * and the clock. Program data and RAM occupy the same memory space so the
 * program must be loaded into RAM at a memory location 0x400.
 */
function Sugar8080 (memory) {
    
    /* General, flag, program, stack registers */
    var reg = SugarRegisters();
    /* The Memory of the cpu */
    var mem = memory || new Memory(256);
    /* Operation for opcode array. This is a legnth 256 array of functions */
    var opc = operation;
    
    /**
     * Executes a single operation.
     */
    this.cycle = function () {
        // Get position in memory, get immediate values
        var instr = mem.read(reg.PC);   // instruction location
        var immed = mem.peek(1);        // immediate next value, or low-order address
        var hiadr = mem.peek(2);        // high-order address, used for program and stack control
        
        // excute operation
        opc[instr](reg, immed, hiadr);
    };
}

