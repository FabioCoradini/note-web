import React from "react";
import { useNavigate } from "react-router-dom";
import NoteDisplay from "../components/noteDisplay";
import ButtonGroup from "../components/common/ButtonGroup";
import { useNote } from "../hooks/useNote";

const Note = () => {
  const note = useNote();
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
      <NoteDisplay title={note.title} body={note.body} />
      <ButtonGroup actions={actions} />
    </>
  );
};

export default Note;
