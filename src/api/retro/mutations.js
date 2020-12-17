/* ### RETRO ### */
// POST / PUT
import { forEachField } from 'apollo-server-micro';
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
    // REMOVE CARDS
    // async removeCards(_, {}) {
    //   try {
    //     const deleteCards = await Cards.deleteMany({
    //       category: /upside/,
    //     });
    //     return deleteCards;
    //   } catch (error) {
    //     console.error('removeCards error ', error);
    //   }
    // },
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
    // Vote Up Tally
    async voteUp(_, { cardId, voteTallyUp }) {
      try {
        const votedUp = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            voteTallyUp: voteTallyUp + 1,
          }
        );
        return votedUp;
      } catch (error) {
        console.error('votedUp Error', error);
      }
    },
    // Vote Down Tally
    async voteDown(_, { cardId, voteTallyDown }) {
      try {
        const votedDown = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            voteTallyDown: voteTallyDown + 1,
          }
        );
        return votedDown;
      } catch (error) {
        console.error('votedDown Error', error);
      }
    },
  },
};
