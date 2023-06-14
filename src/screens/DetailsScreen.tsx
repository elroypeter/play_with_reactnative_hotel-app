import React from 'react';
import {
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import COLORS from '../constants/colors';
import IconBookmark from '../assets/icons/bookmark.svg';
import IconArrowBack from '../assets/icons/arrow-back.svg';
import IconLocationOn from '../assets/icons/location-on-solid.svg';
import IconStarSolid from '../assets/icons/star-solid.svg';

const DetailsScreen = ({navigation, route}: any) => {
  const details = route.params;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: COLORS.white,
        paddingBottom: 20,
      }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={styles.headerImage} source={details.image}>
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <IconArrowBack
              fill={COLORS.white}
              height={26}
              width={26}
              fontWeight="bold"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconBookmark
              fill={COLORS.white}
              height={28}
              width={28}
              strokeWidth={40}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View>
        <View style={styles.locationIcon}>
          <IconLocationOn fill={COLORS.white} height={28} width={28} />
        </View>

        <View style={{marginHorizontal: 20, marginTop: 30}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>
            {details.name}
          </Text>
          <Text style={{fontSize: 14, color: COLORS.grey}}>
            {details.location}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            marginTop: 14,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', marginRight: 4}}>
              <IconStarSolid fill={COLORS.orange} height={18} width={18} />
              <IconStarSolid fill={COLORS.orange} height={18} width={18} />
              <IconStarSolid fill={COLORS.orange} height={18} width={18} />
              <IconStarSolid fill={COLORS.orange} height={18} width={18} />
              <IconStarSolid fill={COLORS.grey} height={18} width={18} />
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>4.0</Text>
          </View>
          <View>
            <Text style={{fontSize: 14, color: COLORS.grey}}>365reviews</Text>
          </View>
        </View>

        <View style={{marginHorizontal: 20, marginVertical: 30}}>
          <Text style={{color: COLORS.grey, lineHeight: 20}}>
            {details.details}
          </Text>
        </View>

        <View style={{...styles.pricing}}>
          <View style={{width: '50%', paddingLeft: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Price per night
            </Text>
          </View>
          <View style={{...styles.price, width: '50%'}}>
            <Text
              style={{fontSize: 16, color: COLORS.grey, fontWeight: 'bold'}}>
              ${details.price}{' '}
            </Text>
            <Text style={{fontSize: 12, color: COLORS.grey}}>+breakfast</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.btn}>
          <Text style={{color: COLORS.white, fontSize: 18, fontWeight: 'bold'}}>
            Book Now
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 60,
    alignItems: 'center',
  },

  locationIcon: {
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: COLORS.secondary,
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 25,
  },
});

export default DetailsScreen;
