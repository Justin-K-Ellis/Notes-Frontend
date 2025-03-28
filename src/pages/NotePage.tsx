import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../interfaces.ts";

export default function NotePage() {
  const [editmode, setEditmode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { noteId } = useParams();
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const response = await fetch(`${api}/note/${noteId}`);
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (data) {
      const note: Note = data;
      setTitle(note.title);
      setContent(note.content);
    }
  }, [data]);

  async function handleNoteUpdate() {
    const response = await fetch(`${api}/note/`, {
      method: "put",
      body: JSON.stringify({ id: noteId, title, content }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    console.log(response);
    setEditmode(false);
  }

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const response = await fetch(`${api}/note/${noteId}`, {
        method: "delete",
      });
      console.log(response);
      navigate("/");
    }
  }

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  if (!editmode)
    return (
      <section className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="text-justify">{content}</div>
        <div className="flex gap-2">
          <button onClick={() => setEditmode(true)} className="btn btn-accent">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-warning">
            Delete
          </button>
        </div>
      </section>
    );

  if (editmode)
    return (
      <section className="flex flex-col justify-center items-center">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input text-2xl font-bold"
        />
        <textarea
          name=""
          id=""
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="textarea"
        ></textarea>
        <button onClick={handleNoteUpdate} className="btn btn-success">
          Done
        </button>
      </section>
    );
}
