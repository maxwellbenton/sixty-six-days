import React from "react";
import { connect } from "react-redux";
import { addNote, removeNote, updateNote } from "../actions";

class NotePad extends React.Component {
  state = {
    selectedNote: null,
    selectedElement: null,
    focusedInput: null
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focusedInput) {
      let note = this.state.focusedInput.lastChild.id;
      debugger;
      // let comment = this[this.state.focusedInput.id].childNodes.length - 1;
      // this[`${note}${comment}`].focus();
    }
  }
  handleClick = e => {
    this.props.addNote({
      title: "",
      content: [{ id: 1, text: "", checked: false }],
      x: e.clientX,
      y: e.clientY,
      width: 180,
      height: 80
    });
  };

  handleDrag = (e, note) => {
    e.stopPropagation();
    e.preventDefault();
    e.persist();
    e.cancelBubble = true;
    e.returnValue = false;
    e.target.focus();
    console.log("drag");
    this.setState({ selectedNote: note });
    this.props.updateNote(note);
    window.addEventListener("mousemove", this.handleDragging, true);
  };

  handleDragCancel = e => {
    e.stopPropagation();
    console.log("drop");
    window.removeEventListener("mousemove", this.handleDragging, true);
  };

  handleDragging = e => {
    let newNote = this.state.selectedNote;
    let offsetY = e.target.offsetTop - e.clientY;
    let offsetX = e.target.offsetLeft - e.clientX;

    newNote.y = e.clientY - 10;
    newNote.x = e.clientX - 10;
    this.props.updateNote(newNote);
  };

  handleClose = (e, id) => {
    e.stopPropagation();
    this.props.removeNote(id);
  };

  handleChange = (e, note) => {
    e.stopPropagation();
    e.persist();
    let newNote;
    switch (e.target.name) {
      case "title":
        newNote = { ...note, [e.target.name]: e.target.value };
        break;
      case "content":
        newNote = {
          ...note,
          content: note.content.map(obj => {
            if (parseInt(e.target.id, 10) === obj.id) {
              return {
                ...obj,
                text: e.target.value
              };
            } else {
              return obj;
            }
          })
        };
        break;
      case "contentCheckbox":
        newNote = {
          ...note,
          content: note.content.map(obj => {
            if (parseInt(e.target.id, 10) === obj.id) {
              return {
                ...obj,
                checked: !note.content[parseInt(e.target.id, 10) - 1].checked
              };
            } else {
              return obj;
            }
          })
        };
        break;
      default:
        newNote = note;
        break;
    }
    this.props.updateNote(newNote);
  };

  addContent = (e, note) => {
    e.preventDefault();
    let newNote = {
      ...note,
      content: [
        ...note.content,
        { id: note.content.length + 1, text: "", checked: false }
      ]
    };
    this.setState({ selectedNote: note, focusedInput: e.target });
    this.props.updateNote(newNote);
  };

  renderNotes = () => {
    return this.props.notes.map(note => {
      let notes = note.content.map((obj, i) => {
        return (
          <div key={i}>
            <form onSubmit={e => this.addContent(e, note)}>
              <input
                type="checkbox"
                id={obj.id}
                name="contentCheckbox"
                checked={obj.checked}
                onChange={e => this.handleChange(e, note)}
              />{" "}
              <input
                type="text"
                id={obj.id}
                ref={input => (this[`${note.id}${obj.id}`] = input)}
                name="content"
                autocomplete="off"
                value={obj.text}
                onClick={() => this.setState({ selectedNote: note })}
                onChange={e => this.handleChange(e, note)}
              />
            </form>
          </div>
        );
      });

      return (
        <div
          key={note.id}
          id={note.id}
          ref={div => (this[`${note.id}`] = div)}
          className="note"
          style={{
            top: note.y,
            left: note.x,
            width: note.width,
            minHeight: note.height,
            height: "auto",
            background: 'url("dragIcon.png") no-repeat 2% 2%',

            backgroundColor: "#333"
          }}
          onMouseDown={e => this.handleDrag(e, note)}
        >
          <div>
            <button onClick={e => this.handleClose(e, note.id)}>X</button>
            <input
              type="text"
              name="title"
              autocomplete="off"
              value={note.title}
              placeholder="Add Title"
              onChange={e => this.handleChange(e, note)}
            />
          </div>
          {notes}
        </div>
      );
    });
  };
  render() {
    console.log(this);
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        onMouseDown={this.handleClick}
        onMouseUp={this.handleDragCancel}
      >
        {this.renderNotes()}
      </div>
    );
  }
}

// onMouseDown={e => this.handleMouseDownSizeChange(e, note)}
// onMouseUp={e => this.handleMouseUpSizeChange(e, note)}
// <img
//   src="dragIcon2.png"
//   alt="drag"
//   style={{ position: "absolute", right: 5, bottom: 5 }}
// />
export default connect(({ userData }) => ({ ...userData }), {
  addNote,
  removeNote,
  updateNote
})(NotePad);
