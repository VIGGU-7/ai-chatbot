import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({resCode}) {
  const code = `${resCode}`;
    console.log(code)
  return (
    <SyntaxHighlighter language="html" style={vscDarkPlus}>
      {code}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;