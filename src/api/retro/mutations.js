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
    // Vote Happy Tally
    async voteHappy(_, { cardId, voteHappyTally }) {
      try {
        const votedHappy = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            voteHappyTally: voteHappyTally + 1
          }
        );
        return votedHappy;
      } catch (error) {
        console.error('votedHappy Error', error);
      }
    },
    // Vote Happy Tally
    async voteSad(_, { cardId, voteSadTally }) {
      try {
        const votedSad = await Cards.findOneAndUpdate(
          {
            _id: cardId,
          },
          {
            voteSadTally: voteSadTally + 1
          }
        );
        return votedSad;
      } catch (error) {
        console.error('votedSad Error', error);
      }
    },
  },
};
