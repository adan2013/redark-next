interface VideoViewerProps {
  file: string;
}

export function VideoViewer({ file }: VideoViewerProps) {
  const videoUrl = `/${file}`;

  return (
    <div className="max-w-[min(90%,450px)] block my-3 mx-auto">
      <video controls className="w-full">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
