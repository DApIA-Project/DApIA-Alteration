import { parseAndGenerate } from "../web";


describe('indexTest', () => {
    
    
    test('callGenerateCommandsHide', async () => {
        const value = "hide all_planes from 56 seconds until 90 seconds";
        // parse & generate commands for drawing an image
        // execute custom LSP command, and receive the response
        const cmds  = await parseAndGenerate(value,"");
        const resJSONString = JSON.stringify(cmds, undefined, 2);

        const resJson = JSON.parse(resJSONString);
        expect(resJson).toStrictEqual([
            {
              "instructions": [
                {
                  "action": "DELETION",
                  "target": [
                    {
                      "identifier" : "ALL",
                      "filters" : []
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
          ])
    })


    test('callGenerateCommandsHideError', async () => {
      const value = "hide all_planes from seconds until 90 sconds";
      // parse & generate commands for drawing an image
      // execute custom LSP command, and receive the response
      const cmds  = await parseAndGenerate(value,"");
      const resJSONString = JSON.stringify(cmds, undefined, 2);

      const resJson = JSON.parse(resJSONString);
      expect(resJson).toStrictEqual([
          "Erreur de syntaxe"
        ])
  })
})