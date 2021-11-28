import styled from "styled-components";
import colors from "constans/colors"

export const Container = styled.div`
display: flex;
position: relative;
`

export const CountryIcon = styled.img`
width: 20px;
cursor: pointer;
`

export const DropdownWrapper = styled.ul`
opacity: ${props => props.active ? "1" : "0"};
height: ${props => props.active ? "auto" : "0"};
width: ${props => props.active ? "30px" : "0"};
position: absolute;
background-color: ${colors.darkestPurple};
border-radius: 15px;
top: 30px;
left: -5px;
transition: 0.2s all ease-in-out;
padding: 0;
margin: 0;
list-style: none;
`

export const FlagsWrapper = styled.div`
display: flex;
`

export const FlagsItem = styled.li`
display: flex;
align-items: center;
justify-content: center;
margin: 15px 0;
`