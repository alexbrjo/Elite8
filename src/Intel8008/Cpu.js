/**
 * The Intel8008 CPU emulator. Contains operation functions, registers, memory
 * and the clock. Program data and RAM occupy the same memory space so the
 * program must be loaded into RAM at a memory location 0x400.
 */
function Intel8008Cpu () {
    
    /* General, flag, program, stack registers */
    var reg = Intel8008Registers();
    /* The Memory of the cpu */
    var mem = new Memory(2048);
    /* Operation for opcode array. This is a legnth 256 array of functions */
    var opc = operation;
    
    /**
     * 
     */
    this.cycle = function () {
        // Get position in memory
        var current_instruction = mem.read(reg.PC);
        // Excute operation
        opc[current_instruction](reg);
    };
}

