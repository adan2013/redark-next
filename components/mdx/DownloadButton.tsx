import { ActionButton } from "./ActionButton";

interface DownloadButtonProps {
  file: string;
  text?: string;
}

export function DownloadButton({ file, text }: DownloadButtonProps) {
  return (
    <ActionButton to={`/${file}`} download>
      {text && text !== "" ? text : "Pobierz plik"}
    </ActionButton>
  );
}
