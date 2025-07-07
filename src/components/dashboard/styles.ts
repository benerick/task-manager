import styled from "styled-components";

// --- Board y columnas ---

export const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 32px;
  background-color: #f0f2f5;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const ColumnContainer = styled.div`
  flex: 1;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #222;
`;

// Lista de tareas vertical con separación
export const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
`;

// --- Tarjeta de tarea ---

export const CardContainer = styled.div`
  background-color: #e9f5ff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 0.12);
  padding: 16px 20px;
  cursor: grab;
  user-select: none;
  position: relative;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 6px 14px rgb(0 0 0 / 0.18);
  }
`;

export const DraggableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #111;
  line-height: 1.2;
`;

export const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  white-space: pre-wrap;
`;

// Botones superpuestos en la esquina superior derecha

const buttonSharedStyles = `
  position: absolute;
  top: 12px;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  transition: background-color 0.2s ease;
  z-index: 10;
  pointer-events: auto;
`;

export const RemoveCardButton = styled.button`
  ${buttonSharedStyles}
  right: 12px;
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

export const EditCardButton = styled.button`
  ${buttonSharedStyles}
  right: 44px;
  background-color: #2980b9;

  &:hover {
    background-color: #1c5980;
  }
`;

export const FavoriteButton = styled.button`
  ${buttonSharedStyles}
  right: 76px;
  background-color: transparent;
  color: #f1c40f;
  font-size: 1.2rem;

  &:hover {
    color: #d4ac0d;
  }
`;

// --- Formularios ---

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  background: #fafafa;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.06);
  position: relative;
`;

export const Input = styled.input`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4dc1ea;
    outline: none;
    box-shadow: 0 0 5px #4dc1eaaa;
  }
`;

export const Select = styled.select`
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1.5px solid #ccc;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4dc1ea;
    outline: none;
    box-shadow: 0 0 5px #4dc1eaaa;
  }
`;

export const Button = styled.button`
  padding: 0.7rem 1.2rem;
  font-weight: 700;
  background: #4dc1ea;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.25s ease;

  &:hover {
    background: #3aaed2;
  }

  &:focus-visible {
    outline: 2px solid #257cae;
    outline-offset: 2px;
  }
`;

export const CloseButton = styled.button`
    ${buttonSharedStyles}
    right: 10px;
    top: 10px;
    background: transparent;
    color: #000;
    font-size: 24px;
}
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: -0.5rem;
`;

// --- Modal ---

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  padding: 2rem 2.5rem;
  border-radius: 16px;
  width: 420px;
  max-width: 90vw;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  h2 {
    margin-top: 0;
    font-weight: 700;
    color: #222;
  }

  input,
  textarea {
    width: 100%;
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border-radius: 10px;
    border: 1.5px solid #ccc;
    resize: vertical;
    transition: border-color 0.2s ease;

    &:focus {
      border-color: #4dc1ea;
      outline: none;
      box-shadow: 0 0 6px #4dc1eaaa;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  margin-top: 1.5rem;
`;

// --- Filter Container ---

export const FilterContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  margin-right: 1em;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
