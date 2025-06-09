import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isEmail } from "validator";
import { getDatasEntre, calculateTotalValue } from "../../utils/rentalCalculation";
import axios from "../../services/axios";

import { GlobalStyle } from "./styled";
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
  DatesContainer,
  CalendarContainer,
} from "./styled";

export default function ReservaPage() {
  // Intervalo de datas selecionado
  const [dateRange, setDateRange] = useState([null, null]);
  const [diasIndisponiveis, setDiasIndisponiveis] = useState([]);

  // Mensagem de sucesso
  const [mensagem, setMensagem] = useState("");

  // Formulário
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    guests: "",
  });

  // Buscar dias indisponíveis no back-end
  const fetchDiasIndisponiveis= async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/reservation/`
        );
        const datasConvertidas = data.flatMap((reserva) => getDatesInRange(new Date(reserva.start_date), new Date(reserva.end_date)))
        
        setDiasIndisponiveis(datasConvertidas);
      } catch (err) {
        console.error("Erro ao buscar dias indisponíveis:", err);
      }
    }

  useEffect(() => {
  fetchDiasIndisponiveis();
}, []);


  // Verifica se uma única data está indisponível
  const isDateUnavailable = (date) =>
    diasIndisponiveis.some(
      (d) =>
        d.getFullYear() === date.getFullYear() &&
        d.getMonth() === date.getMonth() &&
        d.getDate() === date.getDate()
    );

  // Desabilita dias no calendário
  const tileDisabled = ({ date }) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return date < yesterday || isDateUnavailable(date);
  };

  // Adiciona classe "unavailable-day" para datas bloqueadas
  const tileClassName = ({ date }) =>
    isDateUnavailable(date) ? "unavailable-day" : null;

  // Atualiza intervalo selecionado
  const handleCalendarChange = (value) => {
    const [start, end] = value;

    if (start && end) {
      const selecionadoIntervalo = getDatesInRange(start, end);
      const invalido = selecionadoIntervalo.some(isDateUnavailable);

      if (invalido) {
        alert("Data inválida ou indisponível no intervalo selecionado.");
        return;
      }
    }

    setDateRange(value);
  };

  // Retorna array com todas as datas entre start e end (inclusive)
  const getDatesInRange = (startDate, endDate) => {
    if (!startDate || !endDate) return [];
    const dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Atualiza formulário
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envia reserva
   const handleSubmit = async (e) => {
    e.preventDefault();

    const [startDate, endDate] = dateRange;

    if (!startDate || !endDate) {
      alert("Por favor, selecione o intervalo de datas.");
      return;
    }

    if (form.nome.trim().length < 3) {
      alert("Nome deve ter pelo menos 3 caracteres");
      return;
    }

    if (!isEmail(form.email)) {
      alert("Email inválido");
      return;
    }
    const guests = parseInt(form.guests)
    if(isNaN(guests) || guests > 50){
        alert("Numero máximo de pessoas excedido")
        return
    }

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/reservation`,{
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            guests: guests,
            total_price: totalValueDays

        })

    }catch(err){
        console.error("Erro ao confirmar reserva", err)
    }

    setMensagem("Reserva enviada com sucesso!");
    await fetchDiasIndisponiveis()

    // Limpa formulário e datas
    setForm({ nome: "", email: "", telefone: "", guests:"" });
    setDateRange([null, null]);

    const url = `https://wa.me/5517997366850?text=Olá%2C%20Sou%20${encodeURIComponent(form.nome)}%20e%20estou%20alugando%20a%20edicula%20da%20data%20${startDate.toLocaleDateString()}
    %20até%20${endDate.toLocaleDateString()}`;
    window.open(url, "_blank")
  };

  // Limpa intervalo de datas
  const clearDates = () => setDateRange([null, null]);

  // Cálculo de valor total
  const [start, end] = dateRange;
  const allDates = start && end ? getDatasEntre(start, end) : [];
  const datasISO = allDates.map((d) => d.toISOString().split("T")[0]);
  const totalValueDays = calculateTotalValue(datasISO);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Agendar Reserva</Title>

        <CalendarWrapper>
          <h3>Escolha o intervalo de datas</h3>

          <CalendarContainer>
            <Calendar
              selectRange
              onChange={handleCalendarChange}
              value={dateRange}
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
            />

            <DatesContainer>
              <DateDisplay>
                <strong>Data inicial:</strong> {start ? start.toLocaleDateString() : "-"}
              </DateDisplay>
              <DateDisplay>
                <strong>Data final:</strong> {end ? end.toLocaleDateString() : "-"}
              </DateDisplay>
              <DateDisplay>
                <strong>Valor total: {totalValueDays}</strong>
              </DateDisplay>
              <DateDisplay>
                <button onClick={clearDates}>Limpar datas</button>
              </DateDisplay>
            </DatesContainer>
          </CalendarContainer>
        </CalendarWrapper>

        <Form onSubmit={handleSubmit}>
          <Label>
            Nome:
            <Input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label>
            Email:
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              required
            />
          </Label>

          <Label>
            Telefone:
            <Input
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={handleFormChange}
              required
            />
          </Label>
          <Label>
            Numero de pessoas:
            <Input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleFormChange}
              required
            />
          </Label>

          <Button href="#" onClick={handleSubmit}>
            Confirmar Reserva
          </Button>
        </Form>

        {mensagem && <Message>{mensagem}</Message>}
      </Container>
    </>
  );
}