/** Instruction:     ADD #                   Opcode:         0x80-0x80    *
 *  Bytes:            2                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the immediate value to register A                  **/
operation[operation.ADD_I] = function (reg, a) {
    var sum = reg.A + a; // sum A and immediate value
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 2;                // next instruction, skip over immediate value
};

/** Instruction:     ADD R                   Opcode:         0x80-0x87    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' to register A            **/

/* Add 'R' for A */
operation[operation.ADD_A] = function (reg) {
    var sum = reg.A + reg.A; // sum A and A
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for B */
operation[operation.ADD_B] = function (reg) {
    var sum = reg.A + reg.B; // sum A and B
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for C */
operation[operation.ADD_C] = function (reg) {
    var sum = reg.A + reg.C; // sum A and C
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for D */
operation[operation.ADD_D] = function (reg) {
    var sum = reg.A + reg.D; // sum A and D
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for E */
operation[operation.ADD_E] = function (reg) {
    var sum = reg.A + reg.E; // sum A and E
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;      // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for H */
operation[operation.ADD_H] = function (reg) {
    var sum = reg.A + reg.H; // sum A and H
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for L */
operation[operation.ADD_L] = function (reg) {
    var sum = reg.A + reg.L; // sum A and L
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADD 'R' for M */
operation[operation.ADD_M] = function (reg) {
    var sum = reg.A + reg.M; // sum A and M
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0;       // set zero flag
    reg.PARITY = sum % 2 === 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/** Instruction:     ADC R                   Opcode:         0x88-0x8F    *
 *  Bytes:            1                      Alternatives:    -           *
 *  Affected flags:  all                                                  *
 *  Description: adds the value of register 'R' and carry flag to A      **/

/* ADC 'R' for A */
operation[operation.ADC_A] = function (reg) {
    var sum = reg.A + reg.A + reg.CARRY; // sum A and A
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for B */
operation[operation.ADC_B] = function (reg) {
    var sum = reg.A + reg.B + reg.CARRY; // sum A and B
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for C */
operation[operation.ADC_C] = function (reg) {
    var sum = reg.A + reg.C + reg.CARRY; // sum A and C
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for D */
operation[operation.ADC_D] = function (reg) {
    var sum = reg.A + reg.D; // sum A and D
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for E */
operation[operation.ADC_E] = function (reg) {
    var sum = reg.A + reg.E + reg.CARRY; // sum A and E
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;      // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for H */
operation[operation.ADC_H] = function (reg) {
    var sum = reg.A + reg.H + reg.CARRY; // sum A and H
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for L */
operation[operation.ADC_L] = function (reg) {
    var sum = reg.A + reg.L + reg.CARRY; // sum A and L
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0 ? 1 : 0;       // set zero flag
    reg.PARITY = sum % 2 === 0 ? 1 : 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};

/* ADC 'R' for M */
operation[operation.ADC_M] = function (reg) {
    var sum = reg.A + reg.M + reg.CARRY; // sum A and M
    
    // if sum is greater than 255, carry 
    if (sum > 0xFF) {
        sum = sum % 256;
        reg.CARRY = 1;
    } else {
        reg.CARRY = 0;
    }
    
    reg.SIGN = 0;               // result of addition never negative
    reg.ZERO = sum === 0;       // set zero flag
    reg.PARITY = sum % 2 === 0; // set parity flag
    reg.A = sum;                // set sum in Accumulator
    reg.PC += 1;                // next instruction
};
