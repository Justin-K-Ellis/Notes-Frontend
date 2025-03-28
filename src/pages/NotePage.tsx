import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../interfaces.ts";

export default function NotePage() {
  const [editmode, setEditmode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { noteId } = useParams();
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

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  if (!editmode)
    return (
      <section className="note-data">
        <h2>{title}</h2>
        <div>{content}</div>
        <button onClick={() => setEditmode(true)}>Edit</button>
      </section>
    );

  if (editmode)
    return (
      <section className="note-data">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          name=""
          id=""
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button onClick={handleNoteUpdate}>Done</button>
      </section>
    );
}
