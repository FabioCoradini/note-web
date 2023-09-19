import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import NoteDisplay from "../components/noteDisplay";
import ButtonGroup from "../components/common/ButtonGroup";

const DetailsNote = ({ id }) => {
  const { notes } = useNotes();
  const [note, setNote] = useState({});

  useEffect(() => {
    setNote(
      notes.find((note) => {
        return note.id === Number(id);
      })
    );
  }, [id, notes]);

  const navigate = useNavigate();

  const actions = [
    {
      label: "Edit",
      color: "primary",
      onClick: () => navigate(`/notes/update/${note.id}`),
    },
    {
      label: "Delete",
      color: "secondary",
      onClick: () => navigate(`/notes/delete/${note.id}`),
    },
  ];

  return (
    <>
      <NoteDisplay {...note} />
      <ButtonGroup actions={actions} />
    </>
  );
};

export default DetailsNote;
