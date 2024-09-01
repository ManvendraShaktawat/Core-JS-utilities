class Events {
  constructor() {
    this.subscribers = {};
  }

  subscribe(eventName, callback) {
    if (!this.subscribers[eventName]) {
      this.subscribers = {
        ...this.subscribers,
        [eventName]: [],
      };
    }
    this.subscribers[eventName].push(callback);
  }

  unsubscribe(eventName, subscriber) {
    const eventSubscribers = this.subscribers[eventName];
    if (eventSubscribers) {
      this.subscribers[eventName] = eventSubscribers.filter(
        (s) => s !== subscriber
      );
    }
  }

  publish(eventName, eventMessage) {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach((callback) => {
        callback(eventMessage);
      });
    }
  }
}

export default Events;
