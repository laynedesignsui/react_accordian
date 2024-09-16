// There are two types of accordions:
// 1. Single selection - only one item can be expanded at a time.
// 2. Multiple selection - multiple items can be expanded simultaneously.

import { useState } from "react"; // Importing useState hook for state management.
import data from "../data"; // Importing data, which contains the accordion items.
import "../styles.css"; // Importing CSS styles.

export default function Accordian() {
  // State to track which item is selected in single selection mode.
  const [selected, setSelected] = useState(null);

  // State to track whether multi-selection mode is enabled.
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);

  // State to store multiple selected items in multi-selection mode.
  const [multiple, setMultiple] = useState([]);

  // Handles selection in single selection mode.
  function handleSingleSelection(getCurrentId) {
    // Toggle selection - if the clicked item is already selected, deselect it.
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }

  // Handles selection in multi-selection mode.
  function handleMultiSelection(getCurrentId) {
    // Create a copy of the current selected items.
    let copyMultiple = [...multiple];

    // Find the index of the currently clicked item.
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId);

    // If the item is not already selected, add it to the list.
    if (findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId);
    // Otherwise, remove it from the list (deselect it).
    else copyMultiple.splice(findIndexOfCurrentId, 1);

    // Update the state with the new list of selected items.
    setMultiple(copyMultiple);
  }

  // Log the selected state and multiple selection state for debugging.
  console.log(selected, multiple);

  return (
    <div className="wrapper">
      {/* Button to toggle multi-selection mode on or off. */}
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>

      <div className="accordion">
        {/* Check if data is available, then render accordion items. */}
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              {/* Handle click depending on whether multi-selection is enabled. */}
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span> {/* Icon to indicate expandable content. */}
              </div>

              {/* Render content based on whether the item is selected. */}
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="content">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="content">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          // Show message if no data is found.
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
