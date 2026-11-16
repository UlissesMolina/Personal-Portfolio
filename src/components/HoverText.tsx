import type React from 'react';

// Splits text into per-letter spans so each one can react to hover on its own.
// The transition back is slower than the transition in, so sweeping the cursor
// across the word leaves a short trail. Screen readers get the plain text.
export default function HoverText({ text }: { text: string }) {
  return (
    <span className="hover-text" aria-label={text}>
      {[...text].map((ch, i) =>
        ch === ' '
          ? <span key={i} aria-hidden="true"> </span>
          : <span key={i} className="ch" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">{ch}</span>
      )}
    </span>
  );
}
