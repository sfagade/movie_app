import React, { useState, useEffect } from 'react'

import SideMenu from '../components/sideMenu'
import Carousel from '../components/carousel'
import MovieList from '../components/movieList'

import { getCategories, getMovies } from '../actions'

const Home = (props) => {

    const { images, categories } = props;
    return (
        <div>
            <div className="home-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <SideMenu
                                categories={categories}
                                appName={"Movie DB"}
                            />
                        </div>
                        <div className="col-lg-9">
                            <Carousel images={images} />
                            <div className="row">
                                <MovieList movies={props.movies || []} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Home.getInitialProps = async () => {
    const movies = await getMovies();
    const images = movies.map((movie) => ({
        id: `image-${movie.id}`,
        url: movie.image,
        name: movie.name,
        cover: movie.cover
    }));

    const categories = await getCategories();

    return {
        movies,
        images,
        categories
    }
}

export default Home







