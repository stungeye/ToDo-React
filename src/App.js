import React, { Component } from "react";
import ListItems from "./ListItems.js";
import serializedStorage from "./serializedStorage.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "bulma/css/bulma.css";
import "./styles.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: serializedStorage.fetch(),
      currentItem: ""
    };

    this.toDoInput = React.createRef();
  }

  saveToStorage = () => {
    serializedStorage.save(this.state.toDoItems);
  };

  handleInput = () => {
    this.setState({ currentItem: this.toDoInput.current.value });
  };

  addItem = event => {
    event.preventDefault();

    const newItem = this.state.currentItem.trim();

    if (newItem !== "") {
      const newToDoItems = [
        ...this.state.toDoItems,
        { text: newItem, done: false, timestamp: Date.now() }
      ];
      this.setState(
        { toDoItems: newToDoItems, currentItem: "" },
        this.saveToStorage
      );
    }

    this.toDoInput.current.focus();
  };

  deleteItem = timestamp => {
    const newToDoItems = [...this.state.toDoItems].filter(item => {
      return item.timestamp !== timestamp;
    });

    this.setState({ toDoItems: newToDoItems }, this.saveToStorage);
    this.toDoInput.current.focus();
  };

  markItemComplete = timestamp => {
    const newToDoItems = [...this.state.toDoItems].map(item => {
      if (item.timestamp === timestamp) {
        item.done = !item.done;
      }
      return item;
    });

    this.setState({ toDoItems: newToDoItems }, this.saveToStorage);
  };

  clearCompleted = () => {
    const newToDoItems = this.state.toDoItems.filter(item => {
      return !item.done;
    });

    this.setState({ toDoItems: newToDoItems }, this.saveToStorage);
    this.toDoInput.current.focus();
  };

  render() {
    return (
      <div className="App">
        <form id="to-do-form" onSubmit={this.addItem}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                placeholder="What do you need to do?"
                onChange={this.handleInput}
                value={this.state.currentItem}
                ref={this.toDoInput}
              />
            </div>

            <div className="control">
              <button className="button is-primary">
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </div>
          </div>
        </form>

        <ListItems
          items={this.state.toDoItems}
          deleteItem={this.deleteItem}
          markItemComplete={this.markItemComplete}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
