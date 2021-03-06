import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useDebouncedValue } from './../hooks/useDebouncedValue';
import { useEffect } from 'react';

interface Props {
    onDebounced: (value: string) => void;
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounced }: Props) => {

    const [textValue, setTextValue] = useState('');
    const debouncedValue = useDebouncedValue(textValue, 1500);

    useEffect(() => {
        onDebounced(debouncedValue);
    }, [debouncedValue])
    
    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
            <View style={styles.textBackground}>
                <TextInput
                    placeholder='Search Pokemon'
                    style={styles.textInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={40}
                    value={textValue}
                    onChangeText={ setTextValue }
                />
                <Icon
                    name='search-outline'
                    size={30}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16
    },
    textBackground: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    textInput: {
        flex: 1
    }
});