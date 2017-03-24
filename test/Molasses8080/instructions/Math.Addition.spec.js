/**
 * Tests the Addition operations.
 */
describe("testIntructionsAddition", function () {

    var reg = null;

    /** Tests GPR and H L*/
    it("ADD R", function () {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var r = registers[i];

            reg = MolassesRegisters();

            // When A = 0 and R = 0
            operation[operation["ADD_" + r]](reg);  // preform op
            expect(reg.A).toEqual(0);      // 0 + 0 = 0
            expect(reg[r]).toEqual(0);      // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(1);   // zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(1); // 0 is even

            // When A = 53, R = 42
            reg.A  = 53;
            reg[r] = 42;
            operation[operation["ADD_" + r]](reg);  // preform op
            expect(reg.A).toEqual(95);     // 53 + 42 = 95
            expect(reg[r]).toEqual(42);     // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(0);  // no carry
            expect(reg.PARITY).toEqual(0); // 95 is odd

            // When A = 128, R = 200
            reg.A  = 128;
            reg[r] = 200;
            operation[operation["ADD_" + r]](reg);  // preform op
            expect(reg.A).toEqual(72);     // 128 + 200 = 328 -> 72
            expect(reg[r]).toEqual(200);    // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(1); // 72 is even

            // Tests double operation no fail
            operation[operation["ADD_" + r]](reg);  // preform op
            expect(reg.A).toEqual(16);     // 72 + 200 = 272 -> 16
            expect(reg[r]).toEqual(200);    // shouldn't be affected

            expect(reg.SIGN).toEqual(0);   // not negative
            expect(reg.ZERO).toEqual(0);   // not zero
            expect(reg.CARRY).toEqual(1);  // carry
            expect(reg.PARITY).toEqual(1); // 16 is even
        }
    });

    /** Tests adding reg A to A */
    it("ADD A", function () {

        reg = new MolassesRegisters();

        // When A = 0
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 0 + 0 = 0

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 0 is even

        // When A = 53
        reg.A = 53;
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(106);    // 53 + 53 = 106

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 254 is even

        // When A = 127
        reg.A = 127;
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(254);    // 127 + 127 = 254

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(0);  // no carry
        expect(reg.PARITY).toEqual(1); // 254 is even

        // When A = 128, tests carry
        reg.A = 128;
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(0);      // 128 + 128 = 256 -> 0

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(1);   // zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 0 is even

        // When A = 250, tests carry
        reg.A = 250;
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(244);    // 250 + 250 = 500 -> 244

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // not zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 244 is even

        // Tests double operation no fail
        operation[operation.ADD_A](reg);  // preform op
        expect(reg.A).toEqual(232);    // 244 + 244 = 488 -> 232

        expect(reg.SIGN).toEqual(0);   // not negative
        expect(reg.ZERO).toEqual(0);   // no zero
        expect(reg.CARRY).toEqual(1);  // carry
        expect(reg.PARITY).toEqual(1); // 232 is even
    });

});
