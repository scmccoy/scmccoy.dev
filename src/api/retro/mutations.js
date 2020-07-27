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
    async removeCard(_, { cardId }) {
      console.log("Remove Statement: ", cardId);
      try {

        const deleteCard = await Cards.findOneAndDelete(
          {
            _id: cardId
          },
          {
            $unset: {
                _id: cardId,
            },
          }
        );
        return deleteCard;
      } catch (error) {
        console.error("removeCard error ", error);
      }
    },
  },
};
