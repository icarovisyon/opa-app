import styled from "styled-components"
import { DateContent, InputDate } from "../components/dateContent"
import { GraphicBar } from "../components/graphics/bar"
import { SideBar } from "../components/sideBar"
import { ReviewClients } from "../components/tableReviewClients"
import { Text } from "../components/text"
import { Title } from "../components/title"
import { dateFilterDefaul, px2vw } from "../config/config"
import { useFetch } from "../hooks/useEffect"

export interface TimeMidRowProps {
    tempo?: String,
    chamados?: String,
    departamentos?: string
}
export interface StaticsAttendanceProps {
    total?: number,
    assumidos?: number,
    semInteracao?: number
}

const timeMidRowDefault: TimeMidRowProps = {}

const staticsAttendanceDefault: StaticsAttendanceProps = {}


export function Homepage() {
    const { data: timeMidRow, isFetching: loadingTimeMidRow } = useFetch<TimeMidRowProps>(`/call-time-all?dateStart=${dateFilterDefaul.start}&dateFinal=${dateFilterDefaul.final}`, timeMidRowDefault)

    const { data: staticsAttendance, isFetching: loadingStaticsAttendance } = useFetch<StaticsAttendanceProps>(`/attendance-statistics?dateStart=${dateFilterDefaul.start}&dateFinal=${dateFilterDefaul.final}`, staticsAttendanceDefault)

    return (
        <Main>
            <SideBar selected="Dashboard" />
            <Content>
                <Title title="Indicadores:" />
                <Text description="Periodo: 09/2022" />
                <ContentCards>
                    <Cards>
                        <DescriptionCard>Tempo Médio na fila:</DescriptionCard>
                        <ValueCard>
                            {loadingTimeMidRow && <Loading>Carregando...</Loading>}
                            {timeMidRow?.tempo}
                        </ValueCard>
                    </Cards>
                    <Cards>
                        <DescriptionCard>Chamados abertos:</DescriptionCard>
                        <ValueCard>
                            {loadingStaticsAttendance && <Loading>Carregando...</Loading>}
                            {staticsAttendance?.total}
                        </ValueCard>
                    </Cards>
                    <Cards>
                        <DescriptionCard>Chamados atendidos:</DescriptionCard>
                        <ValueCard>
                            {loadingStaticsAttendance && <Loading>Carregando...</Loading>}
                            {staticsAttendance?.assumidos}
                        </ValueCard>
                    </Cards>
                    <Cards>
                        <DescriptionCard>Chamados sem interação:</DescriptionCard>
                        <ValueCard>
                            {loadingStaticsAttendance && <Loading>Carregando...</Loading>}
                            {staticsAttendance?.semInteracao}
                        </ValueCard>
                    </Cards>
                </ContentCards>
                <ContentReviewClient>
                    <ReviewClients />
                </ContentReviewClient>
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

const ContentTop = styled.div`
    display: flex;
`

const ContentCards = styled.div`
    display: flex;
`

const Cards = styled.div`
    background-color: #fff;
    width: 30%;
    min-width: 170px;
    height: 100px;
    margin: 10px 6px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0 1rem 2rem hsl(0 0% 0% / 20%);
`

const DescriptionCard = styled.span`
    width: 100%;
    text-align: start;
    padding: 0 0 0 15px;
    font-size: 14px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: #504f4f;
`

const ValueCard = styled.span`
    font-size: 24px;
    color: #4e4e4e;
    padding: 0 0 16px;
    font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
`

const Loading = styled.span`
    font-size: 12px;
    color: #1105dc;
    padding: 0 0 16px;
    font-family: Arial, Helvetica, sans-serif;
`

const ContentGraphic = styled.div`
`
const ContentReviewClient = styled.div`
    width: 450px;
    padding: 25px 0 0 10px;
    background-color: transparent;
    border-radius: 10px;
    color: rgb(243 243 243);
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0 0 10px 0;
    display: flex;
    flex-direction: row;

    @media (min-width: 1000px){
        width: 500px;
        height: 700px;
    }
`