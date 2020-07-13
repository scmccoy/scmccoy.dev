/* ### RETRO ### */
// POST / PUT
import Cards from "./cards";

export const retroMutations = {
  Mutation: {
    async addCard(_, { card }) {
      console.log("Add Statement: ", card);
      try {
        const newCard = await Cards.create({
          ...card,
        });
        return newCard;
      } catch (error) {
        console.error("addCard error ", error);
      }
    },
  },
};
