import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";



const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    spots: 0
  });

  //get data to update state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  //update day in the state
  const setDay = day => setState(prev => ({ ...prev, day }));

  //book interview and decrease an open spot
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`api/appointments/${id}`, { interview })
      .then(response => {
        const days = updateSpots(state, appointments);
        setState(state => ({ ...state, days, appointments }));
      });
  }

  //cancel an interview and increase an open spot
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`api/appointments/${id}`)
      .then(response => {
        const days = updateSpots(state, appointments);
        setState(state => ({ ...state, days, appointments }));
      });
  }

  //update the number of open spots for appointments in the days of the week
  const updateSpots = (state, appointments) => {
    let spots = 0;

    const dayOfWeek = state.days.find(dayOfWeek =>
      dayOfWeek.name === state.day);

      dayOfWeek.appointments.forEach(id => {
      const appointment = appointments[id];
      if (!appointment.interview)
        spots++;
    });

    const day = { ...dayOfWeek, spots };
    const days = state.days.map(dayOfWeek =>
      dayOfWeek.name === state.day ? day : dayOfWeek);
    return days;
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;