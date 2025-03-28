import { useState } from "react";

export default function NewNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const api = import.meta.env.VITE_API;

  async function handleSubmit(event) {
    event.preventDefault();
    const postData = { title, content };
    const response = await fetch(`${api}/note`, {
      method: "post",
      body: JSON.stringify(postData),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    console.log(response);
  }

  return (
    <section>
      <h2>Create a new note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>
        <button>Post</button>
      </form>
    </section>
  );
}
