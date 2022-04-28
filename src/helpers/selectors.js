
//gets the appointments for the day
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

///gets the interviewers for the day
export function getInterviewersForDay(state, dayName) {
  const appointments = [];


  const dayObject = state.days.find((day) => {
    if (day.name === dayName) {
      return true;
    } else {
      return false;
    }
  });

  if (dayObject) {
    return dayObject.interviewers.map((interviewer) => {
      return state.interviewers[interviewer];
    });
  } else {
    return [];
  }
};

export function getInterview(state, interview) {
  if (interview) {
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] };
  } else {
    return null;
  }
};