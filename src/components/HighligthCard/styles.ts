import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface TypeProps {
    type: "up" | "down" | "total";
}

export const Container = styled.View <TypeProps>`
    width: ${RFValue(300)}px;
    border-radius: ${RFValue(5)}px;
    padding: ${RFValue(19)}px ${RFValue(23)}px;
    padding-bottom:  ${RFValue(42)}px;
    margin-right: ${RFValue(16)}px;

    background-color: ${({ theme, type }) => type === 'total' ? theme.colors.secondary : theme.colors.shape};
    
    `

export const Header = styled.View`
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`
export const Title = styled.Text <TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;

    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`

export const Icon = styled(Feather) <TypeProps>`
    font-size: ${RFValue(40)}px;
    ${({ type }) => type === 'up' && css`
        color: ${({ theme }) => theme.colors.success} 
    `};

    ${({ type }) => type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention} 
    `};

    ${({ type }) => type === 'total' && css`
        color: ${({ theme }) => theme.colors.shape} 
    `};
`
export const Footer = styled.View``

export const Amount = styled.Text <TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)}px;

    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text_dark};

    margin-top: ${RFValue(38)}px;
`

export const LastTransaction = styled.Text <TypeProps>`
    font-size: ${RFValue(12)}px;
    font-family: ${({ theme }) => theme.fonts.regular};

    color: ${({ theme, type }) => type === 'total' ? theme.colors.shape : theme.colors.text};
`