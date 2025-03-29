import { SyntheticEvent, useState } from "react";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const api = import.meta.env.VITE_API;

  async function handleSubmit(event: SyntheticEvent) {
    // event.preventDefault();
    const postData = { title, content };
    const response = await fetch(`${api}/note`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
  }

  return (
    <section className="flex flex-col justify-center w-7/10 items-center gap-2">
      <h2 className="text-2xl font-bold">New Note</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-9/10 items-center"
      >
        <input
          type="text"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input self-start"
          placeholder="Title"
        />

        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="textarea w-full"
        ></textarea>

        <button className="btn btn-success">Post</button>
      </form>
    </section>
  );
}
