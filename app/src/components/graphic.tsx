import { useState, useEffect } from "react"
import styled from "styled-components"
import { GraphicLine } from "./graphics/line"

export function Graphic() {

    return (
        <Main>
            <GraphicLine />
        </Main>
    )
}

const Main = styled.div`
    width: 100%;
`