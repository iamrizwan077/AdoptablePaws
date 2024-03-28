/* eslint-disable react/prop-types */
import Pet from "./Pet";

const Results = ({ pets }) => {
  // console.log(pets)
  return (
    <div className="w-full lg:w-3/5">
      {!pets.length ? (
        <h2 className="lg:py-16 text-xl sm:text-3xl py-6 md:py-12 flex justify-center border border-pink-700 font-semibold rounded border-2">
          No Pets Found :(
        </h2>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
