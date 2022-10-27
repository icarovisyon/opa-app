import { useEffect, useState, KeyboardEvent } from "react";
import styled from "styled-components";
import { GraphicBar } from "../components/graphics/bar";
import { SideBar } from "../components/sideBar";
import { api } from "../hooks/useEffect";

interface ListData {
    id: string,
    name: string
}

interface Attendances {
    _id: {
        day: string,
        month: string,
        year: string
    },
    count: number,
    description: string
}

interface DataGraphics {
    data: [{
        _id: {
            day: string,
            month: string,
            year: string
        },
        count: number
    }]
    description: string
}

interface DataGraph {
    label: any[],
    data: any[],
    description: string
}

function dateFormat(day: string, month: string, year: string) {
    return new Date(year + "-" + month + "-" + day).toLocaleDateString('pt-BR')
}

export function Attendance() {
    const [gestor, setGestor] = useState('')
    const [listSetor, setListSetor] = useState<ListData[]>()
    const [listAttendant, setListAttendant] = useState<ListData[]>()
    const [setor, setSetor] = useState("")
    const [attendant, setAttendant] = useState("")
    const [dateStart, setDateStart] = useState("2022-09-01")
    const [dateFinal, setDateFinal] = useState("2022-09-30")
    const [isSheach, setIsSheach] = useState<boolean>(false)

    const [assumingData, setAssumingData] = useState<DataGraph>()
    const [finishData, setFinishData] = useState<DataGraph>()

    useEffect(() => {
        async function loadDepartments() {
            await api.get(`/departments?department=${gestor}`)
                .then(response => {
                    if (response.data == false) return
                    setListSetor(response.data)
                })
                .catch(err => console.log(err))
        }

        if (gestor !== '') {
            loadDepartments()
        }

    }, [gestor])

    useEffect(() => {
        async function loadAttendant() {
            await api.get(`/user-department?department=${setor}`)
                .then(response => {
                    if (response.data == false) return
                    setListAttendant(response.data)
                })
                .catch(err => console.log(err))
        }

        if (setor !== '') {
            loadAttendant()
        }
    }, [setor])

    useEffect(() => {
        async function loadDataAttendant() {
            try {
                await api.get<DataGraphics>(`/atendente-assuming?attendant=${attendant}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                    .then(responseAssuming => {
                        if (responseAssuming.data) {
                            let label: String[] = []
                            let dataSets: number[] = []

                            responseAssuming.data.data.map((data) => {
                                const date = dateFormat(data._id.day, data._id.month, data._id.year)
                                label.push(date)
                                dataSets.push(data.count)

                            })
                            setAssumingData({
                                data: dataSets,
                                description: responseAssuming.data.description,
                                label: label
                            })
                        }
                    })

                await api.get<DataGraphics>(`/atendente-finished?attendant=${attendant}&dateStart=${dateStart}&dateFinal=${dateFinal}`)
                    .then(responseFinish => {
                        if (responseFinish.data) {
                            let label: String[] = []
                            let dataSets: number[] = []

                            responseFinish.data.data.map((data) => {
                                const date = dateFormat(data._id.day, data._id.month, data._id.year)
                                label.push(date)
                                dataSets.push(data.count)

                            })
                            setFinishData({
                                data: dataSets,
                                description: responseFinish.data.description,
                                label: label
                            })
                        }
                    })

            } catch (err) {
                console.log(err)
            }
        }
        if (isSheach === true) {
            loadDataAttendant()
            setIsSheach(false)
        }
    }, [isSheach])

    const handleChangeGestor = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            const target = event.target as HTMLInputElement
            setGestor(target.value)
        }
    }
    return (
        <>
            <SideBar selected="Atendente" />
            <Main>
                <ContentTop>

                    <Sheach>
                        <SheachDepartment type={"text"} placeholder={"Digite o departamento"} onKeyDown={handleChangeGestor} />
                        <Icon className="fa fa-search" />
                    </Sheach>

                    <ContentDate>
                        <Description>Inicial:</Description>
                        <DateContent value={dateStart} id="dateStart" type={"date"} onChange={event => setDateStart(event.target.value)} />
                    </ContentDate>

                    <ContentDate>
                        <Description>Final:</Description>
                        <DateContent value={dateFinal} id="dateFinal" type={"date"} onChange={event => setDateFinal(event.target.value)} />
                    </ContentDate>


                </ContentTop>
                <Department value={setor} onChange={event => setSetor(event.target.value)}>
                    <OptionDepartment>Selecione um setor</OptionDepartment>
                    {listSetor?.map((setor, index) => (
                        <OptionDepartment key={index} value={setor.id}>{setor.name}</OptionDepartment>
                    ))}
                </Department>

                <Setor value={attendant} onChange={event => setAttendant(event.target.value)}>
                    <OptionDepartment>Selecione um atendente</OptionDepartment>
                    {listAttendant?.map((setor, index) => (
                        <OptionDepartment key={index} value={setor.id}>{setor.name}</OptionDepartment>
                    ))}
                </Setor>
                <ProcessSheach onClick={e => setIsSheach(true)}>
                    Pesquisar
                </ProcessSheach>
                <ContentGraphics>
                    {/*                     {assumingData?.data && <GraphicBar
                        dataSets={assumingData?.data}
                        description={assumingData?.description}
                        labels={assumingData?.label} />
                    } */}
                    {finishData?.data && <GraphicBar
                        dataSets={finishData?.data}
                        description={finishData?.description}
                        labels={finishData?.label} />
                    }
                </ContentGraphics>
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
    justify-content: flex-start;
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

const DateContent = styled.input`
    width: 120px;
    height: 40px;
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
`
const Department = styled.select`
    width: 210px;
    height: 42px;
    border-radius: 15px;
    background-color: #fff;
    text-align: center;
    font-size: 15px;
    color: #252525;
    margin: 0 10px 0 0;
`

const Setor = styled(Department)`
    width: 210px;
`

const OptionDepartment = styled.option`
    
`
const Description = styled.span`
    color: #252525;
    padding: 10px;
`
const Icon = styled.i`
    cursor: pointer;
    color: #252525;
    font-size: 24px;
`
const ContentGraphics = styled.div`
    padding: 25px 2px 50px;
`
const ProcessSheach = styled.button`
    width: 120px;
    height: 40px;
    color: #ffffff;
    font-size: 16px;
    background-color: #794ef4;
    border-radius: 10px;
    margin: 10px;
    cursor: pointer;
`