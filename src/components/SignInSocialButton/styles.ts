import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
export const Button = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.shape};
    border-radius: ${RFValue(5)}px;
    border-radius: ${RFValue(5)}px;

    height: ${RFValue(56)}px;

    align-items: center;
    flex-direction: row;

    margin-bottom: ${RFValue(16)}px;
`
export const ImageContainer = styled.View`
height: 100%;
justify-content: center;
align-items: center;

border-color: ${({ theme }) => theme.colors.background};
border-right-width: 1px;

padding: ${RFValue(16)}px;
`

export const Title = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${({ theme }) => theme.fonts.medium};
    font-size:${RFValue(14)}px;
`