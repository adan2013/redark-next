import { ActionButton } from "./ActionButton";
import { LayoutContainer } from "./LayoutContainer";
import { LayoutColumn } from "./LayoutColumn";

interface AssemblingPcFooterProps {
  nextPost: string;
}

export function AssemblingPcFooter({ nextPost }: AssemblingPcFooterProps) {
  return (
    <LayoutContainer>
      <LayoutColumn>
        <ActionButton to="/skladanie-pc">Spis treści poradnika</ActionButton>
      </LayoutColumn>
      {nextPost !== "" && (
        <LayoutColumn>
          <ActionButton to={nextPost}>Następny artykuł</ActionButton>
        </LayoutColumn>
      )}
    </LayoutContainer>
  );
}
