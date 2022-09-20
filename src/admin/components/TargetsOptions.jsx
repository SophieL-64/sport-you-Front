function TargetsOptions(props) {
  const { targetName, Tid } = props;

  return (
    <option className="adminOption" value={Tid}>
      {targetName}
    </option>
  );
}

export default TargetsOptions;
