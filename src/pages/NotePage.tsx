import { useState, useEffect } from "react";
import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import { Note } from "../interfaces.ts";

export default function NotePage() {
  const [editmode, setEditmode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { noteId } = useParams();
  const api = import.meta.env.VITE_API;

  useEffect(() => {
    async function getNote(noteId: string | undefined) {
      try {
        const response = await fetch(`${api}/note/${noteId}`);
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setIsPending(false);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error.message);
      }
    }
    getNote(noteId);
  }, [noteId]);

  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["notes", noteId],
  //   queryFn: async () => {
  //     const response = await fetch(`${api}/note/${noteId}`);
  //     const data = await response.json();
  //     return data;
  //   },
  // });
  // const note: Note = data;
  // if (note) {
  //   setTitle(note.title);
  //   setContent(note.content);
  // }

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{errorMessage}</p>;

  if (editmode === false)
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
        <button onClick={() => setEditmode(false)}>Done</button>
      </section>
    );
}
