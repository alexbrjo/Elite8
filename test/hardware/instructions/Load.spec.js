/**
 * Tests the Load operations.
 */
describe("testIntructionsLoad", function() {
    /* Incremented every command ran */
    var n = 0;
    
    it ("MOV *,*", function() {
        var R = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < R.length; i++) {
            for (var j = 0; j < R.length; j++) {
                var reg = MolassesRegisters();
                var op = operation["MOV_" + R[i] + "_" + R[j]];

                reg[R[i]] = 30;
                reg[R[j]] = 12;
                operation[op](reg);
                expect(reg[R[i]]).toEqual(12);
                expect(reg[R[j]]).toEqual(12);
                
                reg[R[i]] = 0;
                reg[R[j]] = 0;
                operation[op](reg);
                expect(reg[R[i]]).toEqual(0);
                expect(reg[R[j]]).toEqual(0);
                
                reg[R[i]] = 128;
                reg[R[j]] = 255;
                operation[op](reg);
                expect(reg[R[i]]).toEqual(255);
                expect(reg[R[j]]).toEqual(255);

                n++;
            }

            // tests MOV *,M
            var reg = MolassesRegisters();
            reg.memory = new Memory(8);
            reg.memory.write(2, 55);
            reg.H = 0;
            reg.L = 2;
            operation[operation["MOV_" + R[i] + "_M"]](reg);
            expect(reg[R[i]]).toEqual(55);
        }
    });

    /** Tests MOV M,[ABCDE] */
    it ("MOV M,*", function() {
        var R = ['A', 'B', 'C', 'D', 'E'];
        for (var i = 0; i < R.length; i++) {
            var reg = MolassesRegisters();
            var op = operation["MOV_M_" + R[i]];
            reg.memory = new Memory(8);
            reg.memory.write(5, 66);

            reg.H = 0;
            reg.L = 5;
            reg[R[i]] = 30;
            operation[op](reg);
            expect(reg.memory.read(5)).toEqual(30);

        }

        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(0, 1);
        reg.memory.write(2, 7);
        reg.memory.write(4, 3);
        reg.memory.write(5, 4);
        reg.memory.write(7, 5);

        // Tests MOV M,H
        reg.H = 0;
        reg.L = 5;
        expect(reg.memory.read(5)).toEqual(4);
        operation[operation.MOV_M_H](reg);
        expect(reg.memory.read(5)).toEqual(0);

        // Tests MOV M,L
        reg.H = 0;
        reg.L = 2;
        expect(reg.memory.read(2)).toEqual(7);
        operation[operation.MOV_M_L](reg);
        expect(reg.memory.read(2)).toEqual(2);
    });

    /** Tests MOV R,I */
    it ("MOV R,I", function() {
        var R = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < R.length; i++) {
            var reg = MolassesRegisters();
            var op = operation["MOV_" + R[i] + "_I"];

            reg[R[i]] = 30;
            expect(reg[R[i]]).toEqual(30);
            operation[op](reg, 22);
            expect(reg[R[i]]).toEqual(22);

        }

        // tests MOV M,I
        var reg = MolassesRegisters();
        reg.memory = new Memory(8);
        reg.memory.write(3, 7);

        reg.H = 0;
        reg.L = 3;
        expect(reg.M).toEqual(7);
        operation[operation.MOV_M_I](reg, 22);
        expect(reg.M).toEqual(22);

    });
});
