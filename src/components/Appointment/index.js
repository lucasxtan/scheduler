import "components/Appointment/styles.scss";
import React, { Fragment } from 'react';
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


const Appointment = (props) => {
  // return "hi"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      {/* {props.time && <p>Appointment at {props.time}</p>}
      {!props.time && <p>No appointments</p>} */}
      {/* {props.time ? <Header/>} */}
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => {
        //transition to CREATE
        transition(CREATE)
        }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} />}


    </article>
  );
};


export default Appointment;