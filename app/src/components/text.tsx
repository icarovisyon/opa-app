import styled from "styled-components"

export interface TextProps {
    description: string
}

export function Text(props: TextProps) {
    return (
        <Description>{props.description}</Description>
    )
}

const Description = styled.span`
    font-family: Google Sans,sans-serif;
    color: #4e4a4a;
    font-weight: bold;
    font-size: 13px;
    padding: 0 0 30px 10px;
    text-align: end;
`