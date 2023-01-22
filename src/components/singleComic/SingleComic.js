import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import "./singleComic.scss";

const SingleComic = (props) => {
    const [comics, setComics] = useState(0);
    const [offset, setOffset] = useState(0);

    const { error, loading, getComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset) => {
        getComics(offset).then(onComicsLoaded);
    };

    const onComicsLoaded = (comics) => {
        setComics(comics);
    };

    return (
        <div className='single-comic'>
            <img src={comics.thumbnail} alt={comics.title} className='single-comic__img' />
            <div className='single-comic__info'>
                <h2 className='single-comic__name'>{comics.title}</h2>
                <p className='single-comic__descr'>{comics.description}</p>
                <p className='single-comic__descr'>{comics.pageCount}</p>
                <p className='single-comic__descr'>{comics.language}</p>
                <div className='single-comic__price'>{comics.price}</div>
            </div>
            <a href={comics.url} className='single-comic__back'>
                Back to all
            </a>
        </div>
    );
};

export default SingleComic;
