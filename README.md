<p align="center">
  <img src="https://raw.githubusercontent.com/alexbrjo/MolassOS/tree/master/docs/logo.png" alt="Molasses 70s style logo"/>
</p>

[![Build Status](https://travis-ci.org/alexbrjo/MolassOS.svg?branch=master)](https://travis-ci.org/alexbrjo/MolassOS) [![Code Climate](https://codeclimate.com/github/alexbrjo/MolassOS/badges/gpa.svg)](https://codeclimate.com/github/alexbrjo/MolassOS) [![Test Coverage](https://codeclimate.com/github/alexbrjo/MolassOS/badges/coverage.svg)](https://codeclimate.com/github/alexbrjo/MolassOS/coverage) ![size](https://img.shields.io/badge/sloc-0.7k-blue.svg) ![size](https://img.shields.io/badge/test_loc-1.2k-lightgrey.svg)
===============================
MolassOS is an operating system simulator that can run in your web browser. Currently 
I'm in the stage of building the hardware emulator.

The operation codes and assembly instructions are exactly what the Intel 
8080 uses. The Assembler uses the Intel 8080 assembly mnemonics. A lot of the 
modules are designed used the i8080 microprocessor and the Datapoint 2200 
programmable terminal as guidance.

- [Source Code](src/) 
  - [Microprocessor Simulator](src/Molasses8080) 
    - [Operation codes](src/Molasses8080/instructions)
  - [Molasses Assembler](src/MolassesASM) 
- [Test Code](test/)
  - [for Molasses8080 Simulator](test/Molasses8080) 
    - [for operations](test/Molasses8080/instructions)
  - [for Molasses Assembler](test/MolassesASM) 
- [Interactive Book](test/) 

Current Tasks
-------------
- Instructions 
  - MOV instructions using M and immed
- Assembler

The Interactive Course
----------------------
To solidify what my knowledge of OS, assembly and hardware I'm writing my notes 
in a way that someone with only higher level programming knowledge could
understand it.

1. Hardware 101
    * Meet the Intel 8080: chart of specs
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
4. OS Concepts
    * POST and BIOS
    * Real and Protected mode
    * The Boot Sector and Loading
        * The Partion Boot Sector
        * One, two and mixed stage loading 0x0000:0x7c00
    * Setting up memory pages
    * The File System and File Formats
    * Capturing Input with interrupts

Special Thanks to these fantastic resources
-------------------------------------------
* [wikipedia](https://en.wikipedia.org/wiki/BASIC)
* [wikichip](https://en.wikichip.org)
* [OS Dev Wiki](http://wiki.osdev.org/)
* [DataPoint 2200 introductions](http://www.sbprojects.com/sbasm/dp2200.php)
* The DataPoint 2200 Programmer's Manual (1971, Intel corp.)
* The Intel 8080 Assembly Programming Manual (1975, Intel corp.)
* Intel 8080/85 Assembly Language Programming  (1977, Intel corp.)
* Code Climate for the free student account
