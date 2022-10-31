import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import styled from "styled-components";
import { AttendanceByReason } from "../components/attendanceStatistics"
import { SideBar } from "../components/sideBar"

export function Departamento() {
    const [modalAttendancesStatics, setModalAttendancesStatics] = useState(false)
    const [displayReasonByAttendances, setDisplayReasonByAttendances] = useState('block')



    useEffect(() => {
        setDisplayReasonByAttendances(modalAttendancesStatics ? 'none' : 'block')
    }, [modalAttendancesStatics])

    return (
        <Main>
            <SideBar selected="Departamento" />
            <Content>
                {modalAttendancesStatics && <Button onClick={() => setModalAttendancesStatics(!modalAttendancesStatics)}>Fechar</Button>}
                {modalAttendancesStatics && <AttendanceByReason />}
                <Button style={{ display: displayReasonByAttendances }} onClick={() => setModalAttendancesStatics(!modalAttendancesStatics)}>
                    Estatisticas do departamento
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