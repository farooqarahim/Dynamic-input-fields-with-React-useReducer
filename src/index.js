import React, { useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      state.splice(action.payload.index, 1);
      return [...state];
    case "update":
      state[action.payload.index]["value"] = action.payload.value;
      return [...state];
    default:
      return state;
  }
};

const App = () => {
  let initialState = [
    {
      type: "add",
      payload: { value: null }
    }
  ];

  const [inputFields, setInputFields] = useReducer(reducer, initialState);

  const handleAddMoreFields = () => {
    setInputFields({
      type: "add",
      payload: { value: null }
    });
  };

  const handleRemoveField = index => {
    setInputFields({
      type: "remove",
      payload: { index: index }
    });
  };

  const handleFieldValues = (i, event) => {
    setInputFields({
      type: "update",
      payload: { index: i, value: event.target.value }
    });
  };

  return (
    <div className="App">
      <h1>Dynamic input fields with React.js / useReducer</h1>
      {inputFields.map((item, index) => {
        return (
          <div key={`${item}-${index}`} className="Wrapper">
            <input
              className="InputField"
              type="text"
              placeholder="Enter text"
              value={item.value || ""}
              onChange={e => handleFieldValues(index, e)}
            />
            <button
              type="button"
              className="remove-button button"
              onClick={() => handleRemoveField(index)}
            >
              Remove
            </button>
          </div>
        );
      })}

      {inputFields.length === 0 && (
        <div className="nothing">Click the button below to add field</div>
      )}

      <button
        type="button"
        className="add-button button"
        onClick={() => handleAddMoreFields()}
      >
        Add More Input Fields
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
