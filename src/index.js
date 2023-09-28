import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, { value: null }];
    case "remove":
      return state.filter((_, index) => index !== action.payload.index);
    case "update":
      return state.map((item, index) =>
        index === action.payload.index
          ? { ...item, value: action.payload.value }
          : item
      );
    default:
      return state;
  }
};

const App = () => {
  const [inputFields, setInputFields] = useReducer(reducer, initialState);

  const handleAddMoreFields = () => {
    setInputFields({ type: "add" });
  };

  const handleRemoveField = (index) => {
    setInputFields({ type: "remove", payload: { index } });
  };

  const handleFieldValues = (index, event) => {
    setInputFields({
      type: "update",
      payload: { index, value: event.target.value }
    });
  };

  return (
    <div className="App">
      <h1>Dynamic input fields with React.js / useReducer</h1>
      {inputFields.map((item, index) => (
        <div key={index} className="Wrapper">
          <input
            className="InputField"
            type="text"
            placeholder="Enter text"
            value={item.value || ""}
            onChange={(e) => handleFieldValues(index, e)}
          />
          <button
            type="button"
            className="remove-button button"
            onClick={() => handleRemoveField(index)}
          >
            Remove
          </button>
        </div>
      ))}

      {inputFields.length === 0 && (
        <div className="nothing">Click the button below to add field</div>
      )}

      <button
        type="button"
        className="add-button button"
        onClick={handleAddMoreFields}
      >
        Add More Input Fields
      </button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
