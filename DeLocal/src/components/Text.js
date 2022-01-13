import React from 'react'
import styled from 'styled-components'

export default TextStyle = ({ ...props }) => {
    return <Text {...props}>{props.children}</Text>
}

const Text = styled.Text`
    color: ${props => props.color ?? "#DBDBDB"};
    font-family: "sans-serif";
    margin: ${props => props.margin ?? 0};
    padding: ${props => props.padding ?? 0};
    
    ${({ title, large, medium, small, tiny }) => {
        switch (true) {
            case title:
                return `font-size: 32px;`;

            case large:
                return `font-size: 20px;`;

            case medium:
                return `font-size: 16px;`;

            case small:
                return `font-size: 13px;`;

            case tiny:
                return `font-size: 10px;`;

            default:
                return `font-size: 14px;`;
        }
    }}

    ${({ light, semi, bold, heavy, black }) => {
        switch (true) {
            case light:
                return `font-weight: 200;`;

            case semi:
                return `font-weight: 300;`;

            case bold:
                return `font-weight: 600;`;

            case heavy:
                return `font-weight: 700;`;

            case black:
                return `font-weight: 900;`;

            default:
                return `font-weight: 400;`;
        }
    }}

    ${({ center, right }) => {
        switch (true) {
            case center:
                return `text-align: center;`;

            case right:
                return `text-align: right;`;

            default:
                return `text-align: left;`;
        }
    }}
`;