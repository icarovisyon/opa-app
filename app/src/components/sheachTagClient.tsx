import { useEffect, useState, KeyboardEvent } from "react"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import styled from "styled-components"
import { api } from "../hooks/useEffect"

export function SheachTagClient() {
    const defaultGrid: GridRowsProp = [
    ]
    const columnsGrid: GridColDef[] = [
        { field: "nome", headerName: "Nome", width: 400 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "tag", headerName: "Tag", width: 150 }
    ]

    const [value, setValue] = useState('')
    const [listClient, setListClient] = useState<GridRowsProp>(defaultGrid)
    const [isFeching, setIsFeching] = useState<boolean>(false)

    const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setValue(target.value)
        }
    }

    useEffect(() => {
        async function loadClients() {
            setIsFeching(true)
            await api.get(`/clients-by-tags?tag=${value}`)
                .then(response => {
                    if (response.data.type == "error") {
                        setIsFeching(false)
                        return
                    }
                    setListClient(response.data)
                    setIsFeching(false)
                })
                .catch(err => console.log(err))
        }

        if (value !== '') {
            loadClients()
        }

    }, [value])

    return (
        <Main>
            <Sheach type="text" placeholder="Preencha o nome da tag" onKeyDown={handleChange} />
            <Content>
                {isFeching && <Loading>Carregando...</Loading>}
                {listClient?.length > 0 && <ContentGrid>
                    <DataGrid rows={listClient} columns={columnsGrid} />
                </ContentGrid>
                }
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
const Sheach = styled.input`
    width: 240px;
    height: 40px;
    border-radius: 10px;
    padding: 0 0 0 1em;
    font-size: 15px;
    font-family: Arial, Helvetica, sans-serif;
    display: inline;
    margin: 0 0 0 1.5em;
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    &:hover {
        box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
  }
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