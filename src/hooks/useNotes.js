// hooks/useNotes.js

import { useState, useEffect } from "react";
import {
  getAllNotes,
  deleteNote,
  updateNote as updateNoteApiCall,
  createNote as createNoteApiCall,
} from "../services/NoteService";
export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        const allNotes = await getAllNotes();
        setNotes(allNotes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const createNote = async (note) => {
    setLoading(true);
    setError(null);
    try {
      const id = await createNoteApiCall(note);
      setNotes([...notes, { ...note, id }]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (noteId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteNote(noteId);
      const updatedNotes = await getAllNotes();
      setNotes(updatedNotes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (noteId, note) => {
    setLoading(true);
    setError(null);
    try {
      await updateNoteApiCall(noteId, note);
      const updatedNotes = await getAllNotes();
      setNotes(updatedNotes);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { notes, error, loading, removeNote, updateNote, createNote };
};
