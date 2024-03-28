const fetchBreedList = async ({queryKey}) => {
    const animal = queryKey[1];

    const res = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);
    if (!res.ok) {
        throw new Error(`An error occurred while fetching the breed of animal ${animal}.`);
    }
    return res.json();
}

export default fetchBreedList;