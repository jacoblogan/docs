import { MDXCode } from '../MDXComponents';

export const ReferenceExample = ({ text, language = 'javascript' }) => {
  if (!text?.trim()) {
    return null;
  }
  return <MDXCode codeString={text} language={language} />;
};
