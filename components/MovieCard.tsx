import { icons } from "@/constants/icons"
import { Link } from "expo-router"
import { TouchableOpacity, Image, Text, View } from "react-native"

export default function MovieCard({ movie }: IPropsMovieCard) {
    return (
        <Link asChild href={`/movies/${movie.id}`}>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{movie.title}</Text>
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-xs text-white text-bold uppercase">{Math.round(movie.vote_average / 2)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">
                        {movie.release_date?.split('-')[0] || ''}
                    </Text>
                    {/* <Text className="text-xs font-medium text-light-300 uppercase">
                            Movie
                        </Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    )
}
interface IPropsMovieCard {
    movie: Movie
}