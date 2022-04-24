// import React from "react";
// import Button from "components/Button";
// import DayListItem from "components/DayListItem.js";
import DayList from "components/DayList.js";
import "components/Application.scss";
import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index.js";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  // const [days, setDays] = useState([]);
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });
  console.log('schedule', schedule);

  // const setDays = (days) => {
  //   setState(prev=>({ ...prev, days })) //prev gives most up to date state
  // }
  const setDay = day => setState(prev=>({ ...prev, day }));

  // const setDays = (days) => {
  //   setState({ ...state, days })
  // }
  // const setDay = day => setState({ ...state, day });

  // useEffect(() => {
  //   const url = `/api/days`;
  //   axios.get(url).then(response => {
  //     console.log(response.data);
  //     setDays(response.data)
  //   });
  // }, []);

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all[0])
      // setDays(all[0].data)
      // console.log(all[2])
      setState(prev=> ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}))
    })  
  }, [])
  

 

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
      </section>
    </main>
  );
}
