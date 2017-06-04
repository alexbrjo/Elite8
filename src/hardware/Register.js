/**
 * The registers for the Molasses8080
 */
function MolassesRegisters () {
    return {
        memory: null,
        /**
         * The 8-bit A (Accumulator) Register
         */
        a: 0, 
        get A(){ return this.a; },
        set A(v) { this.a = this.byte(v); },
        
        /**
         * The 8-bit B,C,D,E general purpose Registers
         */
        b: 0, c: 0, d: 0, e: 0,
        get B(){ return this.b; },
        set B(v) { this.b = this.byte(v); }, 
        
        get C(){ return this.c; },
        set C(v) { this.c = this.byte(v); },
        
        get D(){ return this.d; },
        set D(v) { this.d = this.byte(v); },
        
        get E(){ return this.e; },
        set E(v) { this.e = this.byte(v); },
       
        /** 
         * Use 8-bit H, L registers that can serve as a single 16-bit register 
         */
        h: 0, l: 0,
        get H() { return this.h; },
        set H(v) { this.h = this.byte(v); }, 
        
        get L() { return this.l; },
        set L(v) { this.l = this.byte(v); },
        
        get M() {
            if (this.memory === null) throw 'memory not initialized';
            return this.memory.read(this.H * 256 + this.L);
        },
        set M(v) {
            if (this.memory === null) throw 'memory not initialized';
            this.memory.write(this.H * 256 + this.L, v) ;
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
        
        /* Seven 14-bit PC and stack register */
        stack: [0, 0, 0, 0, 0, 0, 0, 0],
        CLEAR_STACK: function () {
            this.stack = [0, 0, 0, 0, 0, 0, 0, 0];
            this.stacklvl = 0;
        },
        stacklvl: 0, 
        get PC() { return this.stack[this.stacklvl]; },
        set PC(v) {
            if (v < 0 && v > 0x4000) {
                throw new Error("PC cannot store value: " + v);
            }
            this.stack[this.stacklvl] = v;
        },
        POP: function() { 
            if (this.stacklvl <= 0) {
                throw new Error("PC cannot pop");
            }
            this.stack[this.stacklvl--] = 0;
        },
        PUSH: function(v) { 
            if (this.stacklvl + 1 >= this.stacklvl.length) {
                throw new Error("PC cannot push");
            }
            this.stack[++this.stacklvl] = v; 
        },
        
        /**
         * Chops integers to fit in the domain of 0-255 and sets all valid 
         * registers.
         * @param {Number} v the integer to chop
         * @return the chopped integer greater than or equal to 0 and less than or equal to 255
         */
        byte: function (v) {
            if (v % 1 !== 0 || typeof v !== "number") throw "Register can only store integer values";
            
            this.CARRY = 0;
            if (v > 0xFF) {
                v = v % 256;
                this.CARRY = 1;
            } else if (v < 0) {
                v += 256;
                this.CARRY = 1;
            }

            this.SIGN = 0;                      // set sign flag
            this.ZERO = v === 0 ? 1 : 0;        // set zero flag
            this.PARITY = v % 2 === 0 ? 1 : 0;  // set parity flag
            return v;                           // set sum in register
        }
    };
}
