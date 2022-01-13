import React, { Component } from 'react'
import styled from 'styled-components'
import { Ionicons } from "@expo/vector-icons"

import Text from '../../components/Text'

export default RestaurantScreen = ({ route, navigation }) => {
    return (
        <RestaurantContainer>
            <RestaurantCoverContainer>
                <RestaurantCover />
                <BackButton onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-close" size={48} color="#ffffff" />
                </BackButton>
            </RestaurantCoverContainer>

        </RestaurantContainer>
    )
}


const RestaurantContainer = styled.View`
    background-color: #343434;
    flex: 1;
`;

const RestaurantCoverContainer = styled.View`
    position: relative;
`;

const RestaurantCover = styled.Image`
    height: 350px;
    width: 100%;
    border-bottom-right-radius: 32px;
    border-bottom-left-radius: 32px;
`;

const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 16px;
    top: 48px
`;