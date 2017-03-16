var operation = [];
;/**
 * The Intel8008 CPU emulator. Contains operation functions, registers, memory
 * and the clock. Program data and RAM occupy the same memory space so the
 * program must be loaded into RAM at a memory location 0x400.
 */
function Intel8008Cpu (memory) {
    
    /* General, flag, program, stack registers */
    var reg = Intel8008Registers();
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

;/**
 * Constructing this function is buying a physical stick of RAM. The Intel 8008
 * only has a 14-bit wide address bus so only 16384 (not 65536) bytes can be 
 * accessed.
 * @param {Number} size the size of the memory
 * @param {String} mem_type the type of memory 
 *      "RAM" - Read and write are enabled(default) 
 *      "ROM" - Read only memory
 */
function Memory (size, mem_type) {
    
    // Validate size parameter
    if (size < 1) {
        throw new Error("Memory must have at least 1 byte.");
    }
    // Validate mem_type parameter
    if (typeof mem_type !== "undefined" &&
        mem_type !== "RAM" && mem_type !== "ROM") {
            throw new Error("Unsupported memory type: " + mem_type);
    }
    
    /** The size of the memory */
    var size = size || 512;
    /** The size of the  */
    var cursor = -1;
    /** If you can write to memory */
    var access = mem_type !== "ROM";
    /** The data in memory  */
    var data = new Uint8Array(size);
    
    /**
     * Read a value from a memory location
     * @param {Number} address the address of the memory
     * @returns {Number} the value in the memory location
     */
    this.read = function (address) {
        // Checks that location is a valid memory address
        if (address < 0 || address >= data.length) {
            throw new Error("Illegal memory access: " + address);
        }
        // sets cursor to memory address and returns stored value
        cursor = address;
        return data[cursor];
    };
    
    /**
     * Peeks ahead of the last value access via read()
     * @param {Number} d the change from the address
     * @returns {Number} the value in the memory location
     */
    this.peek = function (d) {
        var address = cursor + d;
        // Checks that location is a valid memory address
        if (address < 0 || address >= data.length) {
            throw new Error("Illegal memory access: " + address);
        }
        
        return data[address];
    };
    
    /**
     * Writes a value at a memory location
     * @param {Number} address the address of the memory
     * @param {Number} value the byte value to store
     * @returns {undefined}
     */
    this.write = function (address, value) {
        // Checks if can write to Memory
        if (!access) {
            throw new Error("Cannot write to ROM");
        }
        // Checks that location is a valid memory address
        if (location < 0 || address >= data.length) {
            throw new Error("Illegal memory access: " + address);
        }
        
        if (address >= 0 && value < 256) {
            cursor = address;
            data[cursor] = value;
        }
    };
    
    /**
     * Clears memory
     */
    this.clear = function () {
        for (cursor = 0; cursor < data.length; cursor++)
            data[cursor] = 0; 
        cursor = -1;
    };
    
    /**
     * Gets the number of bytes that memory can hold.
     * @returns {Number} the number of bytes of memory
     */
    this.size = function () {
        return size;
    };
    
    this.clear();
}
;/**
* The Intel 8008 instruction set: Arithmatic group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     ADD R                   Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;
/** Instruction:     JMP                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:   0x54, 0x64   *
 *  Affected flags:   -                                0x74, 0x4C, 0x5C   *
 *                                                     0x6C, 0x7C         *
 *  Description: uncoditionally jumps to an address                      **/
operation[0x44] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x54] = operation[0x44];
operation[0x64] = operation[0x44];
operation[0x74] = operation[0x44];
operation[0x4C] = operation[0x44];
operation[0x5C] = operation[0x44];
operation[0x6C] = operation[0x44];
operation[0x7C] = operation[0x44];

/** Instruction:     JNC                     Opcode:         0x40         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if carry flag = 0                                  **/
operation[0x40] = function (reg, l, h) {
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

/** Instruction:     JNZ                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result flag <> 0                                **/
operation[0x44] = function (reg, l, h) {
    if (reg.CARRY > 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign flag = 0 (positive)                        **/
operation[0x48] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = odd                                    **/
operation[0x58] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if  carry = 1                                      **/
operation[0x60] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result = 0                                      **/
operation[0x68] = function (reg, l, h) {
    if (reg.RESULT === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign = 1 (negative)                             **/
operation[0x70] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};

/** Instruction:     JPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = even                                   **/
operation[0x78] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; nexy instruction
};
;/**
* The Intel 8008 instruction set: Call and return group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;/**
* The Intel 8008 instruction set: Call and return group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;/**
* The Intel 8008 instruction set: CPU control group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:   0x00, 0x01   *
 *  Affected flags:  none                                                 *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};

operation[0x00] = operation[0xFF];
operation[0x01] = operation[0xFF];
;/**
* The Intel 8008 instruction set: Input and Output group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;/**
* The Intel 8008 instruction set: Load group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;/**
* The Intel 8008 instruction set: Rotate group
* 
* Thank you:
*      pastraiser.com/cpu/i8008/i8008_opcodes.html
*      petsd.net/8008.php#jump
*/

/** Instruction:     RLC                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A left                                **/
operation[0x02] = function () {};

/** Instruction:     RRC                     Opcode:         0x0A         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A right                               **/
operation[0x0A] = function () {};

/** Instruction:     RAL                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A left through CY                     **/
operation[0x12] = function () {};

/** Instruction:     RAR                     Opcode:         0x02         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   C                                                   *
 *  Description: rotate content of A right through CY                    **/
operation[0x1A] = function () {};
;function Intel8008Registers () {
    return {
        /**
         * The 8-bit A (Accumulator) Register
         */
        a: 0, 
        get A(){ return this.a; },
        set A(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.a = v;
            else throw new Error("Register A cannot store value: " + v);
        },
        
        /**
         * The 8-bit B,C,D,E general purpose Registers
         */
        b: 0, c: 0, d: 0, e: 0,
        
        get B(){ return this.b; },
        set B(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.b = v;
            else throw new Error("Register B cannot store value: " + v);
        }, 
        get C(){ return this.c; },
        set C(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.c = v;
            else throw new Error("Register C cannot store value: " + v);
        },
        get D(){ return this.d; },
        set D(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.d = v;
            else throw new Error("Register D cannot store value: " + v);
        },
        get E(){ return this.e; },
        set E(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.e = v;
            else throw new Error("Register E cannot store value: " + v);
        },
        
        /** 
         * Use 8-bit H, L registers that can serve as a single 16-bit register 
         */
        h: 0, l: 0,
        get H() { return this.h; },
        set H(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.h = v;
            else throw new Error("Register H cannot store value: " + v);
        }, 
        get L() { return this.l; },
        set L(v) {
            if (v >= 0 && v <= 0xFF && v % 1 === 0) this.l = v;
            else throw new Error("Register L cannot store value: " + v);
        },
        get M() {
            return parseInt(parseInt(this.h, 2) + "" + parseInt(this.l, 2), 10);
        },
        set M(v) {
            var b = parseInt(v, 2) + "";
            this.H = b.substring(0, b.length/2 - 1);      // set H to first 8 bits
            this.L = b.substring(b.length/2, b.length - 1); // set L to last 8 bits
        },
        
        /* The flag register, split into bits */
        sign:   0, 
        get SIGN() { return this.sign; },
        set SIGN(v) {
            if (v !== 0 && v !== 1) throw new Error("Sign Flag cannot store value: " + v);
            else this.sign = v;
        },
        zero:   0, 
        get ZERO() { return this.zero; },
        set ZERO(v) {
            if (v !== 0 && v !== 1) throw new Error("Zero Flag cannot store value: " + v);
            else this.zero = v;
        },
        parity: 0, 
        get PARITY() { return this.parity; },
        set PARITY(v) {
            if (v !== 0 && v !== 1) throw new Error("Parity Flag cannot store value: " + v);
            else this.parity = v;
        }, 
        carry:  0,
        get CARRY() { return this.carry; },
        set CARRY(v) {
            if (v !== 0 && v !== 1) throw new Error("Carry Flag cannot store value: " + v);
            else this.carry = v;
        },
        
        /* 14-bit Program register (16-bit but with 2 most sign. bits ignored) */
        pc: 0,
        get PC() { return this.pc; },
        set PC(v) {
            if (v < 0 && v > 0x4000) throw new Error("PC cannot store value: " + v);
            this.pc = v;
        },
        
        /* Seven 14-bit stack register */
        stack: [0, 0, 0, 0, 0, 0, 0],
        get POP() { return this.pc; },
        set PUSH(v) {
            if (v < 0 && v > 0x4000) throw new Error("PC cannot store value: " + v);
            this.pc = v;
        }
    };
}
