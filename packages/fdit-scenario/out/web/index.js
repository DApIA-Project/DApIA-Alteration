"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAndGenerate = exports.extractAstNodeFromString = void 0;
const vscode_uri_1 = require("vscode-uri");
const langium_1 = require("langium");
const fditscenario_module_1 = require("../language-server/fditscenario-module");
const generator_1 = require("../generator/generator");
const chalk_1 = __importDefault(require("chalk"));
/**
 * Extracts an AST node from a virtual document, represented as a string
 * @param content Content to create virtual document from
 * @param services For constructing & building a virtual document
 * @returns A promise for the parsed result of the document
 */
function extractAstNodeFromString(content, services) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // create a document from a string instead of a file
        const doc = services.shared.workspace.LangiumDocumentFactory.fromString(content, vscode_uri_1.URI.parse('memory://fditscenario.document'));
        // proceed with build & validation
        yield services.shared.workspace.DocumentBuilder.build([doc], { validationChecks: 'all' });
        // get the parse result (root of our AST)
        return (_a = doc.parseResult) === null || _a === void 0 ? void 0 : _a.value;
    });
}
exports.extractAstNodeFromString = extractAstNodeFromString;
/**
 * Parses a MiniLogo program & generates output as a list of Objects
 * @param fditscenarioProgram fditscenario program to parse
 * @returns Generated output from this MiniLogo program
 */
function parseAndGenerate(fditscenrioProgram) {
    return __awaiter(this, void 0, void 0, function* () {
        const services = (0, fditscenario_module_1.createFditscenarioServices)(langium_1.EmptyFileSystem).Fditscenario;
        const scenario = yield extractAstNodeFromString(fditscenrioProgram, services);
        // generate fditscenario commands from the model
        console.log("fditscenarioProgram : " + fditscenrioProgram);
        const document = services.shared.workspace.LangiumDocumentFactory.fromString(fditscenrioProgram, vscode_uri_1.URI.parse('memory://fditscenario.document'));
        const parseResult = document.parseResult;
        // verify no lexer, parser, or general diagnostic errors show up
        if (parseResult.lexerErrors.length === 0 &&
            parseResult.parserErrors.length === 0) {
            console.log(chalk_1.default.green(`Parsed and validated successfully!`));
        }
        else {
            console.log(chalk_1.default.red(`Failed to parse and validate !`));
        }
        const cmds = (0, generator_1.generateCommands)(scenario);
        return Promise.resolve(cmds);
    });
}
exports.parseAndGenerate = parseAndGenerate;
//# sourceMappingURL=index.js.map