import styled from "styled-components";

export const Container = styled.div`
max-width: 600px;
margin: 0 auto;
padding: 2rem;
`

export const Title = styled.h1`
text-align: center;
margin-bottom: 2rem;

`

export const CalendarWrapper = styled.div`
margin-bottom:2rem;
`

export const DateDisplay = styled.p`
margin-top:1rem;
`

export const Form = styled.form`
display:flex;
flex-direction:column;
gap: 1rem;
`
export const Label = styled.label`
display:flex;
flex-direction:column;
font-weight:bold;
`

export const Input = styled.input`
padding:0.5rem;
border: 1px solid #ccc;
border-radius: 4px;
`

export const Button = styled.button`
padding: 0.7rem;
background:purple;
color:white;
border: none;
border-radius:5px;
cursor: pointer;
 &:hover{
    background:#5e007e;
 }
`

export const Message = styled.p`
margin-top: 1rem;
  color: green;
  text-align: center;
  font-weight: bold;
`



