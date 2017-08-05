/**
 * Assembles Intel 8080 assembly mnemonics to machine code
 */
var MolassesASM = function() {
    /** The Project Control group */
    var pcGroup = new RegExp("^(JMP|RET|CALL)$|^[JRC]{1}(NZ|NC|PO|P|Z|P|PE|M)$");
    /** The math group, needs immed value */
    var mathGroup = new RegExp("^(AD|AC|SU|SB|OR|XR|AN|CP)I$");
    /**
     * Separates ("chews") a 16-bit number into 2 bytes
     * @param {Number} addr a number 0 to 65536 
     * @returns {Object} address split into 2 bytes
     */
    this.chewAddress = function(addr) {
        var h = Math.floor(addr / 256); // calculate high order address
        var l = addr - h * 256; // calculate low order address
        return {
            "0": l,
            "1": h,
            get low () {
                return this[0];
            },
            get high(){
                return this[1];
            }
        };
    };
    
    this.preprocess = preprocess;
    this.assemble = assemble;
    
    /**
     * Regex patterns for different states
     * 
     * @param {string} t The operation string
     * @returns {string} the state of the input
     */
    this.getState = function (t) {
        if (pcGroup.test(t)) return "wait_address";
        if (mathGroup.test(t)) return "wait_immed";
        return "new_line";
    };
};
