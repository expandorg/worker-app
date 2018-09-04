// @flow

export type ReduxActionMeta = {
  validation?: Object,
  schema?: Object,
  params?: Object,
  track?: {
    action?: string | Object,
    complete?: string | Object,
    failed?: string | Object,
  },
};

export type ReduxAction = {
  type: string,
  payload: any,
  complete?: boolean,
  failed?: boolean,
  meta: ?ReduxActionMeta,
  [key: string]: any,
};

export type RequestStateType = {
  state: 'NotFetched' | 'Fetching' | 'Fetched' | 'FetchError',
  error?: ?{ [key: string]: string },
};
