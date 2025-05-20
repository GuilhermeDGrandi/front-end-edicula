import React,{useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import { 
    Container,
    Title,
    CalendarWrapper,
    DateDisplay,
    Form,
    Label,
    Input,
    Button,
    Message,



} from './styled'

export default function ReservaPage(){

    const [date, setDate]=useState(new Date())
    const [form, setForm]=useState({
        nome:"",
        email:"",
        telefone:"",

    })
    const [mensagem, setMensagem] = useState("")

const handleSubmit = (e) =>{
    e.preventDefault()
    setMensagem("Reserva enviada com sucesso")
    console.log({...form, data:date})
    setForm({nome:"", email:"", telefone:""})
}
const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


    return(
<Container>
<Title>Agendar Reserva</Title>

<CalendarWrapper>
        <h3>Escolha uma data</h3>
        <Calendar onChange={setDate} value={date}></Calendar>
        <DateDisplay>
            <strong>Data selecionada:</strong>{date.toLocaleDateString()}
        </DateDisplay>
</CalendarWrapper>

<Form onSubmit={handleSubmit} >

<Label>
    Nome:
    <Input type="text" name="nome" value={form.nome} onChange={handleChange} required ></Input>
</Label>

<Label>
    Email:
    <Input type="text" name="email" value={form.email} onChange={handleChange} required ></Input>
</Label>

<Label>
    Telefone:
    <Input type="tel" name="telefone" value={form.telefone} onChange={handleChange} required ></Input>
</Label>

<Button type="submit" >Confirmar Reserva</Button>
</Form>

{mensagem && <Message>{mensagem}</Message>}

</Container>
)
}



