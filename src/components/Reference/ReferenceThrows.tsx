import { MDXHeading } from '../MDXComponents';

export const ReferenceThrows = ({ errors }) => {
    if (!errors || !errors.length) return;

    const generateErrorString = (error) => {
        return <> {error.type}: <code>{error.errorName}</code> - {error.message} </>
    }

    return <>
        <MDXHeading level={3}>Throws:</MDXHeading>

        <ul>
            {errors.map((error, i) => <li key={i}> {generateErrorString(error)} </li>)}
        </ul>
    </>
}
