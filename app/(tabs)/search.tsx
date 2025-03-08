import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";
import use_fetch from "@/services/use-fetch";
import { fetch_movies, sort_bys } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";

export default function Search() {
    const router = useRouter();
    const movies_states = use_fetch(
        () => fetch_movies({ query : '', sort_by : sort_bys.popularity_desc }) 
    )
    return (
        <View className="flex-1 bg-primary" >
            <Image className="absolute w-full z-0" source={images.bg} />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }} >
                {/* <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" /> */}
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
                                <MovieCard movie={item} />
                            )}
                            keyExtractor={ ( item ) => item.id }
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent : "flex-start", 
                                gap : 20, 
                                paddingRight : 5, 
                                marginBottom : 10
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={ false }
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
