import React, {useState} from 'react';
import JSONPretty from 'react-json-pretty';

const Output = ({result}) => {
  
  return (
    <div id="output" className="output">
      
      <h3>The output (json response):</h3>
      <JSONPretty id="json-pretty" data={result}></JSONPretty>
      
    </div>
  )
}

export default Output;



