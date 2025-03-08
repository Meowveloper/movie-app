import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { routes } from "@/constants/routes";
import use_fetch from "@/services/use-fetch";
import { fetch_movies, sort_bys } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

export default function Search() {
    const router = useRouter();
    const [search_keyword, set_search_keyword] = useState<string>('');
    const movies_states = use_fetch(
        () => fetch_movies({ query: search_keyword, sort_by: sort_bys.popularity_desc }), false
    );

    useEffect(() => {
        console.log('check infinite loop from search page');
        const timeout = setTimeout(reload, 1000);
        return () => clearTimeout(timeout);
    }, [search_keyword])
    return (
        <View className="flex-1 bg-primary" >
            <Image className="absolute w-full z-0" source={images.bg} />
            <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }} >
                {movies_states.loading ? (
                    <ActivityIndicator size={'large'} color="#000ff" className="mt-10 self-center" />
                ) : !!movies_states.error ? (
                    <Text>{movies_states.error.message}</Text>
                ) : (
                    <View className="flex-1 mt-5" >
                        <FlatList
                            ListHeaderComponent={(
                                <>
                                    <View className="w-full flex-row justify-center mt-20 items-center">
                                        <Image source={icons.logo} className="w-12 h-10" />
                                    </View>
                                    <View className="my-5">
                                        <SearchBar value={search_keyword} on_change_text={(value: string) => set_search_keyword(value)} handler={() => { router.push(routes.search); }} placeholder="Search for a movie" />
                                    </View>
                                    {!movies_states.loading && !movies_states.error && search_keyword.trim() && movies_states.data?.length && (
                                        <Text className="text-xl text-white font-bold">
                                            Search results for {' '}
                                            <Text className=" text-accent">{search_keyword}</Text>
                                        </Text>
                                    )}
                                </>
                            )}
                            data={movies_states.data}
                            renderItem={({ item }) => (
                                <MovieCard movie={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: "flex-start",
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                            ListEmptyComponent={
                                !movies_states.loading && !movies_states.error && (
                                    <Text className="text-center text-gray-500">
                                        No movies found
                                    </Text>
                                )
                            }
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );

    async function reload() {
        if (search_keyword.trim()) {
            await movies_states.refetch();
        } else {
            await movies_states.refetch();
        }
    }
}
