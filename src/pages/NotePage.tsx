import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../interfaces.ts";

export default function NotePage() {
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
  const note: Note = data;

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section>
      <h2>{note.title}</h2>
      <div>{note.content}</div>
    </section>
  );
}
