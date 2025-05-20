import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 24px;
`;



export const DescriptionArea = styled.div`

  
  border: 1px solid rgb(139, 139, 139);
  margin-top:50px;
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-bottom: 32px;
  width: 100%;
  box-sizing: border-box;
  margin-left:auto;
  margin-right:auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Description = styled.div`
  word-break: break-word;
  width: 100%;
  box-sizing: border-box;
  margin:10px;
  flex: 2;
  font-size: 1.1rem;
  line-height: 1.6;
`;

export const CalendarButton = styled.div`

    .button {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

    .button:active,
.button:hover {
  outline: 0;
}

    .button span {
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

    .button:hover span {
  background: none;
}

    @media (min-width: 768px) {
  .button {
    font-size: 24px;
    min-width: 196px;
  }
}
`;

export const ContactSection = styled.div`
  text-align: center;
  margin-top: 32px;
`;

export const ContactButton = styled.a`
  background: #25d366;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s;
  
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;

  &:hover {
    background: #1ebe5d;
  }
`;

export const PageBottom = styled.div`
    display:flex;
    justify-content:space-between;
    max-width:900px;
    margin-left:auto;
    margin-right:auto;
`

