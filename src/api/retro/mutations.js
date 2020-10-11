/* ### RETRO ### */
// POST / PUT
import Cards from './cards';

export const retroMutations = {
  Mutation: {
    async addCard(_, { card }) {
      try {
        const newCard = await Cards.create({
          ...card,
        });
        return newCard;
      } catch (error) {
        console.error('addCard error ', error);
      }
    },
    // REMOVE CARD
    async removeCard(_, { cardId }) {
      try {
        const deleteCard = await Cards.findOneAndDelete(
          {
            _id: cardId,
          },
          {
            $unset: {
              _id: cardId,
            },
          }
        );
        return deleteCard;
      } catch (error) {
        console.error('removeCard error ', error);
      }
    },
    // ADD action to array
    async addAction(_, { cardId, action }) {
      try {
        const addedAction = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            $addToSet: {
              actionItems: action,
            },
          }
        );
        return addedAction;
      } catch (error) {
        console.error('addAction Error', error);
      }
    },
    // Remove action from array
    async removeAction(_, { cardId, action }) {
      try {
        const removedAction = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            $pull: {
              actionItems: action,
            },
          }
        );
        return removedAction;
      } catch (error) {
        console.error('removeAction Error', error);
      }
    },
  },
};
