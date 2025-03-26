import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Title } from "../interfaces";

export default function Sidebar() {
  const api = import.meta.env.VITE_API;
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["noteTitles"],
    queryFn: async () => {
      const response = await fetch(`${api}/titles`);
      const data = await response.json();
      return data;
    },
  });

  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <section className="sidebar">
      <h2>Notes</h2>
      <ul>
        {data.map((title: Title) => (
          <li key={title.id}>
            <Link to={title.id.toString()}>{title.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
