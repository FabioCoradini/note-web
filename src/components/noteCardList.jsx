import React from "react";
import { Grid } from "@mui/material";
import NoteCard from "./noteCard";

function NoteCardList({ notes }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {notes.map((note, index) => (
        <NoteCard key={index} {...note} />
      ))}
    </Grid>
  );
}

export default NoteCardList;
