import React, { Component } from "react";
import _ from "loadsh";
import { getAllNotes, deleteNote } from "../services/NoteService";
import { Link } from "react-router-dom";
import NoteCardList from "../components/noteCardList";
import { Box, Button, TextField } from "@mui/material";

class Notes extends Component {
  state = {
    notes: [],
    searchQuery: "",
  };
  search = React.createRef();

  async componentDidMount() {
    this.setState({
      notes: await getAllNotes(),
    });
  }

  handleDelete = (note) => {
    deleteNote(note.id);
    this.setState({ notes: getAllNotes() });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  getData() {
    const { notes: allNotes, searchQuery } = this.state;
    let filtered = allNotes;
    if (searchQuery)
      filtered = allNotes.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    let orderBy = _.orderBy(filtered, ["dateCreation"], ["desc"]);

    return { data: orderBy };
  }

  render() {
    const { length: count } = this.state.notes;
    const { searchQuery } = this.state;

    if (count === 0) return "No notes in Database";

    const { data: notes } = this.getData();

    return (
      <div className="row m-2">
        <div className="col">
          <Box display="flex" justifyContent="space-between" marginBottom={2}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={this.handleSearch}
              style={{ flex: 1, marginRight: 10 }}
            />
            <Link to="/notes/new">
              <Button variant="contained" color="primary">
                Add New Note
              </Button>
            </Link>
          </Box>

          {<NoteCardList notes={notes} />}
        </div>
      </div>
    );
  }
}

export default Notes;
