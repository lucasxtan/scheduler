// import React from "react";
import InterviewerList from "components/InterviewerList.js";
import Button from "components/Button";
import React, { useState } from 'react';
import { fireEvent } from "@testing-library/react";


const Form = (props) => {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = function (){
    setStudent("");
    setInterviewer(null);
  }

  const cancel = function() {
    reset()
    props.onCancel();
    console.log("cancel")
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
  
    props.onSave(student, interviewer.id);
  }

  console.log(student);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(e)=> {e.preventDefault();}}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={e => setStudent(e.target.value)}
            value={student}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => {cancel()}}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;