import { Component } from 'react';
import router from 'next/router';
import MovieCreateForm from "../../../components/movieCreateForm";
import { getMovieById, updateMovie } from "../../../actions";


class EditMovie extends Component {

    static async getInitialProps({ query }) {
        const movie = await getMovieById(query.id);
        return { movie }
    }

    handleCreateMovie = (movie) => {
        updateMovie(movie).then((updatedMovie) => {

            router.push(`/movies/${movie.id}`);
        })
    }


    render() {
        const { movie } = this.props;
        return (
            <div className="container">
                <h1>Edit the movie</h1>
                <MovieCreateForm
                    initialData={movie}
                    submitButton="Update"
                    handleFormSubmit={this.handleCreateMovie} />
            </div>
        )
    }
}

export default EditMovie;
