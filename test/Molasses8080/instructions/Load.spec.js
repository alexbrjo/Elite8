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
                if (R[i] === 'M' && R[j] === 'M') continue;
                
                var reg = MolassesRegisters();
                var op = operation["MOV_" + R[i] + "_" + R[j]];
                
                reg[R[i]] = 30;
                reg[R[j]] = 12;
                operation[op](reg);
                
                n++;
            }
        }
    });
    
    it ("All MOV executed", function(){
        // check all 71 MOV commands were tested
        expect(n).toEqual(71); // 63 normal + 8 immed
    });
    
});
