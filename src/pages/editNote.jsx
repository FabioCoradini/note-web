import React, { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import { useNavigate } from "react-router-dom";

import Joi from "joi-browser";
import { Button, TextField, Paper, Typography } from "@mui/material";

let newNote = {
  id: "",
  title: "",
  body: "",
};

const EditNote = ({ id }) => {
  const { notes, updateNote, loading } = useNotes();
  const [note, setNote] = useState({ ...newNote });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setNote(
      notes.find((note) => {
        return note.id === Number(id);
      }) || { ...newNote }
    );
  }, [id, notes]);

  const schema = {
    id: Joi.required(),
    title: Joi.string().required().label("Title"),
    body: Joi.string().allow("").label("Body"),
    dateCreation: Joi.date().required(),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(note, schema, options);
    if (!error) return null;

    const validationErrors = {};
    for (let item of error.details) {
      validationErrors[item.path[0]] = item.message;
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    await updateNote(note.id, note);
    navigate("/notes");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "20px auto" }}>
      <Typography variant="h5" gutterBottom>
        Edit Note
      </Typography>
      <form onSubmit={handleSubmit}>
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/notes/detail/${id}`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default EditNote;
