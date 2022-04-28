import React from "react";
import DayListItem from "components/DayListItem";
import "components/DayListItem.scss";


//the list of days
export default function DayList(props) {
  const days = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}