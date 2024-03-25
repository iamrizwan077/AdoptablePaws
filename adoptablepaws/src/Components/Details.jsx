import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../scripts/fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

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
          <button>Yes</button>
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
