
 const PageHeader = ({primary, secondary, right}) => (
  <div className="page-header">
    <h3>
      {primary} <small>{secondary}</small>
    </h3>
    <div className="right actions">
      {right}
    </div>
  </div>
);

export default PageHeader;
