import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { ReactServiceWorker } from "./ReactServiceWorker.js";

import "./styles.css";

function App() {
  const [counter, setcounter] = useState(0);

  const decrement = () => {
    stateToServiceWorker({
      state: counter - 1
    });

    setcounter(counter - 1);
  };

  const increment = () => {
    stateToServiceWorker({
      state: counter + 1
    });

    setcounter(counter + 1);
  };

  const stateToServiceWorker = data => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(data);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
          navigator.serviceWorker.addEventListener("message", function(event) {
            if (event.data && event.data.state !== undefined) {
              console.log(event.data);
              setcounter(event.data.state);
            }
          });
        })
        .catch(error => {
          console.log("Error : ", error);
        });
    }
  }, [setcounter]);

  return (
    <div className="App">
      {/* <div className="container">
        <div className="counter">{counter}</div>
        <button className="decrement" onClick={decrement}>
          -
        </button>
        <button className="increment" onClick={increment}>
          +
        </button>
      </div> */}

      <ReactServiceWorker />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
