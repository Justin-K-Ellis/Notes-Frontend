function DefaultPage({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <div className="hero">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">{title}</h1>
            <p className="py-6">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DefaultPage;
