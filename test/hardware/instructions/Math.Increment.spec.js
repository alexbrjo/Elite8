/**
 * Tests the Increment operations.
 */
describe("testIntructionsIncrement", function () {

    var reg = null;
    it("INR R", function () {
        var registers = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var r = registers[i];

            reg = MolassesRegisters();

            // When R = 0
            reg[r] = 0;
            operation[operation["INR_" + r]](reg);
            expect(reg[r]).toEqual(1);

            // When R = 42
            reg[r] = 42;
            operation[operation["INR_" + r]](reg);
            expect(reg[r]).toEqual(43);

            // When R = 200
            reg[r] = 200;
            operation[operation["INR_" + r]](reg);
            expect(reg[r]).toEqual(201);

            // Tests double operation no fail
            operation[operation["INR_" + r]](reg);
            expect(reg[r]).toEqual(202);
        }
    });

    it("INR M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 254);

        expect(reg.M).toEqual(254);
        operation[operation["INR_M"]](reg, 0, 0);
        expect(reg.M).toEqual(255);
    });

});
