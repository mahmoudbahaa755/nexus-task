const API_KEY = "1e4c919";
const BASE_URL = "http://www.omdbapi.com/";
// http://www.omdbapi.com/?i=tt3896198&apikey=8546f8ac
interface Filters {
  type: string;
  year: string;
  genre: string;
}

export const getMovies = async (
  query?: string,
  filters?: Filters
): Promise<any> => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}${query ? `&s=${query}` : ""}`;

    if (filters?.type) {
      url += `&type=${filters.type}`;
    }

    if (filters?.year) {
      // Handle year ranges
      if (filters.year.includes("-")) {
        const [startYear] = filters.year.split("-");
        url += `&y=${startYear}`;
      } else {
        url += `&y=${filters.year}`;
      }
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(response, "sadasdasdasd2");
    console.log(data, "sadasdasdasd");
    if (data.Response === "False") {
      throw new Error(data.Error || "No movies found");
    }

    return data;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (imdbID: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}?i=${imdbID}&apikey=${API_KEY}`);
    const data = await response.json();
    console.log(response, "getMovieDetails2");
    console.log(data, "getMovieDetails");

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
