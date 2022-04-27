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

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      // console.log(all[0])
      // setDays(all[0].data)
      // console.log(all[2])
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  useEffect(() => {
    updateSpots();
  }, [state.appointments])

  const setDay = day => setState(prev => ({ ...prev, day }));

  console.log('state.days', state.days);
  console.log('appointments', state.appointments);

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //state
    //appointments
    //appointment
    //interview

    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
      .then((res) => {
        console.log('res', res);
        setState({
          ...state,
          appointments,
          // spots: updateSpots(appointments)
        });
       
        // console.log(response.data);
        // setState(response.data)
      });

    
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //state
    //appointments
    //appointment
    //interview

    const url = `/api/appointments/${id}`;
    return axios.delete(url)
      .then(() => {
        setState({
          ...state,
          appointments,
          // spots:updateSpots(appointments)
        });
        // updateSpots();
        // spots:updateSpots(appointments)
        // console.log(response.data);
        // setState(response.data)
      });
  }

  function updateSpots() {
    let spots = 0;
    const appointmentsArray = getAppointmentsForDay(state, state.day);
    for (let appointment of appointmentsArray) {
      if (appointment.interview === null) {
        spots++;
      }
    }


    let days = [];
    console.log('spots', spots);
    for (let eachDay of state.days){
      if (eachDay.name === state.day){
        days.push({...eachDay, spots })
      } else {
        days.push(eachDay);
      }
    }
    console.log('days', days);
    // setState(...state, days);

    
    // let days = state.days.map((eachDay) => {
    //   if (eachDay.name === state.day){
    //     eachDay.spots = numSpots;
    //   }
    //   return eachDay
    // });

    // setState(...state, days);
    // let numSpots = 0;
    // const interviewsArray = Object.values(appointments);
    // for (let interview of interviewsArray){
    //   if (interview.interview === null){
    //     numSpots++
    //   }
    // }
    // console.log('numSpots', numSpots)
    // return numSpots;
    // setState({
    //   ...state,
    //   spots: numSpots
    // });  
  }

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;