/**
 * Tests the Boolean ORA operations.
 */
describe("testInstructionsORA", function() {

    var const0 = parseInt('00000000', 2);
    var const1 = parseInt('11111111', 2);
    var const2 = parseInt('01010101', 2);
    var const3 = parseInt('11001100', 2);
    var const4 = parseInt('01000100', 2);
    var const5 = parseInt('11011101', 2);

    it("ORA R", function () {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var reg = MolassesRegisters();
            var r = registers[i];
            
            // When A = 0b0000-0000 and R = 0b0000-0000
            operation[operation["ORA_" + r]](reg);
            expect(reg.A).toEqual(0);
            expect(reg[r]).toEqual(0);
            
            // When A = 0b11111111 and R = 0b01010101
            reg.A = const1;
            reg[r] = const2;
            operation[operation["ORA_" + r]](reg);
            expect(reg.A).toEqual(const1);  // 0b11111111 | 0b01010101 = 0b11111111
            expect(reg[r]).toEqual(const2);
            
            // When A = 0b01010101 and R = 0b11001100
            reg.A = const2;
            reg[r] = const3;
            operation[operation["ORA_" + r]](reg);
            expect(reg.A).toEqual(const5);  // 0b01010101 | 0b11001100 = 0b11011101
            expect(reg[r]).toEqual(const3);
            
            // When A = 0b01010101 and R = 0b00000000
            reg.A = const2;
            reg[r] = const0;
            operation[operation["ORA_" + r]](reg);
            expect(reg.A).toEqual(const2);  // 0b00000000 | 0b00110011 = 0b00110011
            expect(reg[r]).toEqual(const0);
            
        }
    });
    
    /** A anded with itself, always just equals itself */
    it("ORA A", function () {     
        var reg = MolassesRegisters();

        // When A = 0b00000000
        operation[operation.ORA_A](reg);
        expect(reg.A).toEqual(0); // 0b0 & 0b0 = 0b0

        // When A = 0b11111111
        reg.A = const1;
        operation[operation.ORA_A](reg);
        expect(reg.A).toEqual(const1);  // 0b11111111 | 0b11111111 = 0b11111111

        // When A = 0b01010101
        reg.A = const2;
        operation[operation.ORA_A](reg);
        expect(reg.A).toEqual(const2);  // 0b01010101 | 0b01010101 = 0b01010101

    });

    it("ORA M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, const0);

        // When A = 0b01010101 and M ~= 0b00000000
        reg.A = const2;
        operation[operation["ORA_M"]](reg, 0, 0);
        expect(reg.A).toEqual(const2);  // 0b00000000 | 0b00110011 = 0b00110011
    });
});
