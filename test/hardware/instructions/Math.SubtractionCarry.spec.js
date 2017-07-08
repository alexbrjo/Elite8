/**
 * Tests the Subtraction carry operations.
 */
describe("testIntructionsSubtractionCarry", function() {

    it("SBB R", function() {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            reg =  MolassesRegisters();
            var r = registers[i];

            // When A = 0, R = 0 and carry = 0
            reg.CARRY = 0;
            operation[operation["SBB_" + r]](reg);
            expect(reg.A).toEqual(0);      // 0 - 0 - 0 = 0
            expect(reg[r]).toEqual(0);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(1);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(1);

            // When A = 40, R = 33 and carry = 1
            reg.A  = 40;
            reg[r] = 33;
            reg.CARRY = 1;
            operation[operation["SBB_" + r]](reg);
            expect(reg.A).toEqual(6);      // 40 - 33 - 1 = 6
            expect(reg[r]).toEqual(33);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(1);

            // When A = 20, R = 30 and carry = 0
            reg.A  = 20;
            reg[r] = 30;
            reg.CARRY = 0;
            operation[operation["SBB_" + r]](reg);
            expect(reg.A).toEqual(246);     // 20 - 30 - 0 = -10 -> 246
            expect(reg[r]).toEqual(30);

            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(1);
            expect(reg.PARITY).toEqual(1);

            // double operation without load and carry = 0
            reg.CARRY = 1;
            operation[operation["SBB_" + r]](reg);
            expect(reg.A).toEqual(215);     // 246 - 30 - 1 = 215
            expect(reg[r]).toEqual(30);
            expect(reg.SIGN).toEqual(0);
            expect(reg.ZERO).toEqual(0);
            expect(reg.CARRY).toEqual(0);
            expect(reg.PARITY).toEqual(0);
            
        }
    });
           
    /** Tests subtracting A from A, always will equal 0 */
    it("SBB A", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0 and carry = 0
        reg.CARRY = 0;
        operation[operation.SBB_A](reg);
        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(1);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);
        
        // When A = 4 and carry = 1
        reg.A = 4;
        reg.CARRY = 1;
        operation[operation.SBB_A](reg);
        expect(reg.A).toEqual(255);    // 4 - 4 - 1 = -1 = 255

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(1);
        expect(reg.PARITY).toEqual(0);
        
        // When A = 77 and carry = 1
        reg.A = 77;
        reg.CARRY = 1;
        operation[operation.SBB_A](reg);
        expect(reg.A).toEqual(255);    // 77 - 77 - 1 = -1 = 255

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(1);
        expect(reg.PARITY).toEqual(0);
        
    });

    it("SBB M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 21);

        reg.A = 30;
        reg.CARRY = 1;
        operation[operation["SBB_M"]](reg, 0, 0);
        expect(reg.A).toEqual(8);

        expect(reg.SIGN).toEqual(0);
        expect(reg.ZERO).toEqual(0);
        expect(reg.CARRY).toEqual(0);
        expect(reg.PARITY).toEqual(1);
    });
});
