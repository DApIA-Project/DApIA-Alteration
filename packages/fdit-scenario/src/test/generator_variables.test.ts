import {EmptyFileSystem, LangiumServices} from "langium";
import {createFditscenarioServices} from "../language-server/fditscenario-module";
import {extractAstNodeFromString} from "../web";
import {ASTScenario} from "../language-server/generated/ast";
import assert from "assert";
import {generateVariables} from "../generator/generator_variables";

describe("generatorVariablesTestMocha", () => {
    let services: LangiumServices | null = null;
    let fileContent = "";
    beforeEach(() => {
        fileContent = "MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:30:48.179,2018/11/25,11:30:48.179,,,474.53,295.86,,,0.0,,,,,\n" +
            "MSG,4,3,5022202,4CA1FA,5022202,2018/11/25,11:50:48.789,2018/11/25,11:50:48.789,,,474.53,295.86,,,0.0,,,,,";
        services = createFditscenarioServices(EmptyFileSystem).Fditscenario;

    })
    context('when scenario have variables list', () => {
        it('returns json with variables int for a list', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = {5,8,9}, hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : [
                        {
                            "variable" : "$test",
                            "values_list" : [5,8,9]
                        }
                    ]
                }
            )
        })



        it('returns json with variables string for a list', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = {\"az\",\"er\",\"ty\"}, hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : [
                        {
                            "variable" : "$test",
                            "values_list" : ["az","er","ty"]
                        }
                    ]
                }
            )
        })

        it('returns json with variables double for a list', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = {12.9,7.8,3.7}, hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : [
                        {
                            "variable" : "$test",
                            "values_list" : [12.9,7.8,3.7]
                        }
                    ]
                }
            )
        })

    it('returns json with variables recording parameter for a list', async () => {
        const scenario = extractAstNodeFromString<ASTScenario>("let $test = {12.9 * REC_DURATION,7.8 * ALT_DURATION,3.7 * REC_NBR_AIRCRAFT}, hide all_planes at $test seconds", services!);
        assert.deepStrictEqual(generateVariables(await scenario),
            {
                "declarations" : [
                    {
                        "variable" : "$test",
                        "values_list" : ["REC_DURATION","ALT_DURATION","REC_NBR_AIRCRAFT"]
                    }
                ]
            }
        )
    })

        it('returns json with variables leftshift and rightshift for a list', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = { >> 12,<< 7, << 3}, hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : [
                        {
                            "variable" : "$test",
                            "values_list" : [12,7,3]
                        }
                    ]
                }
            )
        })

    })

    context('when scenario have variables range', () => {
        it('returns json with variables int for a range', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = [5,8], hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : [
                        {
                            "variable" : "$test",
                            "values_range" : [5,8]
                        }
                    ]
                }
            )
        })

    })

    context('when scenario have not variables', () => {
        it('returns json with no variables because variable is not good declared', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("let $test = 12, hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : []
                }
            )
        })

        it('returns json with no variables because no variable declared', async () => {
            const scenario = extractAstNodeFromString<ASTScenario>("hide all_planes at $test seconds", services!);
            assert.deepStrictEqual(generateVariables(await scenario),
                {
                    "declarations" : []
                }
            )
        })

    })
})