import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import Notes from "./pages/notes";
import NavBar from "./components/common/navbar";
import NotFound from "./pages/notFound";
import DeleteNote from "./pages/deleteNote";
import { initGA, logPageView } from "./analytics";
import EditNote from "./pages/editNote";
import DetailsNote from "./pages/detailsNote";
import CreateNote from "./pages/createNote";
import "./App.css";

function App() {
  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  function EditNoteWrapper() {
    const { id } = useParams();
    return <EditNote id={id} />;
  }

  function DetailsNoteWrapper() {
    const { id } = useParams();
    return <DetailsNote id={id} />;
  }

  function DeleteNoteWrapper() {
    const { id } = useParams();
    return <DeleteNote id={id} />;
  }

  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/notes/update/:id" element={<EditNoteWrapper />} />
          <Route path="/notes/detail/:id" element={<DetailsNoteWrapper />} />
          <Route path="/notes/delete/:id" element={<DeleteNoteWrapper />} />
          <Route path="/notes/new" element={<CreateNote />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/not-found" element={NotFound} />
        </Routes>
      </main>
    </>
  );
}

export default App;
