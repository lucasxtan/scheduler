import "components/Appointment/styles.scss";
import React, { Fragment } from 'react'
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import useVisualMode from "hooks/useVisualMode";



const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  
  return (
    <article className="appointment">
      {/* {props.time && <p>Appointment at {props.time}</p>}
      {!props.time && <p>No appointments</p>} */}
      {/* {props.time ? <Header/>} */}
      <Header time={props.time}/>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty/>}
      
    </article>
  )
};


export default Appointment;