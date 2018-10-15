import React from 'react';

function Diagnostic(props) {
  const diags = props.diags;
  const listItems = diags.map((diag) =>
    <li>{diag}</li>
  );
  return (
    <div className="query-diags">
    <h2>Query diagnostics</h2>
    <ul>{listItems}</ul>
    </div>
  );
}

export default Diagnostic;
