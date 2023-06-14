import {Platform} from 'react-native';

export const generateBoxShadow = (
  xOffset: number,
  yOffset: number,
  elevation: number,
  shadowColor: string,
  shadowRadius: number,
  shadowOpacity: number,
) => {
  if (Platform.OS === 'android') {
    return {
      elevation,
      shadowColor,
    };
  } else {
    return {
      shadowColor,
      shadowOpacity,
      shadowRadius,
      shadowOffset: {
        width: xOffset,
        height: yOffset,
      },
    };
  }
};
