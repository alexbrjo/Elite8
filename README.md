<p align="center">
  <img src="https://raw.githubusercontent.com/alexbrjo/MolassOS/master/docs/logo.png" alt="Molasses 70s style logo"/>
</p>

[![Build Status](https://travis-ci.org/alexbrjo/MolassOS.svg?branch=master)](https://travis-ci.org/alexbrjo/MolassOS) [![Code Climate](https://codeclimate.com/github/alexbrjo/MolassOS/badges/gpa.svg)](https://codeclimate.com/github/alexbrjo/MolassOS) [![Test Coverage](https://codeclimate.com/github/alexbrjo/MolassOS/badges/coverage.svg)](https://codeclimate.com/github/alexbrjo/MolassOS/coverage) ![size](https://img.shields.io/badge/sloc-0.7k-blue.svg) ![size](https://img.shields.io/badge/test_loc-1.2k-lightgrey.svg)
===============================
MolassOS is an operating system simulator that can run in your web browser. Currently 
I'm in the stage of building the hardware emulator.

The operation codes and assembly instructions are exactly what the Intel 
8080 uses. The Assembler uses the Intel 8080 assembly mnemonics. A lot of the 
modules are designed using the i8080 microprocessor and the Datapoint 2200
programmable terminal as guidance.

- [Source Code](src/) 
  - [Microprocessor Simulator](src/Molasses8080) 
    - [Operation codes](src/Molasses8080/instructions)
  - [Molasses Assembler](src/MolassesASM) 
- [Test Code](test/)
  - [for Molasses8080 Simulator](test/Molasses8080) 
    - [for operations](test/Molasses8080/instructions)
  - [for Molasses Assembler](test/MolassesASM) 
- [Book and Project Docs](docs/)

Building
--------
You need Nodejs and grunt-cli installed globally to build MolassOS. The tests do not take long to run so the default
task builds and tests the application. The following with
```
npm update
npm install grunt
grunt
```
Modules are planned to be built in the following order. This is subject to change
1. `src/Molasses8080/` > `MolassOS.cpu`
2. `src/MolassesASM/` > `MolassOS.asm`
3. Use `MolassOS.asm` to assemble contents of `src/MolassesOS/` into `floppy.json`
4. Bundle `MolassOS.cpu` and contents of `floppy.json` into `MolassOS.emu`
5. If not a sdk build delete `MolassOS.asm`

Current Tasks
-------------
- Assembler
- Finalizing Instructions
  - MOV instructions using M and immed
  - better organization, a lot of redundancy

Short Book and Projects Docs
----------------------------
To solidify what my knowledge of OS, assembly and hardware I'm writing my notes 
in a way that could make sense to someone with higher level programming 
knowledge could understand it. They can be found under the [docs](docs/) folder

Special Thanks to these fantastic resources
-------------------------------------------
* [wikipedia](https://en.wikipedia.org/wiki/BASIC)
* [wikichip](https://en.wikichip.org)
* [OS Dev Wiki](http://wiki.osdev.org/)
* [DataPoint 2200 introductions](http://www.sbprojects.com/sbasm/dp2200.php)
* [BDS C source code]()
* The DataPoint 2200 Programmer's Manual (1971, Intel corp.)
* The Intel 8080 Assembly Programming Manual (1975, Intel corp.)
* Intel 8080/85 Assembly Language Programming  (1977, Intel corp.)
* Crash Course / PBS's Computer Science YouTube series
* Code Climate for the free student account
