/**
 * Tests the Decrement operations.
 */
describe("testIntructionsDecrement", function () {

    var reg = null;
    it("DCR R", function () {
        var registers = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var r = registers[i];

            reg = MolassesRegisters();

            // When R = 1
            reg[r] = 1
            operation[operation["DCR_" + r]](reg);
            expect(reg[r]).toEqual(0);

            // When R = 43
            reg[r] = 43;
            operation[operation["DCR_" + r]](reg);
            expect(reg[r]).toEqual(42);

            // When R = 201
            reg[r] = 201;
            operation[operation["DCR_" + r]](reg);
            expect(reg[r]).toEqual(200);

            // Tests double operation no fail
            operation[operation["DCR_" + r]](reg);
            expect(reg[r]).toEqual(199);
        }
    });

    it("DCR M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 254);

        expect(reg.M).toEqual(254);
        operation[operation["DCR_M"]](reg, 0, 0);
        expect(reg.M).toEqual(253);
    });

});
