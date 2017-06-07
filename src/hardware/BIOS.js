/**
 * The basic input/output system. Not extremely accurate
 * @return {HTMLelement} ele the element to print to
 */
function bios (ele) {
    /**  The element to print to */
    this.element = ele;
    /** The content of the element */
    this.content = "";

    /**
     * Prints a single character.
     * @param {Number} n the character to print, must be a number 0-255
     */
    this.out = function (n) {
        var char = String.fromCharCode(n % 256);
        this.element.append(char);
        this.element.innerHTML = "";
    }

    /**
     * Is called by bios when input happens.
     * @param {Number} n the keycode of the input
     */
    this.inp = function (n) {};

    /**
     * Calls the input function.
     * @param {KeyEvent} event the key event of the input
     */
    this.element.keyDown = function (event) {
        var n = event.keyCode();
        this.inp(n);
    }
}
