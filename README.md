<p align="center">
  <img src="https://raw.githubusercontent.com/alexbrjo/MolassOS/master/logo.png" alt="MolassOS"/>
</p>

[![Build Status](https://travis-ci.org/alexbrjo/MolassOS.svg?branch=master)](https://travis-ci.org/alexbrjo/MolassOS)
===============================
MolassOS is an operating system simulator that can run in your web browser. It 
is modeled after the Datapoint 2200 personal computer and the i8080 microprocessor.

All the operation codes and assembly instructions are exactly what the Intel 
8008 uses, but I/O and memory is done differently. The Sugar Assembler uses the 
Agave 8080 updated assembly mnemonics.

- [Source Code](src/) 
  - [Microprocessor Simulator](src/Agave8080) 
    - [Operation codes](src/Agave8080/instructions)
  - [Sugar Assembler](src/SugarAsm) 
- [Test Code](test/)
  - [for Agave 8080 Simulator](test/Agave8080) 
    - [for operations](test/Agave8080/instructions)
  - [for Sugar Assembler](test/SugarAsm) 
- [Interactive Book](test/) 

The Interactive Course
----------------------
The goal of the Course is to give developers with experience in high-level 
programming (high-level of abstraction, not advanced programming) an
understanding and basic knowledge of assembling, compiling and booting through 
use of visual aids and interactive demos.

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
5. Bootloaders and the OS
6. MolassOS

Special Thanks to these fantastic resources
-------------------------------------------
* [wikipedia](https://en.wikipedia.org/wiki/BASIC)
* [DataPoint 2200 introduction](http://www.sbprojects.com/sbasm/dp2200.php)
* The DataPoint 2200 Programmer's Manual (1971 Intel corp.)
* The Intel 8080 Assembly Programming Manual (1975 Intel corp.)
