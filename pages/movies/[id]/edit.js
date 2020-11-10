import { Component } from 'react';
import MovieCreateForm from "../../../components/movieCreateForm";
import { getMovieById } from "../../../actions";


class EditMovie extends Component {

    static async getInitialProps({ query }) {
        const movie = await getMovieById(query.id);
        return { movie }
    }


    render() {
        const { movie } = this.props;
        return (
            <div className="container">
                <h1>Edit the movie</h1>
                <MovieCreateForm initialData={movie} />
            </div>
        )
    }
}

export default EditMovie;
