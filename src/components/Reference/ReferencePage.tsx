import references from '@/references/nestedReferences.json'
import { ReferenceTable } from './ReferenceTable';
import { ReferenceExample } from './ReferenceExample';
import { ReferenceList } from './ReferenceList';
import { MDXHeading } from '../MDXComponents';
import { ReferenceThrows } from './ReferenceThrows';


export const ReferencePage = ({ platform, category, fn }) => {
    return (<>
        <MDXHeading level={2}>{references[fn].name}</MDXHeading>

        {references[fn].description}

        <MDXHeading level={3}>Parameters:</MDXHeading>

        <ReferenceTable
            options={references[fn].parameters} // update here
        />

        <ReferenceThrows errors={references[fn].throws} />

        <MDXHeading level={3}>Returns:</MDXHeading>

        {references[fn].return.description}

        {/* <ReferenceList
            items={
                references[fn].return
            }
        /> */}
        <ReferenceExample
            example={
                references[fn].returnExample
            }
        />

        <MDXHeading level={3}>Example:</MDXHeading>

        <ReferenceExample
            example={references[fn].example}
        />
    </>)
}
