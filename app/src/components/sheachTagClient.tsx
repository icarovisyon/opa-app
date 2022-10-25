import { useEffect, useState, KeyboardEvent } from "react"
import styled from "styled-components"
import { api } from "../hooks/useEffect"

export interface ClientTag {
    id: string,
    nome: string,
    status: string,
    tag: string,
}

export function SheachTagClient() {
    const [value, setValue] = useState('')

    const [listClient, setListClient] = useState<ClientTag[]>()

    const handleChange = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setValue(target.value)
        }
    }

    useEffect(() => {
        async function loadClients() {
            await api.get(`/clients-by-tags?tag=${value}`)
                .then(response => {
                    if (response.data.type == "error") return
                    setListClient(response.data)
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
                <ContentTable>
                    <Head>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Status</Th>
                            <Th>Tag</Th>
                        </Tr>
                    </Head>
                    <Body>
                        {listClient?.map((client, index) => (
                            <Tr key={index}>
                                <Td>{client.nome}</Td>
                                <Td>{client.status}</Td>
                                <Td>{client.tag}</Td>
                            </Tr>
                        ))}
                    </Body>
                </ContentTable>
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
`
const Content = styled.div`
    margin: 20px 0;
`
const ContentTable = styled.table`
    border-radius: 2px;
    width: 800px;
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
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px 1px;

    @media (min-height: 1000px){
        width: 1000px;
    }
`
const Head = styled.thead`
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
    background-color: #7c4aff;
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
const Tr = styled.tr`
    border-bottom: 1px solid black;
    padding: 2px 0;
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