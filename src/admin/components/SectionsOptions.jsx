function SectionsOptions(props) {
  const { sectionName, Sid } = props;

  return (
    <option className="adminOption" value={Sid}>
      {sectionName}
    </option>
  );
}

export default SectionsOptions;
