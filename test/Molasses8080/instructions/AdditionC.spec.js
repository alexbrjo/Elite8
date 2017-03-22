/**
 * Tests the Addition Carry operations.
 */
describe("testIntructionsAdditionCarry", function () {

    var reg = null;

    /** Tests GPR and H L*/
    var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
    for (var i = 0; i < registers.length; i++) {
        var name = registers[i];

        var ii = 0; // hacky loop for parameterized tests
        it("ADC " + name, function () {
            reg = MolassesRegisters();
            var r = registers[ii];
            ii++;

            reg = new MolassesRegisters();

            // When A = 0, R = 0, and Carry = 1
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);  // preform op
            expect(reg.A).toEqual(1);      // 0 + 0 + 1 = 1
            expect(reg[r]).toEqual(0);      // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // 1 is odd

            // When A = 53, R = 42, and Carry = 1
            reg.A  = 53;
            reg[r] = 42;
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);  // preform op
            expect(reg.A).toEqual(96);     // 53 + 42 + 1 = 96
            expect(reg[r]).toEqual(42);     // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // 96 is even

            // When A = 128, R = 200, and Carry = 0
            reg.A  = 128;
            reg[r] = 200;
            reg.CARRY = 0;
            operation[operation["ADC_" + r]](reg);  // preform op
            expect(reg.A).toEqual(72);     // 128 + 200 + 0 = 328 -> 72
            expect(reg[r]).toEqual(200);    // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(1); // 72 is even

            // Tests double operation no fail
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);  // preform op
            expect(reg.A).toEqual(17);     // 72 + 200 + 1 = 273 -> 17
            expect(reg[r]).toEqual(200);    // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(0); // 17 is odd
        });
    }

    /** Tests adding reg A to A */
    it("ADC A", function () {

        reg = new MolassesRegisters();

        // When A = 0 and carry = 0
        reg.CARRY = 0;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even

        // When A = 53 and carry = 1
        reg.A = 53;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(107);    // 53 + 53 + 1 = 107

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(0); // 107 is odd

        // When A = 127 and carry = 0
        reg.A = 127;
        reg.CARRY = 0;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(254);    // 127 + 127 + 0 = 254

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 254 is even

        // When A = 128 and carry = 1
        reg.A = 128;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(1);      // 128 + 128 + 1 = 257 -> 1

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(0); // 1 is odd

        // When A = 250 and carry = 1
        reg.A = 250;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(245);    // 250 + 250 + 1 = 501 -> 245

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(0); // 245 is odd

        // Tests double operation no fail and carry = 0
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);  // preform op
        expect(reg.A).toEqual(235);    // 245 + 245 + 1 = 491 -> 235

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // no zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(0); // 233 is odd
    });

});
