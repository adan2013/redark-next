interface YouTubeProps {
  id: string;
  title: string;
}

export function YouTube({ id, title }: YouTubeProps) {
  const url = `https://www.youtube.com/embed/${id}?rel=0`;
  return (
    <iframe
      src={url}
      title={title}
      width="560"
      height="315"
      frameBorder="0"
      style={{ maxWidth: "90%", display: "block", margin: "8px auto" }}
      allowFullScreen
    />
  );
}
