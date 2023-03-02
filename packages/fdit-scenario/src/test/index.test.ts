import {parseAndGenerate} from "../web";
import assert from "assert";

describe("indexTestMocha", () => {
    context('when scenario is no valid', () => {
        it('returns json with no action when content is false', async () => {

            const value = "hide all_planes from seconds until 90 sconds";
            // parse & generate commands for drawing an image
            // execute custom LSP command, and receive the response
            const cmds  = await parseAndGenerate(value,"zigzag.sbs");
            assert.deepStrictEqual(cmds,undefined);

        })
    })


    context('when scenario is valid', () => {
        it('returns json with action when content is hide all_planes from until', async () => {
            const value = "hide all_planes from 56 seconds until 90 seconds";
            // parse & generate commands for drawing an image
            // execute custom LSP command, and receive the response
            const cmds  = await parseAndGenerate(value,"zigzag.sbs");
            const resJSONString = JSON.stringify(cmds, undefined, 2);

            const resJson = JSON.parse(resJSONString);
            assert.deepStrictEqual(resJson,
                {
                    "sensors": {
                        "sensor": [
                            {
                                "sensorType": "SBS",
                                "sID": "",
                                "record": "zigzag.sbs",
                                "firstDate": 1543141848,
                                "filter": "",
                                "action": [
                                    {
                                        "alterationType": "DELETION",
                                        "scope": {
                                            "type": "timeWindow",
                                            "lowerBound": "56000",
                                            "upperBound": "90000"
                                        },
                                        "parameters": {
                                            "target": {
                                                "identifier": "hexIdent",
                                                "value": "ALL"
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                }
            )
        })
    })
})