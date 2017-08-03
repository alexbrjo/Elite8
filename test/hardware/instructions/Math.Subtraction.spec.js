/**
 * Tests the Subtraction operations.
 */
describe("testIntructionsSubtraction", function() {

    it("SUB R", function() {
        var registers = ['B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < registers.length; i++) {
            reg =  MolassesRegisters();
            var r = registers[i];
            i++;
            
            reg = new MolassesRegisters();

            // When A = 0, R = 0
            operation[operation["SUB_" + r]](reg);
            expect(reg.A).toEqual(0);      // 0 - 0 = 0
            expect(reg[r]).toEqual(0);

            // When A = 40, R = 33
            reg.A  = 40;
            reg[r] = 33;
            operation[operation["SUB_" + r]](reg);
            expect(reg.A).toEqual(7);      // 40 - 33 = 7
            expect(reg[r]).toEqual(33);

            // When A = 20, R = 30
            reg.A  = 20;
            reg[r] = 30;
            operation[operation["SUB_" + r]](reg);
            expect(reg.A).toEqual(246);     // 20 - 30 = -10 -> 246
            expect(reg[r]).toEqual(30);

            // double operation without load
            operation[operation["SUB_" + r]](reg);
            expect(reg.A).toEqual(216);     // 246 - 30 = 216
            expect(reg[r]).toEqual(30);
            
        }
    });
           
    /** Tests subtracting A from A, always will equal 0 */
    it("SUB A", function () {
        reg = new MolassesRegisters(); 
        
        // When A = 0
        operation[operation.SUB_A](reg);
        
        // When A = 4
        reg.A = 4;
        operation[operation.SUB_A](reg);
        expect(reg.A).toEqual(0);      // 4 - 4 = 0
        
        // When A = 77
        reg.A = 77;
        operation[operation.SUB_A](reg);
        expect(reg.A).toEqual(0);      // 77 - 77 = 0
        
    });

    it("SUB M", function () {
        reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 21);

        reg.A = 30;
        operation[operation["SUB_M"]](reg, 0, 0);
        expect(reg.A).toEqual(9);
    });
});
