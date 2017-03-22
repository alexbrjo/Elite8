/* global operation, expect */

/**
 * Tests the Subtraction operations.
 */
describe("testIntructionsSubtraction", function() {

    /** Tests subtracting A from A, always will equal 0 */
    it("SUB A", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0
        operation[operation.SUB_A](reg);  // preform op
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 4
        reg.A = 4;
        operation[operation.SUB_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 4 - 4 = 0
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 77
        reg.A = 77;
        operation[operation.SUB_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 77 - 77 = 0
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
    });
    
    /** Tests subtracting B from A */
    it("SUB B", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, B = 0
        operation[operation.SUB_B](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.B).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, B = 33
        reg.A = 40;
        reg.B = 33;
        operation[operation.SUB_B](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.B).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, B = 30
        reg.A = 20;
        reg.B = 30;
        operation[operation.SUB_B](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.B).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_B](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.B).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
    
    /** Tests subtracting C from A */
    it("SUB C", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, B = 0
        operation[operation.SUB_C](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.C).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, C = 33
        reg.A = 40;
        reg.C = 33;
        operation[operation.SUB_C](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.C).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, B = 30
        reg.A = 20;
        reg.C = 30;
        operation[operation.SUB_C](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.C).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_C](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.C).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
    
    /** Tests subtracting D from A */
    it("SUB D", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, D = 0
        operation[operation.SUB_D](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.D).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, D = 33
        reg.A = 40;
        reg.D = 33;
        operation[operation.SUB_D](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.D).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, B = 30
        reg.A = 20;
        reg.D = 30;
        operation[operation.SUB_D](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.D).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_D](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.D).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
    
    /** Tests subtracting E from A */
    it("SUB E", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, E = 0
        operation[operation.SUB_E](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.E).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, E = 33
        reg.A = 40;
        reg.E = 33;
        operation[operation.SUB_E](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.E).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, E = 30
        reg.A = 20;
        reg.E = 30;
        operation[operation.SUB_E](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.E).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_E](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.E).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
    
    /** Tests subtracting H from A */
    it("SUB H", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, H = 0
        operation[operation.SUB_H](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.H).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, H = 33
        reg.A = 40;
        reg.H = 33;
        operation[operation.SUB_H](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.H).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, E = 30
        reg.A = 20;
        reg.H = 30;
        operation[operation.SUB_H](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.H).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_H](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.H).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
    
    /** Tests subtracting L from A */
    it("SUB L", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0, L = 0
        operation[operation.SUB_L](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 - 0 = 0
        expect(reg.L).toEqual(0);      // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 40, L = 33
        reg.A = 40;
        reg.L = 33;
        operation[operation.SUB_L](reg);  // preform op
        expect(reg.A).toEqual(7);      // 40 - 33 = 7
        expect(reg.L).toEqual(33);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 7 is odd
        
        // When A = 20, L = 30
        reg.A = 20;
        reg.L = 30;
        operation[operation.SUB_L](reg);  // preform op
        expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
        expect(reg.L).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 246 is even
        
        // double operation without load
        operation[operation.SUB_L](reg);  // preform op
        expect(reg.A).toEqual(216);     // 246 - 30 = 216
        expect(reg.L).toEqual(30);     // doesn't change
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // cno arry
        expect(reg.PARITY).toEqual(1); // 216 is even
        
    });
});
