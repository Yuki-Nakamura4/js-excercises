const myPokemon = {
  name: "Pikachu",
  type: "Electric",
};

const inheritedPokemon = Object.create(myPokemon);

console.log(Object.getPrototypeOf(inheritedPokemon) === myPokemon);
// true
