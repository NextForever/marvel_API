import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import PropTypes from "prop-types";

import "./comicsList.scss";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(240);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { error, loading, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    };

    const onComicsListLoaded = (newComixList) => {
        let ended = false;
        if (newComixList.length < 8) {
            ended = true;
        }

        setComicsList((comicsList) => [...comicsList, ...newComixList]);

        setNewItemLoading((newItemLoading) => false);
        setOffset((offset) => offset + 8);
        setComicsEnded((charEnded) => ended);
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: "cover" };
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = { objectFit: "unset" };
            }

            return (
                <li className='comics__item' key={i} tabIndex={0}>
                    <a href={item.url}>
                        <img src={item.thumbnail} alt={item.title} className='comics__item-img' />
                        <div className='comics__item-name'>{item.title}</div>
                        <div className='comics__item-price'>{item.price}</div>
                    </a>
                </li>
            );
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className='comics__grid'>{items}</ul>;
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className='comics__list'>
            {errorMessage}
            {spinner}
            {items}
            <button
                className='button button__main button__long'
                disabled={newItemLoading}
                style={{ display: comicsEnded ? "none" : "block" }}
                onClick={() => onRequest(offset)}
            >
                <div className='inner'>load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
