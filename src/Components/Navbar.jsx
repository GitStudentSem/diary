import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import NavigationFromDate from "./NavigatonFromDate";
import { FaUserAlt } from "react-icons/fa";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt } from "react-icons/tfi";
import { screenSize } from "../scripts/screens";

const StyledNavbar = styled.div`
  /* 
        Изменение высоты данного блока требует 
        изменения высоты StyledMain в /Components/Main.js 
    */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
  @media (max-width: ${screenSize.tablet}px) {
    flex-wrap: wrap;
  }
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  transition: all 0.3s;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isMonth ? "rgba(255, 255, 255, 0.2)" : "transparent"};
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const StyledVisibleTypeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;
const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  justify-content: space-between;
  @media (max-width: ${screenSize.tablet}px) {
    order: 3;
    width: 100%;
  }
`;

const Navbar = ({ monthNames, date, setDate, setIsMonth, isMonth }) => {
  return (
    <StyledNavbar>
      <NavigationFromDate
        setPrevDate={() => {
          setDate(
            new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
          );
        }}
        setNextDate={() => {
          setDate(
            new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
          );
        }}
      >
        <p style={{ color: "rgba(255, 255, 255, 0.85)" }}>
          {monthNames[date.getMonth()]}
        </p>
      </NavigationFromDate>

      <StyledButtons>
        <StyledButton
          onClick={() => {
            setDate(new Date());
          }}
          title='Перейти к сегодняшнему дню'
        >
          СЕГОДНЯ
        </StyledButton>

        <StyledButton disabled title='Аккаунт'>
          <Link to='/account'>
            <FaUserAlt size={30} fill='rgba(255, 255, 255, 0.8)' />
          </Link>
        </StyledButton>

        <StyledVisibleTypeWrapper>
          <StyledButton
            onClick={() => {
              setIsMonth(false);
            }}
            title='Отображать дни'
            isMonth={!isMonth}
          >
            <TfiLayoutGrid2Alt size={25} />
          </StyledButton>
          <StyledButton
            onClick={() => {
              setIsMonth(true);
            }}
            title='Отображать месяца'
            isMonth={isMonth}
          >
            <TfiLayoutGrid3Alt size={25} />
          </StyledButton>
        </StyledVisibleTypeWrapper>
      </StyledButtons>

      <NavigationFromDate
        setPrevDate={() => {
          setDate(
            new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())
          );
        }}
        setNextDate={() => {
          setDate(
            new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())
          );
        }}
      >
        <p>{date.getFullYear()}</p>
      </NavigationFromDate>
    </StyledNavbar>
  );
};
export default Navbar;
