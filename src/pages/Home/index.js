import {React, useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PhotosCarousel from '../../components/PhotosCarousel';
import axios from '../../services/axios.js'



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
  

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [max_Guest, setMax_Guest] = useState('')

  useEffect(() => {
  async function getData() {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/house/3`);
      console.log(data)
      setTitle(data.title)
      setDescription(data.description)
      setAddress(data.address)
      setMax_Guest(data.max_guests) 
      
    } catch (e) {
      console.log(e.message); 
    }
  }

  getData();
}, []);




  return (
    <Container>
      <Title>{title}</Title>
      <PhotosCarousel/>

      <DescriptionArea>
        <Description>
          <p>{description}</p>
          <p>Endereço: {address}</p>
          <p>Capacidade máxima:{max_Guest}</p>
        </Description>        
      </DescriptionArea>
      <PageBottom>
        <CalendarButton to={"/reserva"} >
          <button className="button"><span className="text">Calendário</span></button>
        </CalendarButton>
        
        <ContactButton href="https://wa.me/5517997366850?text=Olá%2C%20tenho%20interesse%20na%20edícula" target="_blank">
          Contate-nos
        </ContactButton>      
        
      </PageBottom>
      

      
    </Container>
  );
}
