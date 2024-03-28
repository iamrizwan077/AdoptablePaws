import { useState, useContext } from "react";
import useBreedList from "../scripts/useBreedList";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "../scripts/fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
import { LuLoader2 } from "react-icons/lu";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext); // Getting only first value from the array

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });
  if (results.isLoading) {
    return (
      <LuLoader2 className="text-6xl fixed inset-1/2 animate-spin" />
    );
  }

  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-4 sm:my-16 flex flex-col md:flex-row items-start mx-4 md:mx-24 gap-4 md:gap-12">
      <form
        className="flex flex-col rounded-lg text-left bg-gray-200 justify-center items-left max-w-2xl mx-auto px-4 sm:px-16 py-4 sm:py-6 w-full sm:w-2/5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          };
          console.log(obj);
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="text-lg sm:text-xl">
            <div className="flex flex-col items-center">
              <img
                src={adoptedPet.images[0]}
                alt={adoptedPet.name}
                className="border border-black border-2 rounded-full h-24 sm:flex-shrink-0"
              />
              <h2 className="text-center font-semibold">
                Congratulations! You have adopted {adoptedPet.name}.
              </h2>
            </div>
          </div>
        ) : null}
        <h2 className="font-semibold text-center text-2xl sm:text-4xl pt-4 pb-3">
          Search Pet
        </h2>
        <label
          htmlFor="location"
          className="font-semibold text-md sm:text-lg my-3 sm:my-5 flex flex-col"
        >
          Location
          <input
            className="px-3 py-1.5 rounded"
            type="text"
            name="location"
            id="location"
          />
        </label>
        <label
          htmlFor="animal"
          className="font-semibold text-md sm:text-lg flex flex-col mb-3 sm:mb-5"
        >
          Animal
          <select
            className="py-2 bg-white rounded px-3"
            name="animal"
            id="animal"
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            {ANIMALS.map((animal) => (
              <option className="text-center" key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="breed"
          className="font-semibold text-md sm:text-lg flex flex-col mb-3 sm:mb-5"
        >
          Breed
          <select
            className="py-2 bg-white rounded px-3"
            name="breed"
            id="breed"
            disabled={breeds.length === 0}
          >
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-700 hover:to-pink-900 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
      {<Results pets={pets} />}
    </div>
  );
};

export default SearchParams;
