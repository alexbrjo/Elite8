/**
 * Tests the Addition operations.
 */
describe("testIntructionsAddition", function() {
    
    var reg = null;
    
    /** Tests adding reg A to A */
    it("ADD A", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 53
        reg.A = 53;
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(106);    // 53 + 53 = 106
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 254 is even
        
        // When A = 127
        reg.A = 127;
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(254);    // 127 + 127 = 254
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 254 is even
        
        // When A = 128, tests carry
        reg.A = 128;
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 128 + 128 = 256 -> 0
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 250, tests carry
        reg.A = 250;
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(244);    // 250 + 250 = 500 -> 244
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 244 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(232);    // 244 + 244 = 488 -> 232
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // no zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 232 is even
    });
    
    /** Tests adding reg B to A */
    it("ADD B", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and B = 0
        operation[opcode.ADD_B](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.B).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 53, B = 42
        reg.A = 53;
        reg.B = 42;
        operation[opcode.ADD_B](reg);  // preform op
        expect(reg.A).toEqual(95);     // 53 + 42 = 95
        expect(reg.B).toEqual(42);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 95 is odd
        
        // When A = 128, B = 200
        reg.A = 128;
        reg.B = 200;
        operation[opcode.ADD_B](reg);  // preform op
        expect(reg.A).toEqual(72);     // 128 + 200 = 328 -> 72
        expect(reg.B).toEqual(200);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_B](reg);  // preform op
        expect(reg.A).toEqual(16);     // 72 + 200 = 272 -> 16
        expect(reg.B).toEqual(200);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 16 is even
    });
    
    /** Tests adding reg C to A */
    it("ADD C", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and C = 0
        operation[opcode.ADD_C](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.C).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 32, C = 33
        reg.A = 32;
        reg.C = 33;
        operation[opcode.ADD_C](reg);  // preform op
        expect(reg.A).toEqual(65);     // 32 + 33 = 65
        expect(reg.C).toEqual(33);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 65 is odd
        
        // When A = 228, C = 100
        reg.A = 228;
        reg.C = 100;
        operation[opcode.ADD_C](reg);  // preform op
        expect(reg.A).toEqual(72);     // 228 + 100 = 328 -> 72
        expect(reg.C).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_C](reg);  // preform op
        expect(reg.A).toEqual(172);    // 72 + 100 = 172
        expect(reg.C).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 172 is even
    });
    
    /** Tests adding reg D to A */
    it("ADD D", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and D = 0
        operation[opcode.ADD_D](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.D).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 32, D = 33
        reg.A = 32;
        reg.D = 33;
        operation[opcode.ADD_D](reg);  // preform op
        expect(reg.A).toEqual(65);     // 32 + 33 = 65
        expect(reg.D).toEqual(33);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 65 is odd
        
        // When A = 228, D = 100
        reg.A = 228;
        reg.D = 100;
        operation[opcode.ADD_D](reg);  // preform op
        expect(reg.A).toEqual(72);     // 228 + 100 = 328 -> 72
        expect(reg.D).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_D](reg);  // preform op
        expect(reg.A).toEqual(172);    // 72 + 100 = 172
        expect(reg.D).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 172 is even
    });
    
    /** Tests adding reg E to A */
    it("ADD E", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and E = 0
        operation[opcode.ADD_E](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.E).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 32, E = 33
        reg.A = 32;
        reg.E = 33;
        operation[opcode.ADD_E](reg);  // preform op
        expect(reg.A).toEqual(65);     // 32 + 33 = 65
        expect(reg.E).toEqual(33);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 65 is odd
        
        // When A = 228, E = 100
        reg.A = 228;
        reg.E = 100;
        operation[opcode.ADD_E](reg);  // preform op
        expect(reg.A).toEqual(72);     // 228 + 100 = 328 -> 72
        expect(reg.E).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_E](reg);  // preform op
        expect(reg.A).toEqual(172);    // 72 + 100 = 172
        expect(reg.E).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 172 is even
    });
    
    /** Tests adding reg H to A */
    it("ADD H", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and H = 0
        operation[opcode.ADD_H](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.H).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 32, H = 33
        reg.A = 32;
        reg.H = 33;
        operation[opcode.ADD_H](reg);  // preform op
        expect(reg.A).toEqual(65);     // 32 + 33 = 65
        expect(reg.H).toEqual(33);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 65 is odd
        
        // When A = 228, H = 100
        reg.A = 228;
        reg.H = 100;
        operation[opcode.ADD_H](reg);  // preform op
        expect(reg.A).toEqual(72);     // 228 + 100 = 328 -> 72
        expect(reg.H).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_H](reg);  // preform op
        expect(reg.A).toEqual(172);    // 72 + 100 = 172
        expect(reg.H).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 172 is even
    });
    
    /** Tests adding reg L to A */
    it("ADD L", function() {
        
        reg = new Intel8008Registers(); 
        
        // When A = 0 and L = 0
        operation[opcode.ADD_L](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0
        expect(reg.L).toEqual(0);      // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 32, E = 33
        reg.A = 32;
        reg.L = 33;
        operation[opcode.ADD_L](reg);  // preform op
        expect(reg.A).toEqual(65);     // 32 + 33 = 65
        expect(reg.L).toEqual(33);     // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 65 is odd
        
        // When A = 228, L = 100
        reg.A = 228;
        reg.L = 100;
        operation[opcode.ADD_L](reg);  // preform op
        expect(reg.A).toEqual(72);     // 228 + 100 = 328 -> 72
        expect(reg.L).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 72 is even
        
        // Tests double operation no fail
        operation[opcode.ADD_L](reg);  // preform op
        expect(reg.A).toEqual(172);    // 72 + 100 = 172
        expect(reg.L).toEqual(100);    // shouldn't be affected
        
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 172 is even
    });
});
