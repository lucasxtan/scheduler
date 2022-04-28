

export function getAppointmentsForDay(state, dayName) {
  const appointments = [];


  const dayObject = state.days.find((day) => {
    if (day.name === dayName) {
      return true;
    } else {
      return false;
    }
  });

  if (dayObject) {
    return dayObject.appointments.map((appointmentNumber) => {

      return state.appointments[appointmentNumber];
    });
  } else {
    return [];
  }
}

export function getInterviewersForDay(state, dayName) {
  const appointments = [];


  const dayObject = state.days.find((day) => {
    if (day.name === dayName) {
      return true;
    } else {
      return false;
    }
  });

  console.log('dayObject', dayObject);
  
  if (dayObject) {
    return dayObject.interviewers.map((interviewer) => {
      return state.interviewers[interviewer];
    });
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  // const getInterview = {}
  // console.log('interview', interview);
  // console.log('state', state);
  if (interview) {
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  } else {
    return null;
  }
  console.log('interview', interview);
  // const interviewerObject = state.
}