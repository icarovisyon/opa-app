import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import styled from "styled-components";
import { AttendanceByReason } from "../components/attendanceByReason"
import { SideBar } from "../components/sideBar"

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
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    align-items: flex-start;
`