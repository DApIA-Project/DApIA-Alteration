export type SemanticError = {
  errors: string
  position: {
    endcolumn: number | undefined
    startcolumn: number | undefined
    startline: number | undefined
    endline: number | undefined
  }
}
