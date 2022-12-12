import { useEffect, useState, KeyboardEvent } from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import styled from "styled-components"
import { api } from "../hooks/useEffect"
import { Sheach } from "./sheach"
import { dateFilterDefaul, defaultGrid, stylesGlobal } from "../config/config"
import { Description } from "./Description"
import { DateContent, InputDate } from "./dateContent"
import { Button } from "./Button"
import { CSVLink } from "react-csv"
import { Title } from "./title"
import { DataGraphBar, defaultValuesGraphicBar, GraphicBar } from "./graphics/bar"

interface ReasonProps {
    motivo: string,
    quantidade: number
}

interface NumberCallsWaitingTimeProps {
    tempo: number,
    chamados: number,
    departamentos: string
}

interface NumberCallHoursProps {
    departamento: string,
    data: [{
        hora: number,
        dia: number,
        mes: number,
        ano: number,
        quantidade: number
    }]
}

const headersCsv = {
    reasons: [
        { label: "Motivo", key: "motivo" },
        { label: "Quantidade", key: "quantidade" }
    ],
    numberCallsWaitingTime: [
        { label: "Setor", key: "setor" },
        { label: "Cinco", key: "cinco" },
        { label: "Dez", key: "dez" },
        { label: "Quinze", key: "quinze" },
        { label: "Vinte", key: "vinte" },
        { label: "Trinta", key: "trinta" },
        { label: "Trinta+", key: "maior" },
    ],
    callTimeMediumByReason: [
        { label: "Motivo", key: "motivo" },
        { label: "Media", key: "media" },
        { label: "Departamento", key: "departamento" }
    ],
    numberCallByHours: [
        { label: "Quantidade", key: "quantidade" },
        { label: "Hora", key: "hora" },
        { label: "Dia", key: "dia" },
        { label: "Mes", key: "mes" },
        { label: "Ano", key: "ano" }
    ]
}

const columnsGridByReason: GridColDef[] = [
    { field: "motivo", headerName: "Motivo", width: 400 },
    { field: "quantidade", headerName: "Quantidade", width: 150 }
]

const columnsGridByNumberCallsWaitingTime: GridColDef[] = [
    { field: "setor", headerName: "Setor", width: 230 },
    { field: "cinco", headerName: "Cinco", width: 91.666666667 },
    { field: "dez", headerName: "Dez", width: 91.666666667 },
    { field: "quinze", headerName: "Quinze", width: 91.666666667 },
    { field: "vinte", headerName: "Vinte", width: 91.666666667 },
    { field: "trinta", headerName: "Trinta", width: 91.666666667 },
    { field: "maior", headerName: "Trinta +", width: 91.666666667 }
]

const columnsGridCallTimeMediumByReason: GridColDef[] = [
    { field: "departamento", headerName: "Departamento", width: 260 },
    { field: "motivo", headerName: "Motivo", width: 260 },
    { field: "media", headerName: "media de tempo em horas", width: 210 }
]

const columnsGridByNumberCallsHours: GridColDef[] = [
    { field: "quantidade", headerName: "Quantidade", width: 146 },
    { field: "hora", headerName: "Hora", width: 146 },
    { field: "dia", headerName: "Dia", width: 146 },
    { field: "mes", headerName: "Mês", width: 146 },
    { field: "ano", headerName: "Ano", width: 146 },
]

export function AttendanceByReason() {
    const [gestor, setGestor] = useState('')
    const [isFeching, setIsFeching] = useState<boolean>(false)

    const [dateStart, setDateStart] = useState(dateFilterDefaul.start)
    const [dateFinal, setDateFinal] = useState(dateFilterDefaul.final)

    const [reload, setReload] = useState(true)

    const [listByReasons, setListByReasons] = useState<GridRowsProp>(defaultGrid)
    const [csvByReasons, setCsvByReasons] = useState<ReasonProps[]>([{ motivo: "", quantidade: 0 }])

    const [listByBumberCallsWaitingTime, setListByBumberCallsWaitingTime] = useState<GridRowsProp>(defaultGrid)
    const [csvByBumberCallsWaitingTime, setCsvByBumberCallsWaitingTime] = useState<ReasonProps[]>(
        [{ motivo: "", quantidade: 0 }])

    const [dataTimeWaitingAttendances, setDataTimeWaitingAttendances] = useState<DataGraphBar>(defaultValuesGraphicBar)

    const [callTimeMediumByReason, setCallTimeMediumByReason] = useState<GridRowsProp>(defaultGrid)
    const [csvCallTimeMediumByReason, setCsvCallTimeMediumByReason] = useState<ReasonProps[]>(
        [{ motivo: "", quantidade: 0 }])

    const [callNumberHour, setCallNumberHour] = useState<GridRowsProp>(defaultGrid)

    useEffect(() => {
        async function loadAttendancesByReason() {
            setIsFeching(true)
            await api.get<NumberCallsWaitingTimeProps[]>(`/call-time-by-department/${gestor}?dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        let label: String[] = []
                        let dataSets: number[] = []

                        response.data.map((data) => {
                            label.push(`${data.departamentos}, quant: ${data.chamados}`)
                            dataSets.push(data.tempo)
                        })
                        setDataTimeWaitingAttendances({
                            data: dataSets,
                            description: "Dados em minutos.",
                            label: label
                        })
                    }
                }).catch(error => console.log(error))


            api.get<ReasonProps[]>(`/attendance-number?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListByBumberCallsWaitingTime(response.data)
                        setCsvByBumberCallsWaitingTime(response.data)
                    }
                }).catch(error => console.log(error))

            api.get<ReasonProps[]>(`/attendance-reasons?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListByReasons(response.data)
                        setCsvByReasons(response.data)
                    }
                }).catch(error => console.log(error))

            api.get<ReasonProps[]>(`/call-time-medium-reasons?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setCallTimeMediumByReason(response.data)
                        setCsvCallTimeMediumByReason(response.data)
                    }
                }).catch(error => console.log(error))


            api.get<ReasonProps[]>(`/attendance-number?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListByBumberCallsWaitingTime(response.data)
                        setCsvByBumberCallsWaitingTime(response.data)
                    }
                }).catch(error => console.log(error))

            await api.get<NumberCallHoursProps[]>(`/number-call-by-hours?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setCallNumberHour(response.data)
                    }
                })
            setIsFeching(false)

        }
        if (gestor !== '') {
            loadAttendancesByReason()
        }
    }, [reload])

    const styleDate = {
        width: "200px"
    }
    return (
        <Main>
            <ContentTop>
                <Sheach type="text" placeholder="Gestor" onChange={e => setGestor(e.target.value)} />
                <DateContent>
                    <Description style={stylesGlobal.Description}>Inicial:</Description>
                    <InputDate style={styleDate} value={dateStart} id="dateStart" type={"datetime-local"} onChange={event => setDateStart(event.target.value)} />
                </DateContent>

                <DateContent>
                    <Description style={stylesGlobal.Description}>Final:</Description>
                    <InputDate style={styleDate} value={dateFinal} id="dateFinal" type={"datetime-local"} onChange={event => setDateFinal(event.target.value)} />
                </DateContent>

                <Button style={stylesGlobal.Button} onClick={e => setReload(!reload)}>Pesquisar</Button>
            </ContentTop>

            <Content>
                {isFeching && <><Loading>Carregando...</Loading> <br /></>}

                {dataTimeWaitingAttendances?.data.length > 0 && <>
                    <Title style={{ display: "inline-block", padding: "20px", color: "#701ec7" }} title="Media de tempo por departamento:" />
                    <ContentGraphics>
                        <GraphicBar dataSets={dataTimeWaitingAttendances?.data} description={dataTimeWaitingAttendances?.description} labels={dataTimeWaitingAttendances?.label} />
                    </ContentGraphics>
                </>}

                {listByBumberCallsWaitingTime?.length > 0 && <>
                    <Title style={stylesGlobal.Title} title="Quantidade de chamados por tempo médio:" />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={csvByBumberCallsWaitingTime}
                        headers={headersCsv.numberCallsWaitingTime}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid>
                        <DataGrid
                            rows={listByBumberCallsWaitingTime}
                            columns={columnsGridByNumberCallsWaitingTime} />
                    </ContentGrid>
                </>}

                {listByReasons?.length > 0 && <>
                    <Title style={stylesGlobal.Title} title="Atendimentos por motivo:" />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={csvByReasons}
                        headers={headersCsv.reasons}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid>
                        <DataGrid
                            initialState={{ sorting: { sortModel: [{ field: 'quantidade', sort: 'desc' }] } }}
                            rows={listByReasons}
                            columns={columnsGridByReason} />
                    </ContentGrid>
                </>}

                {callTimeMediumByReason?.length > 0 && <>
                    <Title style={stylesGlobal.Title} title="Tempo medio de conclusão de atendimentos:" />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={csvCallTimeMediumByReason}
                        headers={headersCsv.callTimeMediumByReason}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid>
                        <DataGrid
                            initialState={{ sorting: { sortModel: [{ field: 'media', sort: 'desc' }] } }}
                            rows={callTimeMediumByReason}
                            columns={columnsGridCallTimeMediumByReason} />
                    </ContentGrid>
                </>}
            </Content>
            {callNumberHour?.length &&
                <Title style={stylesGlobal.Title} title="Chamados abertos por hora:" />
            }
            {callNumberHour?.length > 0 && callNumberHour.map((call, index) => (
                <>
                    <br />
                    <Title style={stylesGlobal.Title} title={call.departamento + ":"} />
                    <CSVLink
                        style={stylesGlobal.ButtonCsv}
                        data={call.data}
                        headers={headersCsv.numberCallByHours}>
                        Baixar CSV
                        <Icon className="fa fa-download" aria-hidden="true" />
                    </CSVLink>
                    <ContentGrid key={index}>
                        <DataGrid
                            rows={call.data}
                            columns={columnsGridByNumberCallsHours} />
                    </ContentGrid>

                </>))
            }
            <br /><br />
        </Main >
    )
}

const Main = styled.div`
    display: inline;
    width: 100vw;
    height: 100vh;
    margin: 0 10px 40px 0;
`
const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    max-width: 700px;
`

const Content = styled.div`
    margin: 20px 0;
`
const ContentGrid = styled.div`
    width: 800px;
    height: 77vh;
    border-radius: 10px;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    background-color: #f1f1f1;
    color: gray;
    margin: 0 0 35px 0;
`

const ContentGraphics = styled.div`
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    padding: 25px 2px 50px;
    width: 800px;
    margin: 0 0 20px 0;
`

const Loading = styled.span`
    color: #5e005e;
    padding: 25px;
`
const Icon = styled.span`
    margin: 0 0 0 6px;
`