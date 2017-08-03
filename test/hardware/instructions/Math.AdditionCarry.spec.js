/**
 * Tests the Addition Carry operations.
 */
describe("testIntructionsAdditionCarry", function () {

    var reg = null;

    /** Tests GPR and H L*/
    it("ADC R", function () {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            reg = MolassesRegisters();
            var r = registers[i];

            // When A = 0, R = 0, and Carry = 1
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);
            expect(reg.A).toEqual(1);
            expect(reg[r]).toEqual(0);

            // When A = 53, R = 42, and Carry = 1
            reg.A  = 53;
            reg[r] = 42;
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);
            expect(reg.A).toEqual(96);
            expect(reg[r]).toEqual(42);

            // When A = 128, R = 200, and Carry = 0
            reg.A  = 128;
            reg[r] = 200;
            reg.CARRY = 0;
            operation[operation["ADC_" + r]](reg);
            expect(reg.A).toEqual(72);
            expect(reg[r]).toEqual(200);

            // Tests double operation no fail
            reg.CARRY = 1;
            operation[operation["ADC_" + r]](reg);
            expect(reg.A).toEqual(17);
            expect(reg[r]).toEqual(200);
        }
    });

    /** Tests adding reg A to A */
    it("ADC A", function () {

        reg = new MolassesRegisters();

        // When A = 0 and carry = 0
        reg.CARRY = 0;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(0);

        // When A = 53 and carry = 1
        reg.A = 53;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(107);

        // When A = 127 and carry = 0
        reg.A = 127;
        reg.CARRY = 0;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(254);

        // When A = 128 and carry = 1
        reg.A = 128;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(1);

        // When A = 250 and carry = 1
        reg.A = 250;
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(245);

        // Tests double operation no fail and carry = 0
        reg.CARRY = 1;
        operation[operation.ADC_A](reg);
        expect(reg.A).toEqual(235);
    });

    it("ADC M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 99);

        reg.CARRY = 1;
        operation[operation["ADC_M"]](reg, 0, 0);
        expect(reg.A).toEqual(100);
    });

});
