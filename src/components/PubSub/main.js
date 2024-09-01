import React from "react";
import Events from "./pubsub";
import styles from "./main.module.css";

function Publisher(props) {
  function publishEvent(eventName) {
    props.eventInstance.publish(eventName, `This is ${eventName} published!`);
  }

  return (
    <div className={styles.publisher}>
      <h2>Event Publisher</h2>
      <button onClick={() => publishEvent("Event-1")}>Publish 1</button>
      <button onClick={() => publishEvent("Event-2")}>Publish 2</button>
    </div>
  );
}

function Subscriber(props) {
  const [messages, setMessages] = React.useState([""]);

  const onMessage = React.useCallback(function (msg) {
    setMessages((prevMessages) => [...prevMessages, msg]);
  }, []);

  function subscribeEvent(eventName) {
    props.eventInstance.subscribe(eventName, onMessage);
  }

  function unsubscribeEvent(eventName) {
    props.eventInstance.unsubscribe(eventName, onMessage);
    setMessages([]);
  }

  function getCheckBox(eventCount) {
    return (
      <label className={styles.label}>
        <span>Subscribe {eventCount}</span>
        <input
          type="checkbox"
          onChange={(e) =>
            e.target.checked
              ? subscribeEvent(`Event-${eventCount}`)
              : unsubscribeEvent(`Event-${eventCount}`)
          }
        />
      </label>
    );
  }

  return (
    <div className={`${styles.publisher} ${styles.subscriber}`}>
      <h2>Event subscriber {props.id}</h2>
      <div className={styles.inputContainer}>
        {getCheckBox(1)}
        {getCheckBox(2)}
        <button onClick={() => setMessages([])}>Clear</button>
      </div>
      {messages.map((message, idx) => (
        <div key={idx} className={styles.mt20}>
          {message}
        </div>
      ))}
    </div>
  );
}

function MainComponent() {
  const eventInstance = React.useMemo(() => new Events());

  return (
    <div className={styles.p20}>
      <Publisher eventInstance={eventInstance} />
      <Subscriber eventInstance={eventInstance} id={1} />
      <Subscriber eventInstance={eventInstance} id={2} />
      <Subscriber eventInstance={eventInstance} id={3} />
    </div>
  );
}

export default MainComponent;
