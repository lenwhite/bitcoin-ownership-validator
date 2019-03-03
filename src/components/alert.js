import React from 'react';


const AlertTemplate = ({ options, message, style, close }) => (

  <div className="card" style={{ ...style }}>
    <div className="row">
      <div className="col">
        {options.type === 'info' && <header className="text-dark">Info</header>}
        {options.type === 'error' && <header className="text-error">Error</header>}
        {options.type === 'success' && <header className="text-success">Success</header>}
      </div>
      <div className="col is-right">
        <img src="https://icongr.am/clarity/close.svg?size=16" onClick={close} />
      </div>
    </div>
    {message}
  </div>
)

export default AlertTemplate;
