#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const meow_1 = __importDefault(require("meow"));
const ui_1 = __importDefault(require("./ui"));
//@ts-ignore
const cli = (0, meow_1.default)(`
	Usage
	  $ ink_zustand

	Options
		--name  Your name

	Examples
	  $ ink_zustand --name=Jane
	  Hello, Jane
`, {
    flags: {
        name: {
            type: 'string'
        }
    }
});
(0, ink_1.render)(react_1.default.createElement(ui_1.default, null));
