import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center;     /* Centraliza verticalmente */
  height: 60px;  
  gap: 8px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

`
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: inherit;  // para herdar cor do texto/ícone
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`;