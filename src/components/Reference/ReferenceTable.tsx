import { Type } from "./TypeLink";
import { useContext } from 'react';
import { TypeContext } from "./ReferencePages";

export const ReferenceTable = ({ options }) => {
  const { modalOpen } = useContext(TypeContext);
  return (
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>Required</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => {
          return (
            <tr key={option.option}>
              <td>
                <code>{option.name}</code>
              </td>
              <td>{option.optional ? 'false' : 'true'}</td>
              <td onClick={modalOpen}><Type typeData={option.value} /></td>
              <td>{option.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
