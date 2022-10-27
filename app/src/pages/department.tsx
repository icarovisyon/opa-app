import { useEffect, useState } from "react";
import styled from "styled-components";
import { AttendanceByReason } from "../components/attendanceByReason";
import { SideBar } from "../components/sideBar";

export function Departamento() {
    const [modal, setModal] = useState(false)
    const [displaySheachTagName, setDisplaySheachTagName] = useState('block')

    useEffect(() => {
        setDisplaySheachTagName((state) => modal ? 'none' : 'block')
    }, [modal])


    return (
        <Main>
            <SideBar selected="Departamento" />
            <Content>
                {modal && <Button onClick={() => setModal(!modal)}>Fechar</Button>}
                {modal && <AttendanceByReason />}
                <Button style={{ display: displaySheachTagName }} onClick={() => setModal(!modal)}>
                    Atedimentos por motivo
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
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
`