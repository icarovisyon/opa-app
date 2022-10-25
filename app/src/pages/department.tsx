import styled from "styled-components";
import { SideBar } from "../components/sideBar";

export function Departamento() {
    return (
        <>
            <SideBar selected="Departamento" />
            <Main>
            </Main>
        </>
    )
}

const Main = styled.div`
    margin: 0 45px 0 290px;
    padding: 35px 25px 0;
`