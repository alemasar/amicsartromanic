/* eslint-disable */
const loader_utils = require("loader-utils");
const fs = require("fs");
const path = require("path");
const Process = require("../../compiler/CompilerProcess");

class HTMLTemplateMethods {
    compileJs(inputs, output) {
        const compilerProcess = new Process(template, JSParser, WebComponentJSCompiler)
        const promise = compilerProcess.process(inputs.json, inputs.webpack)
    }
}