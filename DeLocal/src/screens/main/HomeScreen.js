import React, {useState, useRef} from 'react';
import styled from 'styled-components'
import { Entypo } from '@expo/vector-icons'

import Text from '../../components/Text'
import categoryList from '../../../resources/categories'
import restaurants from '../../../resources/restaurantData'

export default HomeScreen = ({navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const foodRef = useRef();

    const RestaurantItem = (restaurant) => {
        return (
            <Restaurant onPress={() => navigation.navigate("RestaurantScreen", { restaurant: restaurant })}>
                <RestaurantCover source={restaurant.cover} />
                <RestaurantInfo backgroundColor={restaurant.backgroundColor}>
                    <RestaurantImage source={restaurant.cover} />
                    <RestaurantTitle>
                        <Text medium bold>{restaurant.title}</Text>
                        <Text small>{restaurant.teaser}</Text>
                    </RestaurantTitle>
                </RestaurantInfo>
            </Restaurant>
        );
    };

    return (
        <Container>

            <UserInfoContainer>
                <Text large heavy color="#819ee5">Hello,
                    <Text medium bold> Nolan Deutsch</Text>
                    {'\n'}
                    <Text large heavy color="#819ee5">135 59St SW</Text>
                </Text>
                <Avatar source={require('../../../assets/defaultProfilePhoto.jpg')} />
            </UserInfoContainer>
            <Header>
                <SearchContainer>
                    <Search placeholder="Search for restaurants..." placeholderTextColor="#838383" />
                    <SearchIcon>
                        <Entypo name="magnifying-glass" size={24} color="#838383" />
                    </SearchIcon>
                </SearchContainer>
            </Header>

            <Categories horizontal={true} showsHorizontalScrollIndicator={false}>
                {categoryList.map((category, index) => {
                    return (
                        <Category key={index} >
                            <CategoryName selected={selectedCategory === category ? true : false}>
                                {category}
                            </CategoryName>
                            {selectedCategory === category && <CategoryDot />}
                        </Category>
                    )
                })}
            </Categories>

            <Restaurants 
                data={restaurants.filter(restaurants => {
                    return restaurants.category.includes(selectedCategory) || selectedCategory === "All";
                })} 
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => RestaurantItem(item)}
                ref={foodRef}
            />
        </Container>
    );
}

const Container = styled.View`
    background-color: #1e1e1e;
    flex: 1;
`;

const UserInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 64px 32px 0 32px;
`;

const Avatar = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 32px;
`;

const Header = styled.View`
`;

const SearchContainer = styled.View`
    position: relative;
    margin: 32px 8px;
    background-color: #404040;
    border-radius: 100px;
    justify-content: center;
`;

const Search = styled.TextInput`
    padding: 16px 64px 16px 32px;
    color: #c6c6c6;
`;

const SearchIcon = styled.TouchableOpacity`
    position: absolute;
    right: 16px;
`;

const Categories = styled.ScrollView`
    margin-top: 16px;
    flex-grow: 0; 
`;

const Category = styled.TouchableOpacity`
    align-items: center;
    margin: 0 16px;
    height: 32px;
`;

const CategoryName = styled(Text)`
    color: ${props => ([props.selected ? "#819ee5" : "#9a9a9a"])};
    font-weight: ${props => (props.selected ? "700" : "500")};
`;

const CategoryDot = styled.View`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    background-color: #819ee5;
`;

const Restaurants = styled.FlatList`
    margin-top: 32px;
    flex: 1;
`;

const Restaurant = styled.TouchableOpacity`
    margin-bottom: 32px;
`;

const RestaurantCover = styled.Image`
    height: 300px;
    width: 100%;
`;

const RestaurantInfo = styled.View`
    margin: -45px 16px 0 16px;
    padding: 16px;
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
`;

const RestaurantImage = styled.Image`
    width: 50px;
    height: 40px;
    border-radius: 8px;
`;

const RestaurantTitle = styled.View`
    margin: 0 24px;
`;