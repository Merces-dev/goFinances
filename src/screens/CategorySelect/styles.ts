import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface ICategoryProps {
    isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1; 
    background-color: ${({ theme }) => theme.colors.background}; 
`
export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};

    width: 100%;
    height: ${RFValue(113)}px;

    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`
export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

`
export const Category = styled.TouchableOpacity<ICategoryProps>`
    width: 100%;
    padding:  ${RFValue(15)}px;

    flex-direction: row;
    align-items: center;

    background-color: ${({ theme, isActive }) =>
        isActive
            ? theme.colors.secondary
            : theme.colors.background}; 
`
export const Icon = styled(Feather)`
    font-size: ${RFValue(14)}px;
    margin-right: ${RFValue(16)}px;
`
export const Name = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`
export const Separator = styled.View`
    height: ${RFValue(1)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text}; 
`
export const Footer = styled.View`
    background-color: ${({ theme }) => theme.colors.background};

    width: 100%;
    padding: ${RFValue(24)}px;
`