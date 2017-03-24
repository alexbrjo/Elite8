/**
 * Tests the boolean Compare operations.
 */
describe("testIntructionsCMP", function() {

    var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
    for (var i = 0; i < registers.length; i++) {
        var name = registers[i];
        
        var ii = 0; // hacky loop for parameterized tests
        it("CMP " + name, function() {
            reg =  MolassesRegisters();
            var r = registers[ii];
            ii++;
            
            reg = new MolassesRegisters();

            // When A = 0, R = 0
            operation[operation["CMP_" + r]](reg);  // preform op
            expect(reg.A).toEqual(0);      // 0 - 0 = 0
            expect(reg[r]).toEqual(0);     // doesn't change
            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(1);   // zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // 0 is even

            // When A = 40, R = 33
            reg.A  = 40;
            reg[r] = 33;
            operation[operation["CMP_" + r]](reg);  // preform op
            expect(reg.A).toEqual(40);      // 40 - 33 = 7
            expect(reg[r]).toEqual(33);    // doesn't change
            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // 7 is odd

            // When A = 20, R = 30
            reg.A  = 20;
            reg[r] = 30;
            operation[operation["CMP_" + r]](reg);  // preform op
            expect(reg.A).toEqual(20);     // 20 - 30 = -10 -> 246
            expect(reg[r]).toEqual(30);     // doesn't change
            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(1); // 246 is even

            // double operation without load, small output
            operation[operation["CMP_" + r]](reg);  // preform op
            expect(reg.A).toEqual(20);     // 20 - 30 = -10 -> 246
            expect(reg[r]).toEqual(30);     // doesn't change
            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(1); // 246 is even
            
        });
    }
           
    /** Tests subtracting A from A, always will equal 0 */
    it("CMP A", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0
        operation[operation.CMP_A](reg);  // preform op
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 4
        reg.A = 4;
        operation[operation.CMP_A](reg);  // preform op
        expect(reg.A).toEqual(4);      // 4 - 4 = 0
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
        // When A = 77
        reg.A = 77;
        operation[operation.CMP_A](reg);  // preform op
        expect(reg.A).toEqual(77);      // 77 - 77 = 0
        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even
        
    });
});
