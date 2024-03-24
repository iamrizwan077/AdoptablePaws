import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../scripts/fetchPet";
import ErrorBoundary from "./ErrorBoundary";

const Details = () => {
  const { id } = useParams();
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
      <button>Adopt {pet.name}</button>
    </div>
  );
};

const DetailsWithErrorBoundary = () => {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsWithErrorBoundary;
