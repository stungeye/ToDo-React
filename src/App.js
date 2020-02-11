import React, { Component } from "react";
import "./styles.css";
import ListItems from "./ListItems.js";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoItems: [],
      currentItem: ""
    };

    this.toDoInput = React.createRef();
  }

  handleInput = () => {
    this.setState({ currentItem: this.toDoInput.current.value });
  }

  addItem = (event) => {
    event.preventDefault();

    const newItem = this.state.currentItem.trim();

    if (newItem !== "") {
      const newToDoItems = [
        ...this.state.toDoItems,
        { text: newItem, done: false, timestamp: Date.now() }
      ];
      this.setState({ toDoItems: newToDoItems, currentItem: "" });
    }

    this.toDoInput.current.focus();
  }

  deleteItem = (timestamp) => {
    const newToDoItems = [...this.state.toDoItems].filter(item => {
      return item.timestamp !== timestamp;
    });

    this.setState({ toDoItems: newToDoItems });
    this.toDoInput.current.focus();
  }

  markItemComplete = (timestamp) => {
    const newToDoItems = [...this.state.toDoItems].map(item => {
      if (item.timestamp === timestamp) {
        item.done = !item.done;
      }
      return item;
    });

    this.setState({ toDoItems: newToDoItems });
  }

  clearCompleted = () => {
    const newToDoItems = this.state.toDoItems.filter(item => {
      return !item.done;
    });

    this.setState({ toDoItems: newToDoItems });
    this.toDoInput.current.focus();
  }

  render() {
    return (
      <div className="App">

        <h1 className="title">Getting Things Done!</h1>

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
              <button className="button is-primary">Add</button>
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