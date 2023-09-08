import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { Button, TextField, Paper, Typography } from "@mui/material";
import { createNote } from "../services/NoteService";

const CreateForm = () => {
  const [note, setNote] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Joi schema for validation
  const schema = {
    title: Joi.string().required().label("Title"),
    body: Joi.string().allow("").label("Body"),
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
    await createNote(note);

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
        Create a Note
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default CreateForm;
