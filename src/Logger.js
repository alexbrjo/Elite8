/**
 * Handles all logging for the application, pretty simple. Only supports in-browser JavaScript
 * console.
 */
function Logger () {

    /**
     * Logs an info message. This is intended for information that doesn't effect the
     * program execution, but could be helpful for trouble shooting.
     *
     * @param {String} message the info message to log
     */
    this.info = function (message) { this.println("[INFO]: "); }

    /**
     * Logs an warning message. This is intended to inform the user that the environment could
     * affect execution, there is a potential for error or that a function is deprecated.
     *
     * @param {String} message the warning message to log
     */
    this.warn = function (message) { this.println("[WARN]: "); }

    /**
     * Logs an error. Intended to be used when their is an error or problem during runtime and
     * affects execution. Implies that there is a use case that cannot execute completely or
     * successfully.
     *
     * @param {String} message the error message to log
     */
    this.error  = function (message) { this.println("[ERROR]: "); }

    /**
     * Logs a fatal error. This is intended for use when an error completely prevents the program
     * from execution.
     *
     * @param {String} message the error message to log
     */
    this.fatal  = function (message) { this.println("[FATAL]: "); }

    /**
     * Prints a string to the console.
     *
     * @param {String} message the message to log
     */
    this.println = function (message) {
        if (message instanceof "String") {
            console.log(message);
        } else {
            this.error("message must be a String");
        }
    }

    /** if ansi color is enabled in the console, not yet implemented */
    var color = false;
    /** Enables log colors */
    this.enableColor = function () { color = true; }
    /** Disables log colors */
    this.disableColor = function () { color = false; }
}