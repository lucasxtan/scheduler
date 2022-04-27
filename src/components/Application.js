// import React from "react";
// import Button from "components/Button";
// import DayListItem from "components/DayListItem.js";
import DayList from "components/DayList.js";
import "components/Application.scss";
import React from "react";
import Appointment from "components/Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
  console.log('schedule', schedule);

  // const setDays = (days) => {
  //   setState(prev=>({ ...prev, days })) //prev gives most up to date state
  // }

  // const setDays = (days) => {
  //   setState({ ...state, days })
  // }
  // const setDay = day => setState({ ...state, day });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {schedule}
        <Appointment time={"5pm"} />
      </section>
    </main>
  );
}
