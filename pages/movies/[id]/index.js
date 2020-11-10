import { useRouter } from "next/router";
import { deleteMovie, getMovieById } from "../../../actions";
import { router } from "next/client";


const Movie = (props) => {

    const { id } = useRouter().query
    const { movie } = props;

    const handleDelete = () => {
        deleteMovie(id).then(() => {
            router.push("/");
        })
    }

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">{movie.name}</h1>
                <p className="lead">{movie.description}</p>
                <hr className="my-4" />
                <p>{movie.genre}</p>
                <a className="btn btn-primary btn-lg mr-1" href="#" role="button">Learn more</a>
                <a onClick={() => router.push(`/movies/${id}/edit`)} className="btn btn-warning btn-lg mr-1" href="#" role="button">Edit</a>
                <a onClick={() => handleDelete(id)} className="btn btn-danger btn-lg" href="#" role="button">Delete</a>
            </div>
            <p className="desc-text">{movie.longDesc}</p>
            <style jsx>
                {`
                    .desc-text {
                        font-size: 20px;
                    }
                `}
            </style>
        </div>
    )
}

Movie.getInitialProps = async ({ query }) => {
    const movie = await getMovieById(query.id);

    return { movie }
}

export default Movie;
