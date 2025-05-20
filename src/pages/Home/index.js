import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhotosCarousel from '../../components/PhotosCarousel';

import {
  Container,
  Title,
  Description,
  DescriptionArea,
  CalendarButton,
  ContactButton,
  PageBottom
} from "./styled";

export default function Home() {
  return (
    <Container>
      <Title>Edícula para Temporada</Title>
      <PhotosCarousel/>

      <DescriptionArea>
        <Description>
          <p>
            Linda edícula disponível para fins de semana, feriados e temporadas.
            Ambiente confortável, com churrasqueira, piscina e espaço para toda
            a família.
            sadsadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadadad
            asddddddddddddddddddddddddddddddddddddddddd
            asdddddddddddddddddddddddddddddddddddddd
          </p>
        </Description>

        
      </DescriptionArea>
      <PageBottom>
        <CalendarButton>
          <button class="button"><span class="text">Calendário</span></button>
        </CalendarButton>
        
        <ContactButton href="https://wa.me/5517997366850?text=Olá%2C%20tenho%20interesse%20na%20edícula" target="_blank">
          Contate-nos
        </ContactButton>
      
        
      </PageBottom>
      

      
    </Container>
  );
}
