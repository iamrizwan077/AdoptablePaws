import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../scripts/fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetContext";

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
    return <h1>Loading...</h1>;
  }

  const pet = results.data.pets[0];

  return (
    <div>
      <div>
        {pet.name} - {pet.animal} - {pet.description}
      </div>
      <button onClick={(e) => setShowModal(true)}>Adopt {pet.name}</button>
      {showModal ? (
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
      ) : null}
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
