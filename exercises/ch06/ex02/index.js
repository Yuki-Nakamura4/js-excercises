const myPokemon = {
  name: "Pikachu",
  type: "Electric",
};

const myInheritedPokemon = Object.create(myPokemon);

console.log(Object.getPrototypeOf(myInheritedPokemon) === myPokemon);
// true

