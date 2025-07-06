import styled from "styled-components";

// Tasks components
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

// Form components
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
  background: #f3f3f3;
  padding: 1rem;
  border-radius: 10px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 0.6rem;
  font-weight: bold;
  background: #4dc1ea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #3aaed2;
  }
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
`;