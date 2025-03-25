function DefaultPage({ title, text }: { title: string; text: string }) {
  return (
    <section className="default-section">
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

export default DefaultPage;
