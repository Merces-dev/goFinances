import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.View`
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
export const Form = styled.View`
    width: 100%;
    padding: ${RFValue(24)}px;
    
    flex: 1;
    justify-content: space-between;
`
export const Fields = styled.View``
