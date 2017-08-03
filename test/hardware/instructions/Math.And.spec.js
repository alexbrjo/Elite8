/**
 * Tests the Boolean AND operations.
 */
describe("testInstructionsAnd", function() {

    var const0 = parseInt('00000000', 2);
    var const1 = parseInt('11111111', 2);
    var const2 = parseInt('01010101', 2);
    var const3 = parseInt('11001100', 2);
    var const4 = parseInt('01000100', 2);

    it("ANA R", function () {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var reg = MolassesRegisters();
            var r = registers[i];
            
            // When A = 0b00000000 and R = 0b00000000
            operation[operation["ANA_" + r]](reg);
            expect(reg.A).toEqual(0);
            expect(reg[r]).toEqual(0);
            
            // When A = 0b11111111 and R = 0b01010101
            reg.A = const1;
            reg[r] = const2;
            operation[operation["ANA_" + r]](reg);
            expect(reg.A).toEqual(const2);  // 0b11111111 & 0b01010101 = 0b01010101
            expect(reg[r]).toEqual(const2);
            
            // When A = 0b01010101 and R = 11001100
            reg.A = const2;
            reg[r] = const3;
            operation[operation["ANA_" + r]](reg);
            expect(reg.A).toEqual(const4);  // 0b01010101 & 0b00110011 = 0b01000100
            expect(reg[r]).toEqual(const3);
            
            // When A = 0b01010101 and R = 00000000
            reg.A = const2;
            reg[r] = const0;
            operation[operation["ANA_" + r]](reg);
            expect(reg.A).toEqual(const0);  // 0b00000000 & 0b00110011 = 0b00000000
            expect(reg[r]).toEqual(const0);
            
        }
    });
    
    /** A anded with itself, always just equals itself */
    it("ANA A", function () {     
        var reg = MolassesRegisters();
            
        // When A = 0b0000-0000
        operation[operation.ANA_A](reg);
        expect(reg.A).toEqual(0);      // 0b0 & 0b0 = 0b0
            
        // When A = 0b11111111
        reg.A = const1;
        operation[operation.ANA_A](reg);
        expect(reg.A).toEqual(const1);  // 0b11111111 & 0b11111111 = 0b11111111
            
        // When A = 0b01010101
        reg.A = const2;
        operation[operation.ANA_A](reg);
        expect(reg.A).toEqual(const2);  // 0b01010101 & 0b01010101 = 0b01010101
            
    });

    it("ANA M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, const2);

        reg.A = const1;
        operation[operation["ANA_M"]](reg, 0, 0);
        expect(reg.A).toEqual(const2);  // 0b11111111 & 0b01010101 = 0b01010101
    });

});
