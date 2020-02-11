import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBroom } from "@fortawesome/free-solid-svg-icons";

function ListItems(props) {
  const listItems = props.items.map(item => {
    return (
      <div key={item.timestamp} className="panel-block">
        <label className="control is-expanded">
          <input
            type="checkbox"
            onChange={() => props.markItemComplete(item.timestamp)}
          />
          {item.done ? <del>{item.text}</del> : item.text}
        </label>

        <button
          className="button is-danger is-small is-light"
          onClick={() => props.deleteItem(item.timestamp)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  });

  let panelContents;

  if (props.items.length === 0) {
    panelContents = <p className="panel-block">You have nothing to do yet.</p>;
  } else {
    panelContents = listItems;
  }

  return (
    <nav className="panel is-info">
      <p className="panel-heading">Things You Need To Do</p>

      {panelContents}

      {props.items.length !== 0 && (
        <div className="panel-block">
          <button
            className="button is-link is-outlined is-fullwidth is-danger"
            onClick={props.clearCompleted}
          >
            <FontAwesomeIcon icon={faBroom} />
            &nbsp; Clear Complete Items
          </button>
        </div>
      )}
    </nav>
  );
}

export default ListItems;
