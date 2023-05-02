import styled, { css } from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";

export const Button = styled(TouchableOpacity)`
    background-color: ${({ theme }) => theme.colors.secondary};
    
    width: 100%;
    border-radius: ${RFValue(5)}px;
    align-items: center;
    padding: ${RFValue(18)}px;
`
export const ButtonTitle = styled.Text` 
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
`