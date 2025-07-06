import styled from "styled-components";

export const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 24px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const ColumnContainer = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const ColumnTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 12px;
  color: #333;
`;

export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardContainer = styled.div`
  padding: 12px;
  background-color: #e6f7ff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  cursor: grab;
  user-select: none;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
  color: #333;
`;

export const CardDescription = styled.p`
    font-size: 14px;
    color: #000;
`;
