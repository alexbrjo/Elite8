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
            operation[operation["ADD_" + r]](reg);
            expect(reg.A).toEqual(0);
            expect(reg[r]).toEqual(0);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(1);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(1);

            // When A = 53, R = 42
            reg.A  = 53;
            reg[r] = 42;
            operation[operation["ADD_" + r]](reg);
            expect(reg.A).toEqual(95);
            expect(reg[r]).toEqual(42);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(0);

            // When A = 128, R = 200
            reg.A  = 128;
            reg[r] = 200;
            operation[operation["ADD_" + r]](reg);
            expect(reg.A).toEqual(72);
            expect(reg[r]).toEqual(200);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(1);
            expect(reg.PARITY).toEqual(1);

            // Tests double operation no fail
            operation[operation["ADD_" + r]](reg);
            expect(reg.A).toEqual(16);
            expect(reg[r]).toEqual(200);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(1);
            expect(reg.PARITY).toEqual(1);
        }
    });

    /** Tests adding reg A to A */
    it("ADD A", function () {

        reg = new MolassesRegisters();

        // When A = 0
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(0);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);

        // When A = 53
        reg.A = 53;
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(106);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);

        // When A = 127
        reg.A = 127;
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(254);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);

        // When A = 128, tests carry
        reg.A = 128;
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(0);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(1);
        expect(reg.PARITY).toEqual(1);

        // When A = 250, tests carry
        reg.A = 250;
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(244);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(1);
        expect(reg.PARITY).toEqual(1);

        // Tests double operation no fail
        operation[operation.ADD_A](reg);
        expect(reg.A).toEqual(232);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(1);
        expect(reg.PARITY).toEqual(1);
    });

    it("ADD M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 255);

        expect(reg.A).toEqual(0);
        operation[operation["ADD_M"]](reg, 0, 0);
        expect(reg.A).toEqual(255);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(0);
    });

});
