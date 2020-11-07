import Modal from "./modal";
import MovieCreateForm from './movieCreateForm'
import { createMovie } from '../actions';


const SideMenu = (props) => {

    const { categories } = props;
    let modal = null;

    const handleCreateMovie = (movie) => {
        createMovie(movie).then((movies) => {
            console.log(JSON.stringify(movies));
            modal.closeModal();
        })
    }

    return (
        <div>
            <Modal ref={elem => modal = elem} hasSubmit={false}>
                <MovieCreateForm handleFormSubmit={handleCreateMovie} />
            </Modal>
            <h1 className="my-4">{props.appName}</h1>
            <div className="list-group">
                {
                    categories.map((category) => (
                        <a href="#" className="list-group-item" key={category.id}>{category.name}</a>
                    ))
                }
            </div>

        </div>
    )
}

export default SideMenu;