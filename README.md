<p align="center">
  <img src="https://raw.githubusercontent.com/alexbrjo/MolassOS/master/logo.png" alt="MolassOS 70s style logo"/>
</p>

[![Build Status](https://travis-ci.org/alexbrjo/MolassOS.svg?branch=master)](https://travis-ci.org/alexbrjo/MolassOS) [![Code Climate](https://codeclimate.com/github/alexbrjo/MolassOS/badges/gpa.svg)](https://codeclimate.com/github/alexbrjo/MolassOS) [![Test Coverage](https://codeclimate.com/github/alexbrjo/MolassOS/badges/coverage.svg)](https://codeclimate.com/github/alexbrjo/MolassOS/coverage) ![size](https://img.shields.io/badge/size-1.3k-blue.svg)
===============================
MolassOS is an operating system simulator that can run in your web browser. It 
is modeled after the Datapoint 2200 personal computer and the i8080 microprocessor.

All the operation codes and assembly instructions are exactly what the Intel 
8008 uses, but I/O and memory is done differently. The Syrup Assembler uses the 
Sugar8080 assembly mnemonics.

- [Source Code](src/) 
  - [Microprocessor Simulator](src/Sugar8080) 
    - [Operation codes](src/Sugar8080/instructions)
  - [Syrup Assembler](src/SyrupAsm) 
- [Test Code](test/)
  - [for Sugar8080 Simulator](test/Sugar8080) 
    - [for operations](test/Sugar8080/instructions)
  - [for Syrup Assembler](test/SyrupAsm) 
- [Interactive Book](test/) 

The Interactive Course
----------------------
The goal of the Course is to give developers with experience in high-level 
programming (high-level of abstraction, not advanced programming) an
understanding and basic knowledge of assembling, compiling and booting through 
use of visual aids and interactive demos.

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
4. BASIC
    * The Language: 
    * Compilation: Compiler to assembly to machine with visual processor, memory and output
5. OS Concepts
    * POST and BIOS
    * Real and Protected mode
    * The Boot Sector and Loading
        * The Partion Boot Sector
        * One, two and mixed stage loading 0x0000:0x7c00
    * Setting up memory pages
    * Capturing Input with interrupts

Special Thanks to these fantastic resources
-------------------------------------------
* [wikipedia](https://en.wikipedia.org/wiki/BASIC)
* [wikichip](https://en.wikichip.org)
* [OS Dev Wiki](http://wiki.osdev.org/)
* [DataPoint 2200 introductions](http://www.sbprojects.com/sbasm/dp2200.php)
* The DataPoint 2200 Programmer's Manual (1971, Intel corp.)
* The Intel 8080 Assembly Programming Manual (1975, Intel corp.)
* Code Climate for the free student account
