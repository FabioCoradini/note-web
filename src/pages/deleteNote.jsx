import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteDisplay from "../components/noteDisplay";
import ButtonGroup from "../components/common/ButtonGroup";
import { useNotes } from "../hooks/useNotes";
import { trackEvent } from "../analytics";

const DeleteNote = ({ id }) => {
  const { notes, removeNote } = useNotes();
  const [note, setNote] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setNote(
      notes.find((note) => {
        return note.id === Number(id);
      })
    );
  }, [id, notes]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      trackEvent("Note", "Delete Confirmation", "Delete Note");
      await removeNote(id);
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
      <NoteDisplay {...note} />
      <ButtonGroup actions={actions} />
    </>
  );
};

export default DeleteNote;
