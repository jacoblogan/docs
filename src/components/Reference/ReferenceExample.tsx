import { MDXCode } from '../MDXComponents';

export const ReferenceExample = ({ text, language = 'javascript' }) => {
  return <MDXCode codeString={text} language={language} />;
};
