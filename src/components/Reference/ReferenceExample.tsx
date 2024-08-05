import { MDXCode } from '../MDXComponents';
import { View } from '@aws-amplify/ui-react';

export const ReferenceExample = ({ example, language = 'javascript' }) => {
  if (!example) return;
  if (Array.isArray(example)) {
    return (<View>
      {example.map((exampleText, idx) => <MDXCode key={idx} codeString={exampleText.trim()} language={language} />)}
    </View>)
  } else {
    example = example.trim();
    return <MDXCode codeString={example} language={language} />;
  }
};
