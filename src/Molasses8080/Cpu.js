/**
 * The Molasses CPU emulator. Contains operation functions, registers, memory
 * and the clock. Program data and RAM occupy the same memory space so the
 * program must be loaded into RAM at a memory location 0x400.
 * 
 * Usable addresses for 256mb: 0x000 to 0xFF
 * Default starts executing at Memory 0x000
 */
function Molasses8080 (memory) {
    
    /* General, flag, program, stack registers */
    var reg = MolassesRegisters();
    /* The Memory of the cpu: 256 mb */
    var mem = memory || new Memory(256);
    /* Operation for opcode array. This is a length 256 array of functions */
    var opc = operation;

    /**
     * Boots the Computer by validating and starting operate at the Boot sector.
     */
    this.boot = function () {
        // Boot off 'Floppy.json', this will initialize the interrupts and bootloader
    };
    
    /**
     * Executes a single operation.
     */
    this.cycle = function () {
        
        // Get position in memory, get immediate values
        var instr = mem.read(reg.PC);   // instruction location
        var immed = mem.peek(1);        // immediate next value, or low-order address
        var hiadr = mem.peek(2);        // high-order address, used for program and stack control
        var perms = true;

        // execute operation
        opc[instr](reg, immed, hiadr,
            /**
             * Gets the value at a memory address
             * @param l the low order address of requested memory
             * @param h the high order address of the requested memory
             * return
             */
            function(l, h) {
                if (perms) {
                    return mem.read(h * 16 + l);
                }
            }
        );
        console.log(reg);
    };
        
    /** Runs the program loaded in memory */
    this.run = function () {
        try {
            // Limit program to 100 instructions; safeguard
            for (var i = 0; i < 100; i++) {
                this.cycle();
            }
        } catch (e) {
            console.log("Error executing");
        }
        return reg;
    };
    
    /** Outputs result */
    this.output = function () {
        var s = "";
        s +=  String.fromCharCode(mem.read(0xF7));
        s +=  String.fromCharCode(mem.read(0xF8));
        s +=  String.fromCharCode(mem.read(0xF9));
        s +=  String.fromCharCode(mem.read(0xFA));
        s +=  String.fromCharCode(mem.read(0xFB));
        s +=  String.fromCharCode(mem.read(0xFC));
        s +=  String.fromCharCode(mem.read(0xFD));
        s +=  String.fromCharCode(mem.read(0xFE));
        s +=  String.fromCharCode(mem.read(0xFF));
        return s;
    };
}
