import React from "react";
import { TextField } from "@mui/material";

const NoteForm = ({ note, errors, onSubmit, onChange, children }) => {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        required
        id="title"
        label="Title"
        name="title"
        autoFocus
        value={note.title}
        onChange={onChange}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        id="body"
        label="Body"
        name="body"
        multiline
        rows={4}
        value={note.body}
        onChange={onChange}
      />
      {children}
    </form>
  );
};

export default NoteForm;
