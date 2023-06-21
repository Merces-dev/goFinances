import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1; 
`
export const Header = styled.View`
    width: 100%;
    height: 70%;

    background-color: ${({ theme }) => theme.colors.primary}; 

    justify-content: flex-end;
    align-items: center;
`
export const TitleWrapper = styled.View`
    align-items: center;
`

export const Logo = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary}; 
    font-size: ${RFValue(35)}px;
`
export const TitleApp = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular}; 
    color: ${({ theme }) => theme.colors.shape}; 
    font-size: ${RFValue(25)}px;

    text-align: center;
`
export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium}; 
    color: ${({ theme }) => theme.colors.shape}; 
    font-size: ${RFValue(30)}px;

    text-align: center;

    margin-top: 35px;
`

export const SignInTitle = styled.Text`
    font-family: ${({ theme }) => theme.fonts.medium}; 
    color: ${({ theme }) => theme.colors.shape}; 
    font-size: ${RFValue(16)}px;

    text-align: center;

    margin-top: 35px;
    margin-bottom: 40px;
`
export const Footer = styled.View`
    width: 100%;
    height: 30%;

    background-color: ${({ theme }) => theme.colors.secondary}; 
`

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`