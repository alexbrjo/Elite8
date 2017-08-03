/**
 * Tests the boolean Compare operations.
 */
describe("testIntructionsCMP", function() {

    it("CMP R", function() {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            var r = registers[i];
            
            reg = new MolassesRegisters();

            // When A = 0, R = 0
            operation[operation["CMP_" + r]](reg);
            expect(reg.A).toEqual(0);
            expect(reg[r]).toEqual(0);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(1);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(1);

            // When A = 40, R = 33
            reg.A  = 40;
            reg[r] = 33;
            operation[operation["CMP_" + r]](reg);
            expect(reg.A).toEqual(40);
            expect(reg[r]).toEqual(33);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(0);

            // When A = 20, R = 30
            reg.A  = 20;
            reg[r] = 30;
            operation[operation["CMP_" + r]](reg);
            expect(reg.A).toEqual(20);
            expect(reg[r]).toEqual(30);
            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(1);
            expect(reg.PARITY).toEqual(1);

            // double operation without load, small output
            operation[operation["CMP_" + r]](reg);
            expect(reg.A).toEqual(20);
            expect(reg[r]).toEqual(30);
            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(1);
            expect(reg.PARITY).toEqual(1);
            
        }
    });
           
    /** Tests subtracting A from A, always will equal 0 */
    it("CMP A", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0
        operation[operation.CMP_A](reg);
        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);
        
        // When A = 4
        reg.A = 4;
        operation[operation.CMP_A](reg);
        expect(reg.A).toEqual(4);
        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);
        
        // When A = 77
        reg.A = 77;
        operation[operation.CMP_A](reg);
        expect(reg.A).toEqual(77);
        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);
        
    });

    it("CMP M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 33);

        reg.A = 40;
        operation[operation["CMP_M"]](reg, 0, 0);
        expect(reg.A).toEqual(40);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(0);
    });
});
