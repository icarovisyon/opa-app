import styled from 'styled-components'
import { Link } from './link'

export interface SidebarProps {
    selected: string;
}

export function SideBar({ selected }: SidebarProps) {
    const list = [{
        to: "/",
        descrition: "Dashboard",
        icon: "fa-solid fa-chart-line"
    },
    {
        to: "/departamento",
        descrition: "Departamento",
        icon: "fa-regular fa-building"
    },
    {
        to: "/cliente",
        descrition: "Cliente",
        icon: "fa-solid fa-user"
    },
    {
        to: "/atendente",
        descrition: "Atendente",
        icon: "fa-solid fa-user"
    }]
    return (
        <Main>
            <List>
                {list?.map((list, index) => (
                    list.descrition === selected ?
                        <Navigation style={{ background: "#9265e7", color: "#fff" }} key={index}>
                            <Icon className={list.icon}></Icon>
                            <Link to={list.to} description={list.descrition} />
                        </Navigation>
                        :
                        <Navigation key={index}>
                            <Icon className={list.icon}></Icon>
                            <Link to={list.to} description={list.descrition} />
                        </Navigation>
                ))}
            </List>
        </Main >
    )
}

const Main = styled.div`
    width: 260px;
    height: 100vh;
    background-color: #fff;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px 1px;
    border-radius: 10px;
    padding: 0 0 0 10px;
    @media (max-height: 800px){
        width: 250px;
    }
`

const List = styled.ul`
    padding: 100px 0px 0px;
`
const Navigation = styled.li`
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    color: rgb(136, 134, 134);
    padding: 10px 50px;
    border-radius: 5px;
    display: inline-flex;
    width: 150px;
    height: 24px;
    @media (max-height: 800px){
        width: 140px;
    }
`
const Icon = styled.i`
    padding: 0 6px 0 0;
    font-size: 20px;
`