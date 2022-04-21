
import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // const formatSpots = function {
  //   {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
  //   {props.spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
  // };

  const formatSpots = function () {
    if (props.spots===0){
      return "no spots remaining"
    } else if (props.spots===1){
      return "1 spot remaining"
    } else {
      return `${props.spots} spots remaining`
    }
  }

  console.log(dayClass);

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}
// "text--light"
export default DayListItem;