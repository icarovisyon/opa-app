import { useEffect, useState, KeyboardEvent } from "react";
import styled from "styled-components";
import { SideBar } from "../components/sideBar";
import { api } from "../hooks/useEffect";

interface ListSetor {
    id: string,
    name: string
}

export function Attendance() {
    const [value, setValue] = useState('')

    const [listSetor, setListSetor] = useState<ListSetor[]>()

    const [selectSetor, setSelectSetor] = useState("");

    const handleChangeDepartment = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setValue(target.value)
        }
    }

    useEffect(() => {
        async function loadDepartments() {
            await api.get(`/departments?department=${value}`)
                .then(response => {
                    if (response.data == false) return
                    setListSetor(response.data)
                })
                .catch(err => console.log(err))
        }

        if (value !== '') {
            loadDepartments()
        }

    }, [value])

    function handleCreate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        alert(selectSetor)
    }
    return (
        <>
            <SideBar selected="Atendente" />
            <Main>
                <ContentTop>
                    <Sheach>
                        <SheachDepartment type={"text"} placeholder={"Digite o departamento"} onKeyDown={handleChangeDepartment} />
                        <Icon className="fa fa-search" />
                    </Sheach>
                    <ContentDate>
                        <Description>Inicial:</Description>
                        <Date id="dateStart" type={"date"} defaultValue={"2022-09-01"} />
                    </ContentDate>
                    <ContentDate>
                        <Description>Final:</Description>
                        <Date id="dateFinal" type={"date"} defaultValue={"2022-09-30"} />
                    </ContentDate>
                    <Department value={selectSetor} onChange={e => setSelectSetor(e.target.value)}>
                        <OptionDepartment>Selecione um setor</OptionDepartment>
                        {listSetor?.map((setor, index) => (
                            <OptionDepartment key={index} value={setor.id}>{setor.name}</OptionDepartment>
                        ))}
                    </Department>
                    <Setor>
                        <OptionDepartment>Selecione um atendente</OptionDepartment>
                        <OptionDepartment>Setor</OptionDepartment>
                        <OptionDepartment>Setor</OptionDepartment>
                        <OptionDepartment>Setor</OptionDepartment>
                    </Setor>
                </ContentTop>
                <button onClick={e => handleCreate(e)}>
                    Click me
                </button>
            </Main>
        </>
    )
}

const Main = styled.div`
    margin: 0 45px 0 290px;
    padding: 35px 25px 0;
`
const ContentTop = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: space-between;
    align-items: center;
`
const Sheach = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    background-color: #fff;
    padding: 5px 15px 5px 0;
`

const SheachDepartment = styled.input`
    border-radius: 10px;
    width: 220px;
    font-size: 16px;
    padding: 10px 0 10px 20px;
    color: #252525;
    background-color: transparent;
    display: inline;
`
const ContentDate = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-content: space-between;
    flex-direction: row;
    align-items: center;
`

const Date = styled.input`
    width: 120px;
    height: 40px;
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
`
const Department = styled.select`
    width: 240px;
    height: 42px;
    border-radius: 15px;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    color: #252525;
    margin: 0 10px 0 0;
`

const Setor = styled(Department)`
    
`

const OptionDepartment = styled.option`
    
`
const Description = styled.span`
    color: #252525;
`
const Icon = styled.i`
    cursor: pointer;
    color: #252525;
    font-size: 24px;
`