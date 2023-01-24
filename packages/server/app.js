"use strict";
/**
 * Simple app for serving generated examples
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
app.listen(8080, function () {
    console.log('Le serveur écoute sur le port 8080');
});
/*app.use((request, reponse) => {
  request.params.custom = 'FDI-T'
  if(request.headers.user === undefined) reponse.status(401).end()
})*/
/*app.post('/scenario', interpretScenarioController)

function interpretScenarioController(req: Request, res: Response<any>): void {
  
  const error = validateBody(req.body)
  if(error) reponse.status(404).send(error)

  const {scenario, recording} = req.body

  const {directives, error} = interpretScenarioCore(scenario, recording)

  if(error) reponse.status(404).send({error})
  
  res.status(200).send({directives})
}

function interpretScenarioCore(scenario: string, recording: string): {directives: JsonObject | null, error: string | null}  {
  // analyse syntaxique
  if(errorSyntaxique) return {directives: null, error: errorSyntaxique}

  // analyse sémantique

  return {directives: generateCommands(scenario), error: null}
}*/
