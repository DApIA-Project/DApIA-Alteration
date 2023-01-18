"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langium_1 = require("langium");
const browser_1 = require("vscode-languageserver/browser");
const fditscenario_module_1 = require("./fditscenario-module");
/* browser specific setup code */
const messageReader = new browser_1.BrowserMessageReader(self);
const messageWriter = new browser_1.BrowserMessageWriter(self);
const connection = (0, browser_1.createConnection)(messageReader, messageWriter);
// Inject the shared services and language-specific services
const { shared } = (0, fditscenario_module_1.createFditscenarioServices)(Object.assign({ connection }, langium_1.EmptyFileSystem));
// Start the language server with the shared services
(0, langium_1.startLanguageServer)(shared);
//# sourceMappingURL=main-browser.js.map