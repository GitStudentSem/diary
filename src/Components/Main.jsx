import React, { useState } from "react";
import styled from "styled-components/macro";
import MonthScreen from "./MonthScreen";
import Navbar from "./Navbar";
import WeekScreen from "./WeekScreen";
import { screenSize } from "../scripts/screens";
import axios from "../axios";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const StyledWrapper = styled.div`
  height: calc(100% - 55px); // 45px - это высота шапки margin + padding
  max-width: 1500px;
  width: 100%;
  @media (max-width: ${screenSize.tablet}px) {
    height: calc(100% - 85px);
  }
`;

const Main = observer(({ date, monthNames, setDate }) => {
  const [isMonth, setIsMonth] = useState(true);
  const [tasksfromDB, setTaksFromDB] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("/tasks");
    const selectedFields = [];
    data.forEach((day) => {
      const { calendarDate, tasks } = day;
      selectedFields.push({
        calendarDate:
          calendarDate !== "other" ? new Date(calendarDate) : "other",
        tasks,
      });
    });
    setTaksFromDB(selectedFields);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StyledWrapper>
      <Navbar
        monthNames={monthNames}
        date={date}
        setDate={setDate}
        setIsMonth={setIsMonth}
        isMonth={isMonth}
      />
      {isMonth ? (
        <MonthScreen
          date={date}
          setIsMonth={setIsMonth}
          setDate={setDate}
          tasksfromDB={tasksfromDB}
        />
      ) : (
        <WeekScreen
          date={date}
          setDate={setDate}
          monthNames={monthNames}
          tasksfromDB={tasksfromDB}
        />
      )}
    </StyledWrapper>
  );
});

export default Main;
