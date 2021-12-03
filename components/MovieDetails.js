import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import {
    Text,
    Image,
    View,
    StyleSheet,
    Button,
    StatusBar,
    ImageBackground,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { DETAILS_URL } from '../utils/urls';
import { CurrentRenderContext } from '@react-navigation/core';


export const MovieDetails = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [details, setDetails] = useState();

    useEffect(() => {
        fetch(DETAILS_URL(movieId))
            .then((res) => res.json())
            .then((data) => {
                setDetails(data);

            });
    }, [movieId]);

    return (

        <Container>

            {details && (
                <View>
                    <ScrollView style={styles.scrollView}>
                        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w780${details.poster_path}` }} resizeMode="cover" style={styles.background} />
                        <GoBackButton onPress={() => navigation.goBack()}goBack Goback/>
                        <Title>{details.title}</Title>
                        <DetailsText>{details.overview}</DetailsText>
                        <Rate>
                            Rating {details.vote_average}/10
                        </Rate>
                    </ScrollView>

                </View>
            )
            }
        </Container>
    )
};

const styles = StyleSheet.create({
    moviePoster: {
        width: '100%',
        height: 500,
    }, container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: StatusBar.currentHeight,
    },
    background: {
        width: '100%',
        height: 500,
    },
    scrollView: {
        backgroundColor: 'black',
        marginHorizontal: 10,
    },
});


const Container = styled.SafeAreaView`
	background-color: black;
`;

const GoBackButton = styled.TouchableOpacity`
color: white;
background-color: rgb(243,206,19);
font-size: 25px;
height: 50px;
`;

const Title = styled.Text`
	color: white;
	font-size: 25px;
	font-weight: bold;
	margin: 10px auto;
	text-align:center;
`;

const DetailsText = styled.Text`
	font-size: 16px;
	font-weight: normal;
	color: white;
    padding: 0 5px 0 5px;
	margin-bottom: 10px;
`;

const Rate = styled.Text`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: 20px;
    padding: 0 5px 0 5px;
    color: rgb(243,206,19);
`;