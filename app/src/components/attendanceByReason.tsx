import { useEffect, useState, KeyboardEvent } from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import styled from "styled-components"
import { api } from "../hooks/useEffect"
import { Sheach } from "./sheach"
import { defaultGrid } from "../config/config"
import { Description } from "./Description"
import { DateContent, InputDate } from "./dateContent"
import { Button } from "./Button"

import { CSVLink } from "react-csv"

const styles = {
    Description: {
        fontSize: "16px",
        padding: "0 10px 0"
    },
    Button: {
        backgroundColor: "#8a58ff",
        margin: "0 10px 0"
    },
    Link: {
        borderRadius: "10px",
        backgroundColor: "#8a58ff",
        color: "#fff",
        padding: "10px"
    }
};


interface DataGraphics {
    motivo: string,
    quantidade: number
}

interface DataGraph {
    label: any[],
    data: any[],
    description: string
}

export function AttendanceByReason() {
    const [gestor, setGestor] = useState('')
    const [isFeching, setIsFeching] = useState<boolean>(false)
    const [dateStart, setDateStart] = useState("2022-09-01")
    const [dateFinal, setDateFinal] = useState("2022-09-30")

    const [reload, setReload] = useState(true)

    const [listAttendances, setListAttendances] = useState<GridRowsProp>(defaultGrid)

    const [csv, setCsv] = useState<DataGraphics[]>([{
        motivo: "",
        quantidade: 0
    }])

    const headers = [
        { label: "Motivo", key: "motivo" },
        { label: "Quantidade", key: "quantidade" }
    ]

    const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        setGestor(target.value)
    }

    const columnsGrid: GridColDef[] = [
        { field: "motivo", headerName: "Motivo", width: 400 },
        { field: "quantidade", headerName: "Quantidade", width: 150 }
    ]

    useEffect(() => {
        async function loadAttendancesByReason() {
            setIsFeching(true)
            await api.get<DataGraphics[]>(`/attendance-reasons?gestor=${gestor}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                .then(response => {
                    if (response.data) {
                        setListAttendances(response.data)
                        setCsv(response.data)
                        setIsFeching(false)
                    }
                })
        }
        if (gestor !== '') {
            loadAttendancesByReason()
        }
    }, [reload])

    return (
        <Main>
            <ContentTop>
                <Sheach type="text" placeholder="Gestor" onChange={e => setGestor(e.target.value)} />
                <DateContent>
                    <Description style={styles.Description}>Inicial:</Description>
                    <InputDate value={dateStart} id="dateStart" type={"date"} onChange={event => setDateStart(event.target.value)} />
                </DateContent>

                <DateContent>
                    <Description style={styles.Description}>Final:</Description>
                    <InputDate value={dateFinal} id="dateFinal" type={"date"} onChange={event => setDateFinal(event.target.value)} />
                </DateContent>

                <Button style={styles.Button} onClick={e => setReload(!reload)}>Pesquisar</Button>

                <CSVLink style={styles.Link} data={csv} headers={headers}> CSV</CSVLink>

            </ContentTop>

            <Content>
                {isFeching && <Loading>Carregando...</Loading>}
                {listAttendances?.length > 0 &&
                    <ContentGrid>
                        <DataGrid
                            initialState={{ sorting: { sortModel: [{ field: 'quantidade', sort: 'desc' }] } }}
                            rows={listAttendances}
                            columns={columnsGrid} />
                    </ContentGrid>}
            </Content>
        </Main>
    )
}

const Main = styled.div`
    display: inline;
    width: 100vw;
    height: 100vh;
    margin: 0 10px 0 0;
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
`
const Loading = styled.span`
    color: #5e005e;
    padding: 25px;
`