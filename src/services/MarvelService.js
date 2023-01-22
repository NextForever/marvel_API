import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=b25f963a99ce328edf5d4513166f0612";
    const _baseOffset = 140;
    const _baseOffsetComics = 16;

    const getAllCharacters = async (offset = _baseOffset) => {
        // const randomId = Math.floor(Math.random() * 800 + 10);
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharaster);
    };

    const getAllComics = async (offset = _baseOffsetComics) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharaster(res.data.results[0]);
    };

    const getComics = async (id) => {
        const randomId = Math.floor(Math.random() * 300 - 100);
        const res = await request(`${_apiBase}comics/${randomId}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices.price ? comics.prices.price : "NOT AVAILABLE",
            url: comics.urls[0].url,
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
            description: comics.description || "There is no description",
            language: comics.textObjects[0]?.language || "en-us",
        };
    };

    const _transformCharaster = (char) => {
        return {
            id: char.id,
            name: char.name,
            comics: char.comics.items,
            decription: char.description.length > 130 ? char.description.substring(0, 190) + "..." : "No decription",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };
    return { loading, error, clearError, getCharacter, getAllCharacters, getAllComics, getComics };
};

export default useMarvelService;
