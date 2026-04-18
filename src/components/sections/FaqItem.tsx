interface FaqItemProps {
  question: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FaqItem({ question, children, defaultOpen }: FaqItemProps) {
  return (
    <details className="faq-item reveal" open={defaultOpen}>
      <summary>{question}</summary>
      <div className="faq-body">{children}</div>
    </details>
  );
}
