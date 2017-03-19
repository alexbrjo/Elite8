/**
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
     * Writes a value at a memory location. If no value is given, assumes 
     * address is value and writes to next memory location
     * @param {Number} address the address of the memory
     * @param {Number} value the byte value to store
     */
    this.write = function (address, value) {
        if (typeof address === "number" && typeof value === "undefined") {
            cursor++;
            this.write(cursor, address);
        } else {
            // Checks if can write to Memory
            if (!access) {
                throw new Error("Cannot write to ROM");
            }
            // Checks that location is a valid memory address
            if (address < 0 || address >= data.length) {
                throw new Error("Illegal memory access: " + address);
            }

            if (address >= 0 && value < 256) {
                cursor = address;
                data[cursor] = value;
            }
        }
    };
    
    /**
     * Determines if there is a byte to write after the cursor
     * @returns {Boolean} if there is a next byte to write
     */
    this.hasNext = function () {
        return cursor >= 0 && cursor < data.length;
    };
    
    /**
     * Returns position of the cursor in memory
     * @returns {Number} position of cursor
     */
    this.pos = function () {
        return cursor;
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
 * All of the opcodes for the Intel 8008
 */
var operation = {
    
    HLT: 0xFF, // halts the cpu
    
    /** Jump */
    JMP: 0x44, // unconditional jump
    JNC: 0x40, // jump if carry = 0
    JNZ: 0x48, // jump if zero  = 0
    JP:  0x50, // jump if sign  = 0
    JPO: 0x58, // jump if parity= 0 
    JC:  0x60, // jump if carry = 1
    JZ:  0x68, // jump if zero  = 1
    JM:  0x70, // jump if sign  = 1
    JPE: 0x78, // jump if parity= 1
    
    /** Call (push address and jump) */
    CALL:0x46, // unconditional call 
    CNC: 0x42, // call if carry = 0
    CNZ: 0x4A, // call if zero  = 0
    CP:  0x52, // call if sign  = 0
    CPO: 0x5A, // call if parity= 0 
    CC:  0x62, // call if carry = 1
    CZ:  0x6A, // call if zero  = 1
    CM:  0x72, // call if sign  = 1
    CPE: 0x7A, // call if parity= 1
    
    /** Return (pop address and jump back) */
    RET: 0x44, // unconditional return 
    RNC: 0x40, // return if carry = 0
    RNZ: 0x46, // return if zero  = 0
    RP:  0x50, // return if sign  = 0
    RPO: 0x58, // return if parity= 0 
    RC:  0x60, // return if carry = 1
    RZ:  0x68, // return if zero  = 1
    RM:  0x70, // return if sign  = 1
    RPE: 0x78, // return if parity= 1
    
    /** Return to Subroutine at 'R' */
    RST_A: 0x05, // return to subroutine at A
    RST_B: 0x15, // return to subroutine at B
    RST_C: 0x25, // return to subroutine at C
    RST_D: 0x35, // return to subroutine at D
    RST_E: 0x0D, // return to subroutine at E
    RST_H: 0x1D, // return to subroutine at H
    RST_L: 0x2D, // return to subroutine at L
    RST_M: 0x3D, // return to subroutine at M
    
    /** Input */
    
    /** Output */
    
    /** Load */
    
    /** Rotate byte */
    RLC: 0x02, // rotate content of A left
    RRC: 0x0A, // rotate content of A right
    RAL: 0x12, // rotate content of A left through CY
    RAR: 0x1A, // rotate content of A right through CY
    
    /** Addition */
    ADD_A: 0x80, // ADD A to A
    ADD_B: 0x81, // ADD B to A
    ADD_C: 0x82, // ADD C to A
    ADD_D: 0x83, // ADD D to A
    ADD_E: 0x84, // ADD E to A
    ADD_H: 0x85, // ADD H to A
    ADD_L: 0x86, // ADD L to A
    ADD_M: 0x87, // ADD M to A
    
    /** Addition with Carry */
    ADC_A: 0x80, // ADD A + Carry to A
    ADC_B: 0x81, // ADD B + Carry to A
    ADC_C: 0x82, // ADD C + Carry to A
    ADC_D: 0x83, // ADD D + Carry to A
    ADC_E: 0x84, // ADD E + Carry to A
    ADC_H: 0x85, // ADD H + Carry to A
    ADC_L: 0x86, // ADD L + Carry to A
    ADC_M: 0x87, // ADD M + Carry to A
    
};

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
            return this.H * 256 + this.L;
        },
        set M(v) {
            this.H = Math.floor(v / 256);      // set H to first 8 bits
            this.L = v - this.H * 256; // set L to last 8 bits
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
;/** Instruction:     ADD #                   Opcode:         0x80-0x80    *
 *  Bytes:            2                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' to register A            **/
operation[0x04] = function (reg, a) {
    var sum = reg.A + a; // sum A and immediate value
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 2;                // next instruction, skip over immediate value
};

/** Instruction:     ADD R                   Opcode:         0x80-0x87    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' to register A            **/

/* Add 'R' for A */
operation[0x80] = function (reg) {
    var sum = reg.A + reg.A; // sum A and A
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for B */
operation[0x81] = function (reg) {
    var sum = reg.A + reg.B; // sum A and B
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for C */
operation[0x82] = function (reg) {
    var sum = reg.A + reg.C; // sum A and C
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for D */
operation[0x83] = function (reg) {
    var sum = reg.A + reg.D; // sum A and D
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for E */
operation[0x84] = function (reg) {
    var sum = reg.A + reg.E; // sum A and E
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;      // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for H */
operation[0x85] = function (reg) {
    var sum = reg.A + reg.H; // sum A and H
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for L */
operation[0x86] = function (reg) {
    var sum = reg.A + reg.L; // sum A and L
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for M */
operation[0x88] = function (reg) {
    var sum = reg.A + reg.M; // sum A and M
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0;       // set zero flag
    reg.PARITY = sum % 2 === 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/** Instruction:     ADC R                   Opcode:         0x88-0x8F    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' and carry flag to A      **/
// TODO UNSURE ABOUT CARRY FLAG ADDITION

/* ADC 'R' for A */
operation[0x88] = operation[0x80];
/* ADC 'R' for B */
operation[0x89] = operation[0x81];
/* ADC 'R' for C */
operation[0x8A] = operation[0x82];
/* ADC 'R' for D */
operation[0x8B] = operation[0x83];
/* ADC 'R' for E */
operation[0x8C] = operation[0x84];
/* ADC 'R' for H */
operation[0x8D] = operation[0x85];
/* ADC 'R' for L */
operation[0x8E] = operation[0x86];
/* ADC 'R' for M */
operation[0x8F] = operation[0x87];
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

/** Instruction:     JNZ                     Opcode:         0x46         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if result flag <> 0                                **/
operation[0x46] = function (reg, l, h) {
    if (reg.CARRY > 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign flag = 0 (positive)                        **/
operation[0x50] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = odd                                    **/
operation[0x58] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if  carry = 1                                      **/
operation[0x60] = function (reg, l, h) {
    if (reg.CARRY === 1) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if zero = 1                                      **/
operation[0x68] = function (reg, l, h) {
    if (reg.RESULT === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if sign = 1 (negative)                             **/
operation[0x70] = function (reg, l, h) {
    if (reg.SIGN === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};

/** Instruction:     JPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: jump if parity = even                                   **/
operation[0x78] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) 
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    else 
        reg.PC += 3; // skip jump; next instruction
};
;/** Instruction:     CALL                    Opcode:         0x46         *
 *  Bytes:            3                      Alternatives:   0x56, 0x66,  *
 *  Affected flags:   -                                0x76, 0x4E, 0x5E,  *
 *                                                     0x6E, 0x7E         *
 *  Description: Push address to stack and JMP to immed address          **/
operation[0x46] = function (reg, l, h) {
    reg.PUSH();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x56] = operation[0x46];
operation[0x66] = operation[0x46];
operation[0x76] = operation[0x46];
operation[0x4E] = operation[0x46];
operation[0x5E] = operation[0x46];
operation[0x6E] = operation[0x46];
operation[0x7E] = operation[0x46];

/** Instruction:     CNC                     Opcode:         0x40         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: If carry = 0, push address and JMP to immed address     **/
operation[0x40] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3;
    }
};

/** Instruction:     CNZ                     Opcode:         0x44         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if result flag <> 0                **/
operation[0x44] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CP                      Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP  if sign flag = 0 (positive)       **/
operation[0x48] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CPO                     Opcode:         0x48         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if parity = odd                    **/
operation[0x58] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CC                      Opcode:         0x60         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if carry = 1                       **/
operation[0x60] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CZ                      Opcode:         0x68         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if result = 0                      **/
operation[0x68] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CM                      Opcode:         0x70         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if sign = 1 (negative)             **/
operation[0x70] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     CPE                     Opcode:         0x78         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: push address and JMP if parity = even                   **/
operation[0x78] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.PUSH();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else { 
        reg.PC += 3; // skip jump; next instruction
    }
};
;/** Instruction:     RET                     Opcode:         0x07         *
 *  Bytes:            3                      Alternatives:   0x17, 0x27,  *
 *  Affected flags:   -                                0x37, 0x1F, 0x2F,  *
 *                                                     0x3F, 0x4F         *
 *  Description: Unconditionally return, pop stack                       **/
operation[0x07] = function (reg, l, h) {
    reg.POP();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

operation[0x17] = operation[0x46];
operation[0x27] = operation[0x46];
operation[0x37] = operation[0x46];
operation[0x1F] = operation[0x46];
operation[0x2F] = operation[0x46];
operation[0x3F] = operation[0x46]; 
operation[0x4F] = operation[0x46]; 

/** Instruction:     RNC                     Opcode:         0x03         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: If carry = 0, pop stack                                 **/
operation[0x03] = function (reg, l, h) {
    reg.POP();
    reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
};

/** Instruction:     RNZ                     Opcode:         0x0E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if result flag <> 0                           **/
operation[0x0E] = function (reg, l, h) {
    if (reg.CARRY > 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RP                      Opcode:         0x13         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if sign flag = 0 (positive)                   **/
operation[0x13] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RPO                     Opcode:         0x1E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if parity = odd                               **/
operation[0x1E] = function (reg, l, h) {
    if (reg.PARITY % 2 === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RC                      Opcode:         0x23         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if carry = 1                                  **/
operation[0x23] = function (reg, l, h) {
    if (reg.CARRY === 1) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RZ                      Opcode:         0x2E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if result = 0                                 **/
operation[0x2E] = function (reg, l, h) {
    if (reg.RESULT === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RM                      Opcode:         0x33         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if sign = 1 (negative)                        **/
operation[0x33] = function (reg, l, h) {
    if (reg.SIGN === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RPE                     Opcode:         0x3E         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: pop stack if parity = even                              **/
operation[0x3E] = function (reg, l, h) {
    if (reg.PARITY % 2 === 0) {
        reg.POP();
        reg.PC = l * 0xFF + h; // program counter jumps to 14-bit address
    } else {
        reg.PC += 3; // skip jump; next instruction
    }
};

/** Instruction:     RST A                   Opcode:         0x05         *
 *  Bytes:            3                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: Call the subroutine at memory (0-7b)000, up one stack   **/

// TODO unfamiliar with operation, leaving unimeplented
operation[0x05] = operation[0x03];
operation[0x15] = operation[0x13];
operation[0x25] = operation[0x23];
operation[0x35] = operation[0x33];
operation[0x0D] = operation[0x0E];
operation[0x1D] = operation[0x1E];
operation[0x2D] = operation[0x2E];
operation[0x3D] = operation[0x3E];


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
;/** Instruction:     HLT                     Opcode:         0xFF         *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:   -                                                   *
 *  Description: halts the cpu process                                   **/
operation[0xFF] = function () {};
;/** Instruction:     RLC                     Opcode:         0x02         *
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
;/**
 * Assembles 1975 updated Intel 8008 assembly mnuemonics to machine code
 */
function SugarAssembler() {
    
    /**
     * Seperates ("chews") a 16-bit number into 2 bytes 
     * @param {Number} addr a number 0 to 65536 
     * @returns {Object} address split into 2 bytes
     */
    var chewAddress = function(addr) {
        var h = Math.floor(addr / 256); // calculate high order address
        var l = addr - h * 256; // calculate low order address
        return {
            "0": l,
            "1": h,
            get low () {
                return this[0];
            },
            get high(){
                return this[1];
            }
        };
    };
    
    /**
     * The main feature of SugarAssembler: the assembler. Assembles text into 
     * Intel 8008 machine code.
     * @param {String} src The input to assemble
     * @param {type} size The size of the memory to write to
     * @returns {Object} object with assembled memory and info.
     */
    this.assemble = function (src, size) {
        var line = src.split("\n"); // the input split into lines
        var constant = {}; // stores values of constants
        var label = {}; // stores memory locations of labels
        var machineCode = new Memory(size || 512); // assembled machine code
        
        var state = "init";
        for(var i = 0; i < line.length; i++) {
            // line split into tokens
            var token = line[i].split(" ").filter(function(a) { return a.length !== 0; });
            switch (token[0]) {
                case "HLT":
                    machineCode.write(operation.HLT); // write 1 byte halt operation
                    state = "new_line";
                    break;
                    
                case "JMP":
                    machineCode.write(operation.JMP); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JNZ":
                    machineCode.write(operation.JNZ); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JNC":
                    machineCode.write(operation.JNC); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JPO":
                    machineCode.write(operation.JPO); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JZ":
                    machineCode.write(operation.JZ); // write operation code
                    state = "wait_address"; // wait for address 
                    break;
                case "JP":
                    machineCode.write(operation.JP); // write operation code
                    state = "wait_address"; // wait for address 
                    break;
                case "JM":
                    machineCode.write(operation.JM); // write operation code
                    state = "wait_address"; // wait for address
                    break;
                case "JPE":
                    machineCode.write(operation.JPE); // write operation code
                    state = "wait_address";
                    break;
                    
                case "db":
                case "DB":
                    var def = token[1];
                    for (var i = 0; i < def.length; i++) {
                        machineCode.write(def.charAt(i));
                    }
                    state = "new_line";
                    break;
                case "CONST":
                    label[token[1]] = token[2]; // create new constant
                    state = "wait_immed";
                    break;
                default:
                    label[token[0]] = machineCode.pos() + 1; // create new address label
                    state = "new_line";
            }
            
            /*
               Based on state will read an immediate value or 16-bit address
             */
            if (state === "wait_immed") {
                // TODO if next token is a number, use that number. If its a 
                // constant use that constant
                machineCode.write(0); // write immediate value
            } else if (state === "wait_address") {
                var address = chewAddress(label[token[1]]); // get address of label
                machineCode.write(address.low); // write low order 
                machineCode.write(address.high); // write high order 
                state = "new_line";
            }
            
            // if assembler isn't ready for a new line throw error
            if (state !== "new_line") {
                throw new Error("Bad Syntax line: " + i);
            }
        }
        
        // returns assembled data and size
        return {
            data: machineCode,
            size: machineCode.size()
        };
    };
}
