/**
 * Compiles Intel 8080 assembly mnemonics to machine code
 */
var MolassesASM = function() {

    /** The last compilation */
    var last = null;

    /**
     * Gets the last compilation
     * @return {Object} the last compilation
     */
    this.getLast = function () {
        return last;
    };

    /**
     * Compiles assembly into an executable binary
     * @param {String} src the source code
     * @param {Number} size the size in bytes of the executable (optional)
     * @return {Object} results of compilation
     */
    this.compile = function (src, size) {
        // removes comments, converts values and literals to hex
        var preprocessed = preprocess(src);
        // assemble into binary
        last = assemble(preprocessed.output, size);

        return last;
    };

};
