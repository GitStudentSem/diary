import styled from "styled-components/macro";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoTodaySharp } from "react-icons/io5";
import Register from "./Register";
import Versions from "./Versions";
import Attention from "./Attention";
import ThemeControls from "./ThemeControls";
import ViewControl from "./ViewControl";
import Login from "./Login";
import { screenSize } from "../../scripts/screens";

const StyledAccountPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
`;
const StyledMain = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 5px;
    height: calc(100% - 55px); // с вычетом высоты шапки
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
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
const StyledFormsWrapper = styled.div`
    position: relative;
    padding: 20px;
    overflow: hidden;
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    grid-column-end: 2;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const HelloBlock = styled.p`
    width: 100%;
    text-align: center;
`;
const StyledFormSelect = styled.div``;
const StyledFormSelectButton = styled.button`
    width: 49%;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
    transition: all 0.3s;
    border-radius: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
const StyledIsdev = styled.div`
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    position: absolute;
    text-align: center;
    left: 0;
    top: 0;
    width: ${(props) => (props.isDev ? "100%" : "0px")};
    height: ${(props) => (props.isDev ? "100%" : "0px")};
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(${(props) => (props.isDev ? "3px" : "0px")});
`;

const AccountPage = ({ setColorsTheme, colorsTheme }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(true);
    const [isLoginForm, setIsLoginForm] = useState(false);

    const handleResize = () => {
        if (window.innerWidth <= screenSize.desktop) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };
    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
    }, []);
    return (
        <StyledAccountPage>
            <StyledHeader>
                <StyledButton disabled>
                    <Link to='/'>
                        <IoTodaySharp
                            size={30}
                            fill='rgba(255, 255, 255, 0.8)'
                        />
                    </Link>
                </StyledButton>
            </StyledHeader>

            <StyledMain>
                <StyledFormsWrapper>
                    {isAuth ? (
                        <HelloBlock>привет, Семен</HelloBlock>
                    ) : (
                        <>
                            {isSmallScreen && isRegisterForm && <Register />}
                            {isSmallScreen && isLoginForm && <Login />}
                            <StyledFormSelectButton>
                                войти
                            </StyledFormSelectButton>
                            <StyledFormSelectButton>
                                зарегестрироваться
                            </StyledFormSelectButton>
                        </>
                    )}
                    <StyledIsdev isDev>
                        <p>Скоро появится</p>
                    </StyledIsdev>
                </StyledFormsWrapper>

                <ThemeControls
                    colorsTheme={colorsTheme}
                    setColorsTheme={setColorsTheme}
                />

                <Versions />

                <ViewControl />

                <Attention />
            </StyledMain>
        </StyledAccountPage>
    );
};
export default AccountPage;