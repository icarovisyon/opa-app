import { useQuery } from "react-query";
import styled from "styled-components";
import { dateFilterDefaul } from "../config/config";
import { api, useFetch } from "../hooks/useEffect";

export interface CustomerReviewMediaProps {
    media: string,
    quantidade: number,
    cliente: string
}

interface DateProps {
    start: string,
    final: string
}
export function Table() {
    const url = `/customer-review-media?dateStart=${dateFilterDefaul.start}&dateFinal=${dateFilterDefaul.final}`

    const { data: customerReviewMedia, isFetching: isFetchingCustomerReviewMedia } = useQuery<CustomerReviewMediaProps[]>('media', async () => {
        const response = await api.get(url)
        return response.data
    }, {
        staleTime: 1000 * 60 * 10 //10min
    })
    return (
        <Main>
            <Content>
                <Header>
                    <Tr>
                        <Th>Cliente</Th>
                        <Th>Media</Th>
                        <Th>Quantidade</Th>
                    </Tr>
                </Header>
                <Body>
                    {customerReviewMedia?.map((data, index) => (
                        <Tr key={index}>
                            <Td>{data.cliente}</Td>
                            <Td>{data.media}</Td>
                            <Td>{data.quantidade}</Td>
                        </Tr>
                    ))}
                </Body>
            </Content>
            {isFetchingCustomerReviewMedia && <Loading>Carregando...</Loading>}
        </Main>
    )
}
const Main = styled.div`
    overflow: auto;
`

const Content = styled.table`
    border-radius: 5px;
    width: 440px;
    overflow: auto;
    text-align: start;
    text-align: left;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 14px;
    line-height: 22px;
    font-weight: 300;
    overflow: hidden;
    border-collapse: collapse;

    @media (min-height: 768px){
        width: 490px;
    }
`
const Header = styled.thead`
    margin-top: 0;
    margin: 0;
    padding: 2px;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-family: inherit;
    font-size: 100%;
    vertical-align: baseline;
    color: gray;
`
const Th = styled.th`
    background-color: #a09e9e;
    border-bottom: 1px solid #040405;
    padding: 8px;
    font-size: 14px;
    line-height: 15px;
    text-transform: uppercase;
    color: #fffefe;
    margin-top: 0;
    text-align: start;
    padding: 8px 0 8px 10px;
`

const Body = styled.tbody`
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-family: inherit;
    font-size: 100%;
    vertical-align: baseline;
    display: table-row-group;
`
const Tr = styled.tr`
`

const Td = styled.td`
    background-color: rgb(228, 227, 227);
    vertical-align: top;
    padding: 6px 0 6px 10px;
    font-weight: 300;
    max-width: 272px;
    text-align: start;
    border-bottom: 1px solid #040405;
    color: #5c5b5b;
    font-weight: 400;
    font-family: roboto;
`

const Desc = styled.span`
`
const Loading = styled.span`
    font-size: 12px;
    color: #1105dc;
    padding: 0 0 16px;
    font-family: Montserrat, Arial, sans-serif;
    padding: 10px;
`