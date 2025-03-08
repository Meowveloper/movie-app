import { View, Image, TextInput } from "react-native";
import { icons } from '@/constants/icons';
export default function SearchBar({ handler, placeholder } : IProps) {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
            <TextInput
                onPress={handle_on_press}
                placeholder={ placeholder || 'Search' }
                value=""
                onChangeText={() => { }}
                placeholderTextColor="#a8b5db"
                className="flex-1 ml-2 text-white"
            />
        </View>
    )
    function handle_on_press() {
        if(handler) handler();
        else console.log('no handler props provided');
    }
}


interface IProps {
    handler? : () => void, 
    placeholder? : string
}