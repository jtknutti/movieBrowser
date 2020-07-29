const API_KEY = 'ff466ed81121dd22e5e90116f148ee34';
const GENRE_LIST_URL =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=ff466ed81121dd22e5e90116f148ee34&language=en-US';
const URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
export default class MovieService {
  static async search(query, type = 'movie', pageNum = 1) {
    const result = await fetch(
      `${URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=${pageNum}&include_adult=false`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (result.status === 404) throw new Error('Page not found');
    const resultJson = await result.json();
    return resultJson.results;
  }

  static async getGenreList() {
    let response = await fetch(GENRE_LIST_URL, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    });
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();

    return responseJson.genres;
  }

  static async browseGenre(id, pageNum = 1) {
    let response = await fetch(
      `${URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}&with_genres=${id}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();
    return responseJson.results;
  }

  static async getMovie(id) {
    let response = await fetch(
      `${URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();
    return responseJson;
  }
  static async getPerson(id) {
    let response = await fetch(
      `${URL}/person/${id}?api_key=${API_KEY}&language=en-US`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();
    return responseJson;
  }
  static async getCredits(id) {
    let response = await fetch(
      `${URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();
    return responseJson.cast;
  }
  static async getCast(id) {
    let response = await fetch(
      `${URL}/movie/${id}/credits?api_key=${API_KEY}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      },
    );
    if (response.status === 404) throw new Error('Page not found');
    let responseJson = await response.json();
    return responseJson.cast;
  }

  static getImage(url) {
    if (url == null)
      return 'https://haes.ca/wp-content/plugins/everest-timeline/images/no-image-available.png';
    return `${IMAGE_URL}${url}`;
  }
}
