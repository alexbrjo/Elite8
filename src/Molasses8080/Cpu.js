/**
 * The Molasses CPU emulator. Contains operation functions, registers, memory
 * and the clock. Program data and RAM occupy the same memory space so the
 * program must be loaded into RAM at a memory location 0x400.
 * 
 * Usable addresses for 512mb: 0x000 to 0x1FF
 * Default starts exectuing at Memory 0x000
 */
function Molasses8080 (memory) {
    
    /* General, flag, program, stack registers */
    var reg = MolassesRegisters();
    /* The Memory of the cpu: 512 mb */
    var mem = memory || new Memory(512);
    /* Operation for opcode array. This is a legnth 256 array of functions */
    var opc = operation;
    
    var manual_instr = [
        opc.MOV_B_I, 42,
        opc.MOV_A_B,
        opc.ADD_B
    ];
    
    for (var i =0; i < manual_instr.length; i++) {
        mem.write(manual_instr[i]);
        console.log(manual_instr[i]);
    }     
    
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
        
    /** Runs the program loaded in memory */
    this.run = function () {
        try {
            while (true) {
                this.cycle();
            }
        } catch (e) {
            console.log("Error executing");
        }
        return reg;
    };
}
