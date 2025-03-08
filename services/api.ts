export const tmdb_api_config = {
    base_url : 'https://api.themoviedb.org/3', 
    api_key : process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers : {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export async function fetch_movies (queries : IMovieSearchQueries) {
    try {
        const end_point = `${tmdb_api_config.base_url}/discover/movie?${object_to_search_queries(queries)}`;
        console.log('perfect endpoint', end_point);
        const response = await fetch(end_point, {
            method : "GET", 
            headers : tmdb_api_config.headers,
        });
        throw_error_if_not_ok(response, 'error fetching movies');
        const data = await response.json();
        return data.results;
    } catch (e) {
        console.error(e);
    }
}
// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';


function throw_error_if_not_ok(res : Response, message? : string) {
    if(!res.ok) throw new Error(message || 'Something went wrong' + ' => ' + res.statusText);
}

function object_to_search_queries (obj : any) {
    let result : string = '';
    if (typeof obj !== 'object') return '';
    Object.keys(obj).forEach((key, i) => {
        if(i === 0) result += `${key}=${obj[key] ? encodeURIComponent(obj[key]) : ''}`;
        else result += `&${key}=${obj[key] ? encodeURIComponent(obj[key]) : ''}`;
    });
    return result;
}

interface IMovieSearchQueries {
    query? : string, 
    sort_by? : TSortBy
}

const testing : Object  = {
    hello : 'hello'
}



export const sort_bys = {
    popularity_desc : 'popularity.desc'
} as const;

type TSortBy = (typeof sort_bys)[keyof typeof sort_bys];