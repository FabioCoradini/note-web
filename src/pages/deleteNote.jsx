import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../services/NoteService";
import NoteDisplay from "../components/noteDisplay";
import ButtonGroup from "../components/common/ButtonGroup";
import { useNote } from "../hooks/useNote";
import { trackEvent } from "../analytics";

const DeleteNote = () => {
  const note = useNote();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      trackEvent("Note", "Delete Confirmation", "Delete Note");
      await deleteNote(id);
      navigate("/notes");
    }
  };

  const actions = [
    {
      label: "Confirm Delete",
      color: "secondary",
      onClick: () => handleDelete(note.id),
    },
    {
      label: "Cancel",
      color: "primary",
      onClick: () => {
        trackEvent("Note", "Delete Cancelation", "Cancel Delete Note");
        navigate(`/notes/detail/${note.id}`);
      },
    },
  ];

  return (
    <>
      <NoteDisplay title={note.title} body={note.body} />
      <ButtonGroup actions={actions} />
    </>
  );
};

export default DeleteNote;
