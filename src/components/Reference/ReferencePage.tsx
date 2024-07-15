import references from '@/references/references.json'
import { ReferenceTable } from './ReferenceTable';
import { ReferenceExample } from './ReferenceExample';
import { ReferenceList } from './ReferenceList';
import { MDXHeading } from '../MDXComponents';
import { ReferenceThrows } from './ReferenceThrows';


export const ReferencePage = ({ platform, category, fn }) => {
    return (<>
        <MDXHeading level={2}>{references[platform][category][fn].title}</MDXHeading>

        {references[platform][category][fn].description}

        <MDXHeading level={3}>Options:</MDXHeading>

        <ReferenceTable
            options={references[platform][category][fn].options}
        />

        <ReferenceThrows errors={references[platform][category][fn].throws} />

        <MDXHeading level={3}>Returns:</MDXHeading>

        <ReferenceList
            items={
                references[platform][category][fn].returns.values
            }
        />

        <ReferenceExample
            text={
                references[platform][category][fn].returns.example
            }
        />

        <MDXHeading level={3}>Example:</MDXHeading>

        <ReferenceExample
            text={references[platform][category][fn].example}
        />
    </>)
}