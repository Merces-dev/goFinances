import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import theme from "../../../global/styles/theme";

export const Container = styled(TouchableOpacity).attrs({ activeOpacity: 0.7 })
    ` 
    width: 100%;
    padding: ${RFValue(16)}px ${RFValue(18)}px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFValue(5)}px;

    margin-top: ${RFValue(16)}px;
`
export const Category = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size:${RFValue(14)}px;
`
export const Icon = styled(Feather)`
    font-size:${RFValue(20)}px;
    color: ${({ theme }) => theme.colors.text};
`