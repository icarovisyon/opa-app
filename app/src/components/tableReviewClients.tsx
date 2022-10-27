import styled from "styled-components"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"
import { dateFilterDefaul } from "../config/config"
import { useFetch } from "../hooks/useEffect"

export interface CustomerReviewMediaProps {
    media: string,
    quantidade: number,
    cliente: string
}

interface DateProps {
    start: string,
    final: string
}
export function ReviewClients() {
    const url = `/customer-review-media?dateStart=${dateFilterDefaul.start}&dateFinal=${dateFilterDefaul.final}`

    const defaultGrid: GridRowsProp[] = [
    ]
    const columnsGrid: GridColDef[] = [
        { field: "cliente", headerName: "Cliente", width: 240 },
        { field: "media", headerName: "media", width: 80 },
        { field: "quantidade", headerName: "quantidade", width: 80 }
    ]

    const { data: customerReviewMedia, isFetching: isFetchingCustomerReviewMedia } = useFetch<GridRowsProp[]>(url, defaultGrid)

    return (
        <Main>
            {isFetchingCustomerReviewMedia && <Loading>Carregando...</Loading>}
            {customerReviewMedia?.length > 0 && <ContentGrid>
                <DataGrid rows={customerReviewMedia} columns={columnsGrid} />
            </ContentGrid>
            }
        </Main>
    )
}
const Main = styled.div`
    overflow: auto;
`

const Loading = styled.span`
    font-size: 12px;
    color: #1105dc;
    padding: 0 0 16px;
    font-family: Montserrat, Arial, sans-serif;
    padding: 10px;
`

const ContentGrid = styled.div`
    box-shadow: 0 0rem 1rem hsl(0 0% 0% / 20%);
    width: 500px;
    height: 700px;
    border-radius: 10px;
    background-color: #f1f1f1;
    color: gray;
    @media (max-width: 1400px){
        width: 450px;
        height: 400px;
    }
`