import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../scripts/fetchPet";

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
  // console.log(results.data.pets);
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

export default Details;
