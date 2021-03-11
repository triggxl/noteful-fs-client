import React from 'react';

export default function FormValidationErrors(props) {
  if(props.message)
  return (
    <div className="error">
      {props.message}     
    </div>
  )
  return <></>
}
