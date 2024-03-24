import fetchBreedList from './fetchBreedList';
import { useQuery } from '@tanstack/react-query';

export default function useBreedList(animal) {
    const results = useQuery({
        queryKey: ['breedList', animal],
        queryFn: fetchBreedList
    });
    return [results?.data?.breeds ?? [], results.status]

}