// @flow
import type EventSourceDefinition from './events/EventSourceDefinition';

export default class EventSourceService {
  static available = window.EventSource !== undefined;

  dispatch: Function;

  backendUrl: string;

  clients: Map<string, window.EventSource> = new Map();

  definitions: Map<string, EventSourceDefinition> = new Map();

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  configure(dispatch: Function) {
    this.dispatch = dispatch;
    return this;
  }

  definition(type: string, definition: EventSourceDefinition) {
    this.definitions.set(type, definition);
    return this;
  }

  subscribe(type: string, params?: Object) {
    if (EventSourceService.available) {
      const definition = this.definitions.get(type);
      if (typeof definition !== 'undefined') {
        const url = definition.getUrl(this.backendUrl, params);

        if (!this.clients.has(url)) {
          const unsubscribe = () => this.unsubscribe(url);
          const eventSource = definition.create(
            url,
            this.dispatch,
            unsubscribe,
            params
          );

          this.clients.set(url, eventSource);
        }
      }
    }
  }

  unsubscribe = (key: string) => {
    if (this.clients.has(key)) {
      this.clients.delete(key);
    }
  };
}
