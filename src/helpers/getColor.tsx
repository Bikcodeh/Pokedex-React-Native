import ImageColors from 'react-native-image-colors';

export const getImageColor = async (uri: string) => {
    const colors = await ImageColors.getColors(uri, {
        fallback: 'grey'
    })

    let primary;

    switch (colors.platform) {
        case 'android':
            primary = colors.dominant;
            break;
        case 'ios':
            primary = colors.background;
            break;
        default:
            throw new Error("Unexpected platform Key")
    }

    return primary
}