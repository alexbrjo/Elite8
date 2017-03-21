Sugar8080 Simulator Tests
=========================
The simulator is the core of the project. So to be confident it will run well
we have to put it through rigorous unit tests. 

Testing the CPU
---------------
- Give instructions and check registers at the end state
- Single cycle step and check register state

Testing the Memory
------------------
- Test with sizes 8, 256, 512, 2048 (Max for Intel 8008 is 16386, but will throw Error)
- Ensured that bytes cannot be set to values greater than 255 or less than 0
- All functions work: read, write, peek, clear, size and ensure they don't interfere

Testing the Operations file
---------------------------
- By testing the instructions the operations get checked, since this file is get an
object of constants it doesn't need devoted testing

Testing the Registers
---------------------
- A, B, C, D, E, H, L, M
- PC, SPs 1-7
- Getting and setting works
- Register M affects H and L correctly and vice versa
- Errors thrown if attempt to store invalid value
