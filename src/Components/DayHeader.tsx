import { monthNames, weekDays } from "../scripts/montsAndDaysEnum";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const StyledHeaderDay = styled.p`
  font-weight: 500;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
`;
const StyledHeaderDayOfWeek = styled(StyledHeaderDay)`
  color: rgba(255, 255, 255, 0.6);
`;

interface IDayHeader {
  date: Date | "other";
}

const DayHeader = ({ date }: IDayHeader) => {
  return (
    <StyledHeader>
      {date !== "other" ? (
        <>
          <StyledHeaderDay>
            {monthNames[date.getMonth()]} {date.getDate()}
          </StyledHeaderDay>

          <StyledHeaderDayOfWeek>
            {weekDays[date.getDay()]}
          </StyledHeaderDayOfWeek>
        </>
      ) : (
        <StyledHeaderDay>Другие задачи</StyledHeaderDay>
      )}
    </StyledHeader>
  );
};

export default DayHeader;
