import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../services/NoteService";

export const useNote = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", body: "" });

  useEffect(() => {
    const fetchNote = async () => {
      const data = await getNoteById(id);
      setNote(data);
    };

    fetchNote();
  }, [id]);

  return note;
};
