/**
 * Tests the Load operations. Currently only tests 49 of 71
 * TODO test M and I MOV commands
 */
describe("testIntructionsLoad", function() {
    /* Incremented every command ran */
    var n = 0;
    
    it ("MOV *,*", function() {
        var R = ['A', 'B', 'C', 'D', 'E', 'H', 'L'];
        for (var i = 0; i < R.length; i++) {
            for (var j = 0; j < R.length; j++) {
                if (R[i] === 'M' && R[j] === 'M') continue;
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
        }
    });
});
