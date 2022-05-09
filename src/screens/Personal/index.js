import React,{useState, useEffect} from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Swiper from 'react-native-swiper';

import Stars from '../../components/Stars';

import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import { 
    Container,
    Scroller,
    PageBody,
    BackButton,
    LoadingIcon,

    SwipeDot,
    SwipeDotActive,
    SwipeItem,
    SwipeImage,
    FakeSwiper,

    UserInfoArea,
    UserAvatar,
    UserInfo,
    UserInfoName,
    UserFavButton,

    ServiceArea,
    ServiceTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseBtnText,
    ServiceChooseButton,

    TestimonialArea,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody,
 } from './styles';

import Api from '../../Api';

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getPersonalInfo = async () => {
            setLoading(true);

            let json = await Api.getPersonal(userInfo.id);
            if(json.error == ''){
                setUserInfo(json.data);
            }else{
                alert("Erro: "+json.error);
            }

            setLoading(false);
        }
        getPersonalInfo();
    }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    return(
        <Container>
            <Scroller>
                {userInfo.photo && userInfo.photos.length > 0 ?
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeDotActive />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}

                    >
                        {userInfo.photos.map((item, key)=>{
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        })}
                    </Swiper>
                    :
                    <FakeSwiper>
                        <SwipeImage source={require('../../assets/logo.png')} resizeMode="cover" />
                    </FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName> {userInfo.name} </UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfo>
                        <UserFavButton>
                            <FavoriteIcon width="24" height="24" fill="#434584" />
                        </UserFavButton>
                    </UserInfoArea>

                    {loading &&
                        <LoadingIcon size="large" color="#000" />
                    }
                    {userInfo.services &&
                        <ServiceArea>
                            <ServiceTitle>Lista de serviços</ServiceTitle>

                            {userInfo.services.map((item, key)=>{
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R$ {item.price}</ServicePrice>
                                </ServiceInfo>
                                <ServiceChooseButton>
                                    <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                </ServiceChooseButton>
                            </ServiceItem>
                            })}
                        </ServiceArea>
                    }
                   {userInfo.testimonials && userInfo.testimonials.lenght > 0 &&
                        <TestimonialArea>
                            <Swiper
                                style={{height: 110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" heigth="35" fill="#000" />}
                                nextButton={<NavNextIcon width="35" heigth="35" fill="#000" />}
                            >
                                {userInfo.testimonials.map((item,key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={true} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}

                            </Swiper>

                        </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#fff" />
            </BackButton>
        </Container>
    );
}
