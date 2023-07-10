export type Declarations = {
  declarations: Declaration[]
}

export type Declaration = {
  variable: string
  values_range?: number[]
  values_list?: (string | number)[]
}
