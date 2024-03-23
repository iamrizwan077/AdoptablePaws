/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Pet = ({animal, name, breed, images, location, id}) => {
    let hero = 'http://pets-images.dev-apis.com/pets/none.jpg';
    if (images.length) {
        hero = images[0];
    }

    return (
        <div>
            <Link to={`/details/${id}`} >
            <img src={hero} alt={name} />
            <h1>{name} - {animal} - {location}</h1>
            </Link>
        </div>
    )
}

export default Pet;