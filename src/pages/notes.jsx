import React, { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import _ from "loadsh";
import { Link } from "react-router-dom";
import NoteCardList from "../components/noteCardList";
import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { trackEvent } from "../analytics";

const Notes = () => {
  const { notes, error, loading } = useNotes();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      trackEvent("Note", "User", "Performed a Search");
    }
  };

  const getData = () => {
    let filtered = notes;
    if (searchQuery)
      filtered = notes.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    let orderBy = _.orderBy(filtered, ["dateCreation"], ["desc"]);

    return { data: orderBy };
  };

  const { length: count } = notes;

  if (count === 0) return <CircularProgress />;

  const { data: notesData } = getData();

  return (
    <div className="row m-2">
      <div className="col">
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            style={{ flex: 1, marginRight: 10 }}
          />
          <Link to="/notes/new">
            <Button variant="contained" color="primary">
              Add New Note
            </Button>
          </Link>
        </Box>

        {loading ? <CircularProgress /> : <NoteCardList notes={notesData} />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Notes;
