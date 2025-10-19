interface VideoViewerProps {
  file: string;
}

export function VideoViewer({ file }: VideoViewerProps) {
  // If path already starts with /, use it as is (processed path)
  // Otherwise, prepend / for backward compatibility
  const videoUrl = file.startsWith("/") ? file : `/${file}`;

  return (
    <div className="max-w-[min(90%,450px)] block my-3 mx-auto">
      <video controls className="w-full">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
