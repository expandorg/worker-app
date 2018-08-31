// @flow

export default class EventSourceDefinition {
  eventHandlers: Object;

  constructor(events: Object) {
    this.eventHandlers = events;
  }

  getUrl(url: string, params?: Object) {
    throw new Error(
      `getUrl() not implemented: ${url}, ${params ? params.toString() : ''}`
    );
  }

  create = (
    url: string,
    dispatch: Function,
    onClose: Function,
    params?: Object
  ) => {
    const source = new window.EventSource(url, { withCredentials: true });

    source.addEventListener('error', this.errorHandler(source, onClose));
    this.bindEventHandlers(source, dispatch, params);

    return source;
  };

  errorHandler(source: window.EventSource, onClose: Function) {
    return (e: Object) => {
      if (e.readyState !== window.EventSource.CLOSED) {
        source.close();
      }
      onClose();
    };
  }

  bindEventHandlers(
    source: window.EventSource,
    dispatch: Function,
    params?: Object
  ) {
    Reflect.ownKeys(this.eventHandlers).forEach(eventType => {
      source.addEventListener(eventType, e => {
        const action = this.eventHandlers[eventType];
        const data = JSON.parse(e.data);

        dispatch(action(data, params));

        source.close();
      });
    });
  }
}
