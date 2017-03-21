/**
 * The registers for the Sugar 8080
 */
function SugarRegisters () {
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
