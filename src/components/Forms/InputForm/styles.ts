import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TextInput } from "react-native";
import theme from "../../../global/styles/theme";
export const Container = styled.View
    `
`
export const Error = styled.Text`
    color: ${({ theme }) => theme.colors.attention};
    font-size: ${RFValue(14)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin: 7px;
`