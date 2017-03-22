/**
 * Simulatesa and displays the processor
 * @param {Object} processor the processor to visualize
 */
function Simulator (processor) {
    /** Asked Microprocessor for specs */
    var name = processor.manufactorer + " " + processor.model;
    var registers; // need access to registers to display them
    var memory;    // need access to memory to display that
    
    /**
     * On Processor cycle callback the simulator
     * @param {Object} state The physical state of the processor
     */
    this.instructionCallBack = function (state) {
        
    };
    
}
