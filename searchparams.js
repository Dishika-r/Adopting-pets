import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown.js";
import Results from "./Results";
import ThemeContext from "./ThemeContext.js";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDrop] = useDropdown("animal", "dog", ANIMALS);
  const [breed, BreedDrop, setBreed] = useDropdown("breed", "", breeds);
  const [pets, setPets] = useState([]);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStrings = apiBreeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  async function PetRequests() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });
    setPets(animals);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          PetRequests();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </label>
        <AnimalDrop />
        <BreedDrop />
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="Blue"> Blue </option>
            <option value="Peru"> Peru </option>
            <option value="Red"> Red </option>
            <option value="Black"> Black </option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}> Submit </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
export default SearchParams;
