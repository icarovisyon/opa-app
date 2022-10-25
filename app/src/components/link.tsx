import styled from "styled-components"

export interface LinkProps {
    to: string,
    description: string
}

export function Link({ to, description }: LinkProps) {
    return (
        <Nav href={to}>
            <Description>{description}</Description>
        </Nav>
    )
}

const Nav = styled.a`
    color: inherit;
    cursor: inherit;
`
const Description = styled.span`
`