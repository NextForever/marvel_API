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

    getAllCharasters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=841&${this._apiKey}`);
    };

    getCharasters = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    };
}

export default MarvelService;
