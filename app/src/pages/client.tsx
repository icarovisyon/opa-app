import { ButtonHTMLAttributes, useEffect, useState } from "react"
import styled from "styled-components"
import { SheachTagClient } from "../components/sheachTagClient"
import { SideBar } from "../components/sideBar"


export function Client() {
    const [modal, setModal] = useState<boolean>(false)
    const [dispaySheach, setDispaySheach] = useState<string>('block')

    useEffect(() => {
        setDispaySheach((state) => modal ? 'none' : 'block')
    }, [modal]);

    return (
        <Main>
            <SideBar selected="Cliente" />
            <Content>
                {modal == true && <Button onClick={() => setModal(!modal)} >Fechar</Button>}
                {modal == true && <SheachTagClient />}
                <Button style={{ display: dispaySheach }} onClick={() => setModal(!modal)}>
                    Pesquisar pela Tag
                </Button>
            </Content>
        </Main>
    )
}

const Main = styled.div`
`
const Content = styled.div`
    margin: 0 50px 0 310px;
    padding: 35px 30px 0 30px;
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
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
`

