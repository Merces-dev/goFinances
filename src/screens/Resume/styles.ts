import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";
import { BorderlessButton } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1; 
    background-color: ${({ theme }) => theme.colors.background}; 
`
export const LoadContainer = styled.View`
flex: 1;
justify-content: center;
align-items: center;
`
export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
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
export const ScrollView = styled.ScrollView``

export const Month = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
`
export const MonthSelect = styled.View`
    width:100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`
export const MonthSelectButton = styled.TouchableOpacity``
export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`

export const NoContentContainer = styled.View`
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background}; 
`
export const NoContentTitle = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    text-align: center;
`