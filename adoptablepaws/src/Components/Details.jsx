import { useParams } from "react-router-dom";

const Details = () => {
    const { id } = useParams();

  return <div>Details page for {id}</div>;
};

export default Details;
