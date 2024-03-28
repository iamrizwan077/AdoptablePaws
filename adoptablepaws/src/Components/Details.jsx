import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../scripts/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";
import { LuLoader2 } from "react-icons/lu";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  //From React Query v5, only Object type is supported in useQuery params
  // earlier it was useQuery(["details", id], fetchPet);
  const results = useQuery({
    queryKey: ["details", id],
    queryFn: fetchPet,
  });
  if (results.isLoading) {
    return <LuLoader2 className="text-6xl fixed inset-1/2 animate-spin" />;
  }

  const pet = results.data.pets[0];

  return (
    <div className="flex flex-col lg:m-16 md:m-12 m-8">
      <div className="py-4 sm:py-6 text-lg sm:text-2xl italic">
        <Carousel images={pet.images} />
        <p className="pt-4 sm:pt-6">
          <span className="font-semibold">Name: </span>
          <span>{pet.name}</span>
        </p>
        <p>
          <span className="font-semibold">Animal: </span>
          <span>{pet.animal}</span>
        </p>
        <p>
          <span className="font-semibold">Breed: </span>
          <span>{pet.breed}</span>
        </p>
        <p>
          <span className="font-semibold">Description: </span>
          <span>{pet.description}</span>
        </p>
      </div>
      <button
        className="bg-gradient-to-r from-pink-500 to-pink-700 text-center hover:from-pink-700 hover:to-pink-900 text-white font-semibold py-2 sm:py-4 px-4 sm:px-8 text-sm sm:text-lg rounded-md shadow-md transition duration-300 ease-in-out sm:w-max self-center flex"
        onClick={(e) => setShowModal(true)}
      >
        Adopt {pet.name}
      </button>
      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h1 className="text-lg leading-6 font-medium text-gray-900">
                  Would you like to adopt {pet.name}?
                </h1>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-700 hover:to-pink-900 transition duration-300 ease-in-out text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
                    onClick={(e) => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={(e) => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* {showModal ? (
        <div>
          <h1>Would you like to adopt {pet.name}</h1>
          <button
            onClick={(e) => {
              setAdoptedPet(pet);
              navigate("/");
            }}
          >
            Yes
          </button>
          <button onClick={(e) => setShowModal(false)}>No</button>
        </div>
      ) : null} */}
    </div>
  );
};

const DetailsWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
};

export default DetailsWithErrorBoundary;
