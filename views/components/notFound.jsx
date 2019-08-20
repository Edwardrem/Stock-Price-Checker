import React from 'react';
import AppTitle from './common/appTitle.jsx';

const NotFound = () => {
  return (
    <React.Fragment>
      <AppTitle title={<h1>Anonymous Message Board</h1>} />
      <div className="not-found" style={{textAlign: 'center'}}>
        <h2>Page not Found</h2>
      </div>      
    </React.Fragment>
  );
}

export default NotFound;