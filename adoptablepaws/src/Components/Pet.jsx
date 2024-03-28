/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Pet = ({ animal, name, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <div className="border border-pink-700 border-2 rounded-lg px-4 sm:px-12">
      <Link to={`/details/${id}`}>
        <div className="flex flex-col sm:flex-row px-4 sm:px-8 py-4 items-center">
          <img
            src={hero}
            alt={name}
            className="border border-black border-2 block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0"
          />
          <div className="flex flex-col justify-center mt-4 sm:mt-0 sm:ml-4 sm:px-16">
            <p>
              <span className="font-semibold text-lg sm:text-3xl">
                {name} -
              </span>
              <span className="text-lg sm:text-2xl">{animal}</span>
            </p>
            <p className="text-sm sm:text-base">{breed}</p>
            <p className="text-sm sm:text-base">{location}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Pet;
