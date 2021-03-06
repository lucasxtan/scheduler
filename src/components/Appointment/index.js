import "components/Appointment/styles.scss";
import React, { Fragment } from 'react';
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log('props console', props);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
 
    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }
  console.log('props.interview', props.interview);

  return (
    <article className="appointment">

      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => {
        transition(CREATE);
      }} />}
      {(mode === SHOW && props.interview) && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteInterview} message="Are you sure you want to delete?" />}
      {mode === EDIT && <Form student={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onCancel={back} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="you got a saving error" onClose={back}/>}
      {mode === ERROR_DELETE && <Error message="you got a deleting error" onClose={back}/>}



    </article>
  );
};

export default Appointment;