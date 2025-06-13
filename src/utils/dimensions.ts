import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const baseWidth = 375;
const baseHeight = 812;

export const wp = (widthPercent: number) => {
    const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH * elemWidth / 100);
};

export const hp = (heightPercent: number) => {
    const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel(SCREEN_HEIGHT * elemHeight / 100);
};

export const normalize = (size: number) => {
    const scale = SCREEN_WIDTH / baseWidth;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
