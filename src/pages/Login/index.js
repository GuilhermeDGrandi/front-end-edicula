import { useEffect, useState, } from "react";
import isEmail from "validator/lib/isEmail.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; 

import { loginRequest } from "../../store/modules/auth/actions.js";
import{Container, Form, Input, Button, Title, ErrorMessage} from './styled.js'

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mode, setMode] = useState("login"); // "login" ou "signup"

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, error, token } = useSelector((state) => state.auth);

    
    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token, navigate])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        //validações
        if(!isEmail(email)){
            alert("email inválido")
            return
        }
        if(password.length<6){
            alert("Senha precisa ter 6 caracteres")
            return
        }
        dispatch(loginRequest(email, password))
    }

    

    return(

        <Container>
            <Form onSubmit={handleSubmit} >
                <Title>{mode === 'login' ? 'Login' : 'Criar Conta'}</Title>
                <Input type="text"
                placeholder="Usuário"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
                <Input type="password"
                placeholder="Senha"
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}
                />
                {error && <ErrorMessage>{typeof error === 'string' ? error : error.message || JSON.stringify(error)}</ErrorMessage>}
                <Button type="submit" disabled={loading}> 
                    {loading ? "Entrando..." : "Entrar"}
                </Button>
                
                
                

            </Form>


        </Container>

    )



}














