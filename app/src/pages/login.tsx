import { useState, KeyboardEvent } from "react"
import styled from "styled-components"
import { api } from "../hooks/useEffect"

export function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    function acess() {
        api.post('/auth/login', {
            login: user,
            password: password
        })
            .then(response => {
                if (response.data.token) {
                    window.sessionStorage.setItem("token", response.data.token);
                    window.location.replace('/dashboard');
                    return
                }
                return
            })
            .catch(error => { console.log(error) })
    }
    return (
        <Main>
            <Content>
                <Input type="text" placeholder="Login" onChange={e => setUser(e.target.value)} />
                <Input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
                <Button onClick={acess}>Acessar</Button>
            </Content>
        </Main>
    )
}

const Main = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #7a4ef4;
`


const Content = styled.div`
    width: 450px;
    height: 300px;
    background-color: #fffffff2;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0rem 1rem hsl(0deg 0% 0% / 20%);
`

const Input = styled.input`
    background: transparent;
    border: 0px;
    border-bottom: 1px solid #000;
    margin: 20px auto;
    width: 240px;
    padding: 0 5px 5px 5px;
    line-height: 24px;
    color: #000000dd;
    font-size: 17px;
    position: relative;
    &:focus {
        border-bottom: 1px solid #000;

    }
`

const Button = styled.button`
    background-color: #794ef4;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    display: inline;
    box-shadow: 0 0rem 1rem hsl(0deg 0% 0% / 20%);
    margin: 0 5px
`