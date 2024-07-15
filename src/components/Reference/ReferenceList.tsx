export const ReferenceList = ({ items }) => {
  return (
    <ul>
      {items.map((item, i) => {
        return <li key={i}>{item.description}</li>
      })}
    </ul>
  );
};
