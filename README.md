Elite8
========
Elite8 is not a true emulator, but a simulator. All the operation codes and 
assembly instructions are exactly what the Intel8008 uses, but I/O and memory is 
done slightly differently. Elite8 assembler uses the Intel8080 updated assembly 
mnemonics.

- [Source Code](src/) 
  - [Intel 8008 Simulator](src/Intel8008) 
    - [Operation codes](src/Intel8008/instructions)
  - [Sugar Assembler](src/SugarAsm) 
- [Test Code](test/)
  - [for Intel 8008 Simulator](test/Intel8008) 
    - [for operations](test/Intel8008/instructions)
  - [for Sugar Assembler](test/SugarAsm) 
- [Interactive Book](test/) 

Documentation
-------------
This project has a strong focus on tests and documentation. The end goal is to
have a README in every sub-folder of the project explaining the rationale and 
design pattern.

The Interactive Course
----------------------
The goal of the Course is to give developers with experience in high-level 
programming (high-level of abstraction, not advanced programming) an
understanding and basic knowledge of assembling and compiling through use
of visual aids and interactive demos.

1. Hardware 101
    * Meet the Intel 8008: chart of specs
    * Storing Data: Memory demo with JS console
    * What is a Register?: Register demo with JS console
    * The Microprocessor: Machine code demo with buttons
2. Machine Speak
    * Machine Codes: Machine code demo with JS console
    * Operation Codes: Opcode to machine code 
3. Assembly
    * Abstraction
    * Assembling: Assembler to machine with visual processor, memory and output
    * More on Assemblers
4. BASIC
    * The Language: 
    * Compilation: Compiler to assembly to machine with visual processor, memory and output

Special Thanks to these fantastic resources
-------------------------------------------
en.wikipedia.org/wiki/BASIC
