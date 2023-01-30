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
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("../web");
describe('indexTest', () => {
    test('callGenerateCommandsHide', () => __awaiter(void 0, void 0, void 0, function* () {
        const value = "hide all_planes from 56 seconds until 90 seconds";
        // parse & generate commands for drawing an image
        // execute custom LSP command, and receive the response
        const cmds = yield (0, web_1.parseAndGenerate)(value);
        const resJSONString = JSON.stringify(cmds, undefined, 2);
        const resJson = JSON.parse(resJSONString);
        expect(resJson).toStrictEqual([
            {
                "instructions": [
                    {
                        "action": "DELETION",
                        "target": [
                            {
                                "identifier": "ALL",
                                "filters": []
                            }
                        ],
                        "scope": [
                            {
                                "type": "timeWindow",
                                "lowerBound": 56,
                                "upperBound": 90
                            }
                        ],
                        "trigger": [],
                        "assertions": []
                    }
                ]
            }
        ]);
    }));
    test('callGenerateCommandsHideError', () => __awaiter(void 0, void 0, void 0, function* () {
        const value = "hide all_planes from seconds until 90 sconds";
        // parse & generate commands for drawing an image
        // execute custom LSP command, and receive the response
        const cmds = yield (0, web_1.parseAndGenerate)(value);
        const resJSONString = JSON.stringify(cmds, undefined, 2);
        const resJson = JSON.parse(resJSONString);
        expect(resJson).toStrictEqual([
            "Erreur de syntaxe"
        ]);
    }));
});
//# sourceMappingURL=index.test.js.map