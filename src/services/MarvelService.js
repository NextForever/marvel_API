class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public/";
    _apiKey = "apikey=b25f963a99ce328edf5d4513166f0612";
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    getAllCharasters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=841&${this._apiKey}`);
        return res.data.results.map(this._transformCharaster);
    };

    getCharaster = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharaster(res.data.results[0]);
    };

    _transformCharaster = (char) => {
        return {
            id: char.id,
            name: char.name,
            decription: char.description.length > 190 ? char.description.substring(0, 190) + "..." : "No decription",
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
        };
    };
}

export default MarvelService;
