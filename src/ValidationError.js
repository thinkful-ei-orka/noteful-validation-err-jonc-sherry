import React from 'react';

export default function ValidationError(props) {
  if(props.message) {
    return(
    <span className="error">{props.message}</span>
    );
  }  
  return <></>
} 