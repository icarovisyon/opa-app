import { Button } from "../components/Button"
import { useEffect, useState } from "react"
import styled from "styled-components";
import { AttendanceByReason } from "../components/attendanceByReason"
import { SideBar } from "../components/sideBar"
import { AttendanceTimeStamp } from "../components/attendanceTimeStamp";

export function Departamento() {
    const [modalReasonByAttendances, setModalReasonByAttendances] = useState(false)
    const [displayReasonByAttendances, setDisplayReasonByAttendances] = useState('block')

    const [modalAttendanceTimeStamp, setModalAttendanceTimeStamp] = useState(false)
    const [displayAttendanceTimeStamp, setDisplayAttendanceTimeStamp] = useState('block')



    useEffect(() => {
        setDisplayReasonByAttendances(modalReasonByAttendances ? 'none' : 'block')
    }, [modalReasonByAttendances])

    useEffect(() => {
        setDisplayAttendanceTimeStamp(modalAttendanceTimeStamp ? 'none' : 'block')
        setDisplayReasonByAttendances(modalReasonByAttendances ? 'none' : 'block')
    }, [modalAttendanceTimeStamp])

    return (
        <Main>
            <SideBar selected="Departamento" />
            <Content>
                <>
                    {modalReasonByAttendances && <Button onClick={() => setModalReasonByAttendances(!modalReasonByAttendances)}>Fechar</Button>}
                    {modalReasonByAttendances && <AttendanceByReason />}
                    <Button style={{ display: displayReasonByAttendances }} onClick={() => setModalReasonByAttendances(!modalReasonByAttendances)}>
                        Estatisticas do departamento
                    </Button>
                </>
                <>
                    {modalAttendanceTimeStamp && <Button onClick={() => setModalAttendanceTimeStamp(!modalAttendanceTimeStamp)}>Fechar</Button>}
                    {modalAttendanceTimeStamp && <AttendanceTimeStamp />}
                    <Button style={{ display: displayReasonByAttendances }} onClick={() => {
                        setModalReasonByAttendances(!modalReasonByAttendances)
                        setModalReasonByAttendances(!modalReasonByAttendances)
                    }}>
                        Atedimentos por tempo de espera
                    </Button>
                </>
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