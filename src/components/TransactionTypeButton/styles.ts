import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";

interface IButtonProps {
    isActive: boolean;
    type: "positive" | "negative";
}
interface IIconsProps {
    type: "positive" | "negative";
}
export const Button = styled(TouchableOpacity) <IButtonProps>`
    background-color: ${({ theme }) => theme.colors.background};

    border-width: ${({ isActive }) => isActive ? 0 : 1.5}px ;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text}; 
    border-radius: ${RFValue(5)}px;

    flex: 0.48;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    padding: ${RFValue(16)}px;

    ${({ isActive, type }) => isActive && type === 'positive' && css`
        background-color: ${({ theme }) => theme.colors.success_light};
    `}
    ${({ isActive, type }) => isActive && type === 'negative' && css`
        background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`
export const Icon = styled(Feather) <IIconsProps>`
    font-size:${RFValue(24)}px;
    color: ${({ theme, type }) => type == 'positive' ? theme.colors.success : theme.colors.attention};

    margin-right: ${RFValue(12)}px;
`

export const Title = styled.Text`
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.text_dark};
    
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size:${RFValue(14)}px;
`