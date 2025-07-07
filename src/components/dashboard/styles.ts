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
  position: relative;
`;

export const DraggableContainer = styled.div`

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

export const RemoveCardButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background: red;
    pointer-events: auto;
    z-index: 10;
`;

export const EditCardButton = styled.button`
    position: absolute;
    top: 10px;
    right: 30px;
    width: 20px;
    height: 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background: red;
    pointer-events: auto;
    z-index: 10;
`;

export const FavoriteButton = styled.button`
    position: absolute;
    top: 10px;
    right: 50px;
    width: 20px;
    height: 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    pointer-events: auto;
    background: transparent;
    z-index: 10;
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


// Modal de edicion
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  h2 {
    margin-top: 0;
  }

  input, textarea {
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;