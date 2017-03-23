/**
 * Tests the Boolean AND operations.
 */
describe("testInstructionsAnd", function() {

    var const0 = parseInt('00000000', 2);
    var const1 = parseInt('11111111', 2);
    var const2 = parseInt('01010101', 2);
    var const3 = parseInt('11001100', 2);
    var const4 = parseInt('01000100', 2);

    var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
    for (var i = 0; i < registers.length; i++) {
        var name = registers[i];

        var ii = 0; // hacky loop for parameterized tests
        it("ANA " + name, function () {
            var reg = MolassesRegisters();
            var r = registers[ii];
            ii++;
            
            // When A = 0b0000-0000 and R = 0b0000-0000
            operation[operation["ANA_" + r]](reg);  // preform op
            expect(reg.A).toEqual(0);      // 0b0 & 0b0 = 0b0
            expect(reg[r]).toEqual(0);      // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(1);   // zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // 0 is even
            
            // When A = 0b11111111 and R = 0b01010101
            reg.A = const1;
            reg[r] = const2;
            operation[operation["ANA_" + r]](reg);  // preform op
            expect(reg.A).toEqual(const2);  // 0b11111111 & 0b01010101 = 0b01010101
            expect(reg[r]).toEqual(const2); // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // odd
            
            // When A = 0b01010101 and R = 11001100
            reg.A = const2;
            reg[r] = const3;
            operation[operation["ANA_" + r]](reg);  // preform op
            expect(reg.A).toEqual(const4);  // 0b01010101 & 0b00110011 = 0b01000100
            expect(reg[r]).toEqual(const3); // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // even
            
            // When A = 0b01010101 and R = 00000000
            reg.A = const2;
            reg[r] = const0;
            operation[operation["ANA_" + r]](reg);  // preform op
            expect(reg.A).toEqual(const0);  // 0b00000000 & 0b00110011 = 0b00000000
            expect(reg[r]).toEqual(const0); // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(1);   // zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // even
            
        });
    }
    
    /** A anded with itself, always just equals itself */
    it("ANA A", function () {     
            var reg = MolassesRegisters();
            
            // When A = 0b0000-0000
            operation[operation.ANA_A](reg);  // preform op
            expect(reg.A).toEqual(0);      // 0b0 & 0b0 = 0b0

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(1);   // zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // 0 is even
            
            // When A = 0b11111111 
            reg.A = const1;
            operation[operation.ANA_A](reg);  // preform op
            expect(reg.A).toEqual(const1);  // 0b11111111 & 0b11111111 = 0b11111111

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // odd
            
            // When A = 0b01010101
            reg.A = const2;
            operation[operation.ANA_A](reg);  // preform op
            expect(reg.A).toEqual(const2);  // 0b01010101 & 0b01010101 = 0b01010101

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // odd
            
        });
});
