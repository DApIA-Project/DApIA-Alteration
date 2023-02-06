"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.generateAndDisplay = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = require("../fdit-scenario/src/web/index.js");
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const scenario = req.body.scenario;
    const nom_fichier = req.body.nom_fichier;
    const dslCmds = yield (0, exports.generateAndDisplay)(scenario, nom_fichier);
    console.log(JSON.stringify(dslCmds));
    res.json(dslCmds);
}));
exports.generateAndDisplay = ((scenario, nom_fichier) => __awaiter(void 0, void 0, void 0, function* () {
    console.info('generating & running current code...');
    // parse & generate commands for drawing an image
    // execute custom LSP command, and receive the response
    const dslCmds = yield (0, index_js_1.parseAndGenerate)(scenario, "", nom_fichier, "");
    fs.writeFileSync("public/test.json", JSON.stringify(dslCmds));
    executeAlterationJar();
    return Promise.resolve(dslCmds);
    //updateDslCanvas(dslCmds);
}));
function executeAlterationJar() {
    (0, child_process_1.exec)("java -jar C:\\Users\\morga\\Documents\\Programmation\\FDI-T-Web2\\packages\\alteration\\out\\artifacts\\alteration_atc_jar\\alteration-atc.jar C:\\Users\\morga\\Documents\\Programmation\\FDI-T-Web2\\packages\\server\\public\\test.json", (error, stdout, stderr) => {
        if (error) {
            console.error(`L'exécution a échoué : ${error}`);
            return;
        }
        console.log(`Sortie : ${stdout}`);
    });
}
app.listen(3001, () => console.log('Server started on port 3001'));
