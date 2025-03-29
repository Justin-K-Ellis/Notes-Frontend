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
    <section className="w-1/6 h-full m-4 p-2 border border-base-300 rounded">
      <ul className="list">
        {data.map((title: Title) => (
          <li
            key={title.id}
            className="border border-base rounded-xs mb-1 hover:bg-base-300 p-1"
          >
            <Link to={title.id.toString()}>{title.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
