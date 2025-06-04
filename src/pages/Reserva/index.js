import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {isEmail} from 'validator'
import { getDatasEntre, calculateTotalValue } from "../../utils/rentalCalculation";

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
    CalendarContainer
    
} from './styled';

export default function ReservaPage() {
    // Datas indisponíveis
    const diasIndisponiveis = [
        new Date(2025, 4, 27), // 27 de maio
        new Date(2025, 4, 28), // 28 de maio
        new Date(2025, 5, 1),  // 1º de junho
    ];

    // Estado do intervalo de datas selecionado
    const [dateRange, setDateRange] = useState([undefined, undefined]);
    const [startDate, endDate] = dateRange;

    // Estado da mensagem de sucesso
    const [mensagem, setMensagem] = useState("");

    // Estado do formulário
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
    });

    // Função para checar se a data está indisponível
    const isDateUnavailable = (date) => {
        return diasIndisponiveis.some(
            (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
        );
    };

    // Função que desabilita os dias indisponíveis no calendário
    const tileDisabled = ({ date }) => {
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        if (date < yesterday) return true
        if (isDateUnavailable(date)) return true

        return false
    }

    // Aplica classe CSS para destacar dias indisponíveis (classe precisa estar no styled global)
    const tileClassName = ({ date }) => {
        if (isDateUnavailable(date)) return "unavailable-day";
        return null;
    };

    // Função que recebe o intervalo selecionado no calendário
    const handleCalendarChange = (value) => {
        const [start, end] = value;

        // Se já selecionou as duas datas, verifica se o intervalo é válido
        if (start && end) {
            // Gera todas as datas entre start e end
            const selecionadoIntervalo = getDatesInRange(start, end);

            // Verifica se algum dia do intervalo está indisponível
            const invalido = selecionadoIntervalo.some((date) =>
                isDateUnavailable(date)
            );

            if (invalido) {
                alert("Data inválida ou indisponível no intervalo selecionado.");
                return;
            }
        }

        setDateRange(value);
    };

    // Gera array com todas as datas entre startDate e endDate (inclusive)
    function getDatesInRange(startDate, endDate) {
        const dates = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    // Atualiza estado do formulário quando usuário digita
    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Ao enviar o formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica se as datas foram selecionadas
        if (!startDate || !endDate) {
            alert("Por favor, selecione o intervalo de datas.");
            return;
        }
        if(form.nome > 2){
            alert("Nome deve ter pelo menos 3 caracteres")
            return
        }
        if(!isEmail(form.email)){
            alert("Email inválido")
            return
        }        

        setMensagem("Reserva enviada com sucesso!");

        console.log({
            ...form,
            data_inicio: startDate,
            data_fim: endDate,
        });

        setForm({ nome: "", email: "", telefone: "" });
        setDateRange([undefined, undefined]);
    };

    const clearDates = () =>{
        setDateRange([undefined, undefined])
    }

    const allDates = getDatasEntre(startDate, endDate) 
    const datasISO = allDates.map(date => date.toISOString().split('T')[0]);
    const totalValueDays = calculateTotalValue(datasISO)
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
                            <strong>Data inicial:</strong>{" "}
                            {dateRange[0] ? dateRange[0].toLocaleDateString() : "-"}
                        </DateDisplay>

                        <DateDisplay>
                            <strong>Data final:</strong>{" "}
                            {dateRange[1] ? dateRange[1].toLocaleDateString() : "-"}
                        </DateDisplay>
                        <DateDisplay>
                            <strong>Valor total:{totalValueDays}</strong> 
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
                        <Input type="text" name="nome" value={form.nome} onChange={handleFormChange} required />
                    </Label>

                    <Label>
                        Email:
                        <Input type="email" name="email" value={form.email} onChange={handleFormChange} required />
                    </Label>

                    <Label>
                        Telefone:
                        <Input type="tel" name="telefone" value={form.telefone} onChange={handleFormChange} required />
                    </Label>

                    <Button href={`https://wa.me/5517997366850?text=Olá%2C%20Sou%20${form.nome}
                    %20e%20estou%20alugando%20a%20edicula%20da%20data%20${startDate}%20até%20${endDate}`} 
                    type="submit">Confirmar Reserva</Button>
                </Form>

                {mensagem && <Message>{mensagem}</Message>}
            </Container>
        </>
    );
}
