import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

import COLORS from '../constants/colors';
import hotels from '../constants/hotels';
import {generateBoxShadow} from '../utils/boxshadow';

import IconPerson from '../assets/icons/person.svg';
import IconSearch from '../assets/icons/search.svg';
import IconBookmark from '../assets/icons/bookmark.svg';
import IconStarSolid from '../assets/icons/star-solid.svg';

const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const CategoryList = ({
  categories,
  currentCategory,
  setSelectedCategory,
}: any) => {
  return (
    <View style={styles.categoryContainer}>
      {categories.map((item: string, index: any) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategory(index)}>
          <View>
            <Text
              style={[
                styles.categoryText,
                {
                  color:
                    currentCategory === index ? COLORS.primary : COLORS.grey,
                },
              ]}>
              {item}
            </Text>
            {currentCategory === index && (
              <View style={styles.categoryActive} />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Card = ({hotel, index, scrollX, navigation, currentCardIndex}: any) => {
  const inputRange = [
    (index - 1) * cardWidth,
    index * cardWidth,
    (index + 1) * cardWidth,
  ];

  const opacity = (scrollX as Animated.Value).interpolate({
    inputRange,
    outputRange: [0.7, 0, 0.7],
  });

  const scale = (scrollX as Animated.Value).interpolate({
    inputRange,
    outputRange: [0.8, 1, 0.8],
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={currentCardIndex !== index}
      onPress={() => navigation.navigate('DetailsScreen', hotel)}>
      <Animated.View
        style={{
          ...styles.card,
          ...styles.hotel,
          ...styles.boxShadow,
          transform: [{scale}],
        }}>
        <Animated.View style={{...styles.cardOverlay, opacity: opacity}} />
        <View style={styles.priceTag}>
          <Text style={{fontSize: 20, color: COLORS.white, fontWeight: 'bold'}}>
            $200
          </Text>
        </View>
        <Image source={hotel.image} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                {hotel.name}
              </Text>
              <Text style={{fontSize: 12, color: COLORS.grey}}>
                {hotel.location}
              </Text>
            </View>
            <IconBookmark height={26} width={26} fill={COLORS.primary} />
          </View>
          <View style={styles.reviews}>
            <View style={{flexDirection: 'row'}}>
              <IconStarSolid height={15} width={15} fill={COLORS.orange} />
              <IconStarSolid height={15} width={15} fill={COLORS.orange} />
              <IconStarSolid height={15} width={15} fill={COLORS.orange} />
              <IconStarSolid height={15} width={15} fill={COLORS.orange} />
              <IconStarSolid height={15} width={15} fill={COLORS.grey} />
            </View>
            <Text style={{fontSize: 10, color: COLORS.grey}}>356reviews</Text>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const TopHotelCard = ({hotel, index}: any) => {
  return (
    <View style={{...styles.card, ...styles.topHotel, ...styles.boxShadow}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          position: 'absolute',
          zIndex: 1,
          right: 6,
          top: 6,
        }}>
        <IconStarSolid fill={COLORS.orange} height={15} width={15} />
        <Text style={{color: COLORS.white, fontWeight: 'bold'}}>5.0</Text>
      </View>
      <Image
        source={hotel.image}
        style={{
          width: '100%',
          maxHeight: 100,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 12, fontWeight: 'bold'}}>{hotel.name}</Text>
        <Text style={{fontSize: 8, color: COLORS.grey}}>{hotel.location}</Text>
      </View>
    </View>
  );
};

const HomeScreen = ({navigation}: any) => {
  const categories = ['All', 'Popular', 'Top Rated', 'Featured', 'Luxury'];
  const [selectedCategory, setSelectedCategory] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={styles.header}>
        <View style={{marginBottom: 15}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            Find your hotel
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>in </Text>
            <Text
              style={{fontSize: 30, fontWeight: 'bold', color: COLORS.primary}}>
              Paris
            </Text>
          </View>
        </View>
        <IconPerson width={38} height={38} fill={COLORS.grey} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* search box */}
        <View style={styles.searchContainer}>
          <IconSearch style={{marginLeft: 15}} height={30} width={30} />
          <TextInput
            placeholder="search"
            style={{fontSize: 20, paddingLeft: 10}}
          />
        </View>

        {/* Categories nav */}
        <CategoryList
          categories={categories}
          currentCategory={selectedCategory}
          setSelectedCategory={(index: number) => setSelectedCategory(index)}
        />

        {/* card list */}
        <View>
          <Animated.FlatList
            horizontal
            data={hotels}
            snapToInterval={cardWidth}
            onMomentumScrollEnd={event => {
              setCurrentCardIndex(
                Math.round(event.nativeEvent.contentOffset.x / cardWidth),
              );
            }}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: true,
              },
            )}
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
              paddingRight: cardWidth / 2 - 40,
            }}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Card
                hotel={item}
                index={index}
                scrollX={scrollX}
                navigation={navigation}
                currentCardIndex={currentCardIndex}
              />
            )}
          />
        </View>

        {/* top hotels */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 20,
            }}>
            <Text style={{fontWeight: 'bold'}}>Top Hotel</Text>
            <TouchableOpacity>
              <View>
                <Text>Show all</Text>
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={hotels}
            horizontal
            contentContainerStyle={{
              paddingVertical: 30,
              paddingLeft: 20,
            }}
            renderItem={({item, index}) => <TopHotelCard hotel={item} index />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 15,
  },
  searchContainer: {
    backgroundColor: COLORS.light,
    height: 50,
    marginTop: 15,
    marginLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  categoryActive: {
    height: 3,
    backgroundColor: COLORS.primary,
    width: 30,
    marginTop: 2,
  },
  card: {
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  hotel: {
    height: 280,
    width: cardWidth,
    marginRight: 20,
  },
  topHotel: {
    height: 150,
    width: cardWidth / 1.6,
    marginRight: 20,
  },
  cardOverlay: {
    height: 280,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: COLORS.white,
    borderRadius: 15,
  },
  boxShadow: generateBoxShadow(2, 8, 15, '#171717', 8, 0.4),
  cardImage: {
    maxHeight: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    position: 'absolute',
    right: 0,
    width: 80,
    height: 60,
    backgroundColor: COLORS.primary,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardDetails: {
    height: 100,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 20,
  },
  reviews: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
