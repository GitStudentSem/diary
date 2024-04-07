import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import styled from "styled-components/macro";
import { getStorageTasksList } from "../scripts/storageWorker/tasks";
import { transformDateToString } from "../scripts/transformDateToString";
import { observer } from "mobx-react-lite";
import user from "../store/user";

const StyledDay = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  border-radius: 10px;
  padding: 1px;
  background-color: ${(props) =>
    props.isToday
      ? "rgba(255, 255, 255, 0.4)"
      : props.isDayOff
      ? "rgba(255, 255, 255, 0.3)"
      : "rgba(255, 255, 255, 0.2)"};
  backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
  &:last-child {
    grid-column-start: ${(props) => 8 - props.startColumn};
    grid-column-end: 8;
  }
`;
const StyledDate = styled.div`
  position: absolute;
  top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-shrink: 0;
  flex-grow: 1;
`;
const StyledCountTasks = styled.div`
  position: absolute;
  bottom: 11px;
  width: 100%;
`;
const IconWrapper = styled.div`
  position: relative;
  height: min-content;
  width: 100%;
`;
const arr1 = [{ name: "array 1", innerItems: [{ innerName: "inner name 1" }] }];
const arr2 = [...arr1];
arr2[0].innerItems[0].innerName = "changed name";
console.log(arr1);
const DayMonth = observer(
  ({ date, startColumn, setIsMonth, setDate, tasksfromDB }) => {
    const [countTasksOnDay, setCountTasksOnDay] = useState(0);

    useEffect(() => {
      console.log("user.isAuth", user.isAuth);
      if (user.isAuth) {
        const getTasksOnDay = () => {
          if (tasksfromDB.length) {
            const currentTasks = tasksfromDB.find((day) => {
              if (day.dateKey === "other") {
                return day.dateKey === date;
              }
              return (
                transformDateToString(day.dateKey) ===
                transformDateToString(date)
              );
            });
            console.log("currentTasks", currentTasks);
            if (currentTasks) {
              setCountTasksOnDay(currentTasks.tasks.length);
            }
          }
        };

        getTasksOnDay();
      } else {
        setCountTasksOnDay(getStorageTasksList(date).length);
      }
    }, [date, tasksfromDB]);

    return (
      <StyledDay
        startColumn={startColumn}
        onClick={() => {
          setIsMonth(false);
          setDate(date === "other" ? new Date() : date);
        }}
        isToday={
          transformDateToString(date) === transformDateToString(new Date())
        }
        isDayOff={
          date !== "other" && (date.getDay() === 0 || date.getDay() === 6)
        }
      >
        <IconWrapper>
          <FaRegCalendar size={30} />
          <StyledDate>{date !== "other" ? date.getDate() : "..."}</StyledDate>
        </IconWrapper>
        <IconWrapper>
          <MdOutlineWorkOutline size={35} />

          <StyledCountTasks>{countTasksOnDay}</StyledCountTasks>
        </IconWrapper>
      </StyledDay>
    );
  }
);

export default DayMonth;
