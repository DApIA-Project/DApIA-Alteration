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
exports.parseAndValidate = exports.generateAction = void 0;
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const module_1 = require("../language-server/generated/module");
const fditscenario_module_1 = require("../language-server/fditscenario-module");
const cli_util_1 = require("./cli-util");
const generator_1 = require("../generator/generator");
const node_1 = require("langium/node");
const cli_util_2 = require("./cli-util");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const generateAction = (fileName, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const services = (0, fditscenario_module_1.createFditscenarioServices)(node_1.NodeFileSystem).Fditscenario;
    const scenario = yield (0, cli_util_1.extractAstNode)(fileName, services);
    // invoke generator to get commands
    const cmds = (0, generator_1.generateCommands)(scenario, "");
    // handle file related functionality here now
    const data = (0, cli_util_2.extractDestinationAndName)(fileName, opts.destination);
    const generatedFilePath = `${path_1.default.join(data.destination, data.name)}.json`;
    if (!fs_1.default.existsSync(data.destination)) {
        fs_1.default.mkdirSync(data.destination, { recursive: true });
    }
    fs_1.default.writeFileSync(generatedFilePath, JSON.stringify(cmds, undefined, 2));
    console.log(chalk_1.default.green(`FditScenario commands generated successfully: ${generatedFilePath}`));
});
exports.generateAction = generateAction;
/**
 * Parse and validate a program written in our language.
 * Verifies that no lexer or parser errors occur.
 * Implicitly also checks for validation errors while extracting the document
 *
 * @param fileName Program to validate
 */
const parseAndValidate = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    // retrieve the services for our language
    const services = (0, fditscenario_module_1.createFditscenarioServices)(node_1.NodeFileSystem).Fditscenario;
    // extract a document for our program
    const document = yield (0, cli_util_1.extractDocument)(fileName, services);
    // extract the parse result details
    const parseResult = document.parseResult;
    // verify no lexer, parser, or general diagnostic errors show up
    if (parseResult.lexerErrors.length === 0 &&
        parseResult.parserErrors.length === 0) {
        console.log(chalk_1.default.green(`Parsed and validated ${fileName} successfully!`));
    }
    else {
        console.log(chalk_1.default.red(`Failed to parse and validate ${fileName}!`));
    }
});
exports.parseAndValidate = parseAndValidate;
function default_1() {
    const program = new commander_1.Command();
    program
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        .version(require('../../package.json').version);
    const fileExtensions = module_1.AttackScenarioGrammarLanguageMetaData.fileExtensions.join(', ');
    program
        .command('generate')
        .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
        .option('-d, --destination <dir>', 'destination directory of generating')
        .description('generates FditScenario commands in json')
        .action(exports.generateAction);
    program
        .command('parseAndValidate')
        .argument('<file>', `Source file to parse & validate (ending in ${fileExtensions})`)
        .description('Indicates where a program parses & validates successfully, but produce no output code')
        .action(exports.parseAndValidate); // we'll need to implement this function
    program.parse(process.argv);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map