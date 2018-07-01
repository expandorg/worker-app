// @flow

export type ReduxActionMeta = {
  validation?: Object,
  schema?: Object,
  params?: Object,
  track?: {
    action?: string | Object,
    complete?: string | Object,
    failed?: string | Object,
  }
}

export type ReduxAction = {
  type: string,
  payload: any,
  meta: ?ReduxActionMeta,
  [key: string]: any
}
