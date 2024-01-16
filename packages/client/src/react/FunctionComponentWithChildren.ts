import React, { PropsWithChildren } from 'react'

export type FunctionComponentWithChildren<P = {}> = React.FunctionComponent<
  PropsWithChildren<P>
>
