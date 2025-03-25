import DefaultPage from "../components/DefaultPage";

export default function Home() {
  const pageTitle = "Home";
  const pageText = "This is a great app for taking notes.";

  return <DefaultPage title={pageTitle} text={pageText} />;
}
