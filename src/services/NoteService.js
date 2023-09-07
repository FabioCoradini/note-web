import { trackApiCall } from "../analytics";

const BASE_URL = "https://localhost:7215/api/v1/notes"; //process.env.BASE_URL_NOTE_API;

export const createNote = async (note) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      trackApiCall("create_note", "Failed");
      throw new Error("Failed to create note");
    }

    trackApiCall("create_note", "Success");
    return await response.json();
  } catch (error) {
    trackApiCall("create_note", "Error");
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      trackApiCall("get_note_by_id", "Failed");
      throw new Error("Failed to fetch note");
    }

    trackApiCall("get_note_by_id", "Success");
    return await response.json();
  } catch (error) {
    trackApiCall("get_note_by_id", "Error");
    throw error;
  }
};

export const getAllNotes = async () => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      trackApiCall("Get All Notes", "Failed");
      throw new Error("Failed to fetch notes");
    }
    trackApiCall("get_notes", "Success");
    return await response.json();
  } catch (error) {
    trackApiCall("get_notes", "Error");
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      trackApiCall("update_note", "Failed");
      throw new Error("Failed to update note");
    }

    trackApiCall("update_note", "Success");
    return await response.json();
  } catch (error) {
    trackApiCall("update_note", "Error");
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      trackApiCall("delete_note", "Failed");
      throw new Error("Failed to delete note");
    }

    trackApiCall("delete_note", "Success");
    return response;
  } catch (error) {
    trackApiCall("delete_note", "Error");
    throw error;
  }
};
