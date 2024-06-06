import references from '@/references/references.json'
import { ReferencePage } from './ReferencePage';

export const ReferencePages = ({ platform, category }) => {
    const refObject = references[platform][category];
    const functions = Object.keys(refObject);
    return (
        <>
            {functions.map((fn) => <ReferencePage platform={platform} category={category} fn={fn} key={`${platform}-${category}`} />)}
        </>
    )
}