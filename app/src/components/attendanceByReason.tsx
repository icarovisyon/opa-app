import { useEffect, useState, KeyboardEvent } from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import styled from "styled-components"
import { api } from "../hooks/useEffect"
import { Sheach } from "./sheach"
import { GraphicBar } from "./graphics/bar"


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
    const defaultGrid: GridRowsProp = [
    ]

    const [value, setValue] = useState('')
    const [isFeching, setIsFeching] = useState<boolean>(false)

    const [listAttendances, setListAttendances] = useState<GridRowsProp>(defaultGrid)


    const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setValue(target.value)
        }
    }

    const columnsGrid: GridColDef[] = [
        { field: "motivo", headerName: "Motivo", width: 400 },
        { field: "quantidade", headerName: "Quantidade", width: 150 }
    ]

    useEffect(() => {
        async function loadAttendancesByReason() {
            await api.get<DataGraphics[]>(`/attendance-reasons?gestor=${value}&dateStart=2022-09-01&dateFinal=2022-09-30`)
                .then(response => {
                    if (response.data) {
                        setListAttendances(response.data)
                        setIsFeching(false)
                        console.log(listAttendances)
                    }
                })
        }
        if (value !== '') {
            loadAttendancesByReason()
        }
    }, [value])

    return (
        <Main>
            <Sheach type="text" placeholder="Preencha o gestor" onKeyDown={handleChange} />
            <Content>
                {isFeching && <Loading>Carregando...</Loading>}
                {listAttendances?.length > 0 &&
                    <ContentGrid>
                        <DataGrid rows={listAttendances} columns={columnsGrid} />
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