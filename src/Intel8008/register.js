function Intel8008Registers () {
    return {
        /* Accumlator, four 8-bit GPRs and HL 8/16-bit register(s) */
        
        /**
         * The 8-bit A (Accumulator) Register
         */
        a: 0, 
        get A(){ return this.a; },
        set A(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.a = v;
            else throw new Error("Register A cannot store value: " + v);
        },
        
        /**
         * The 8-bit B,C,D,E general purpose Registers
         */
        b: 0, c: 0, d: 0, e: 0,
        
        get B(){ return this.b; },
        set B(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.b = v;
            else throw new Error("Register B cannot store value: " + v);
        }, 
        get C(){ return this.c; },
        set C(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.c = v;
            else throw new Error("Register C cannot store value: " + v);
        },
        get D(){ return this.d; },
        set D(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.d = v;
            else throw new Error("Register D cannot store value: " + v);
        },
        get E(){ return this.e; },
        set E(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.e = v;
            else throw new Error("Register E cannot store value: " + v);
        },
        
        /** 
         * Use 8-bit H, L registers that can serve as a single 16-bit register 
         */
        h: 0, l: 0,
        get H() { return this.h; },
        set H(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.h = v;
            else throw new Error("Register B cannot store value: " + v);
        }, 
        get L() { return this.c; },
        set L(v) {
            if (v >= 0 && v < 256 && v % 1 === 0) this.c = v;
            else throw new Error("Register C cannot store value: " + v);
        },
        get HL() {
            return parseInt(parseInt(this.h, 2) + "" + parseInt(this.l, 2), 10);
        },
        set HL(v) {
            var b = parseInt(v, 2) + "";
            this.H = b.substring(0, b.length/2 - 1);      // set H to first 8 bits
            this.L = b.substring(b.length/2, b.length - 1); // set L to last 8 bits
        },
        
        /* The flag register, split into bits */
        sign:   0, 
        zero:   0, 
        parity: 0, 
        carry:  0,
        
        /* 14-bit Program register (16-bit but with 2 most sign. bits ignored) */
        counter: 0, 
        /* Seven 14-bit stack register */
        stack: [0, 0, 0, 0, 0, 0, 0]
    };
}
