SugarAssembler
==============
Assembles Intel 8008 Mnemonics's to machine code. Works using the operation
global variable and a massive switch statement. 

Issues
-----
There is a lot of repetition in this module, especially in the switch statements. 
For example: the jump and call groups all write a 2 byte address following the 
operation code. Thats several dozen copies of the same 3 lines. 
 