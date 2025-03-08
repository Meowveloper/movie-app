import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";
import use_fetch from "@/services/use-fetch";
import { fetch_movies, sort_bys } from "@/services/api";

export default function Index() {
    const router = useRouter();
    const movies_states = use_fetch(
        () => fetch_movies({ query : '', sort_by : sort_bys.popularity_desc }) 
    )
    console.log(movies_states.data);
    return (
        <View className="flex-1 bg-primary" >
            <Image className="absolute w-full z-0" source={images.bg} />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }} >
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                { movies_states.loading ? (
                    <ActivityIndicator size={'large'} color="#000ff" className="mt-10 self-center" />
                ) : !!movies_states.error ? (
                    <Text>{movies_states.error.message}</Text>
                ) : (
                    <View className="flex-1 mt-5" >
                        <SearchBar handler={() => { router.push(routes.search); }} placeholder="Search for a movie" />
                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>
                        <FlatList
                            data={movies_states.data}
                            renderItem={({ item }) => (
                                <Text className="text-white">{ item.title }</Text>
                            )}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}


function SearchBar({ handler, placeholder } : IProps) {
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
