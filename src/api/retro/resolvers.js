/* ### RETRO ### */
// GET
import Cards from "./cards";

export const retroResolvers = {
  Query: {
    async cards() {
      try {
        const cards = await Cards.find();
        // console.log("Get Statements: ", cards);
        return cards;

      } catch (error) {
        console.error("Error in resolver: ", error)
      }
      // return [{
      //     _id: 23,
      //     statement: 'test query',
      //     category: 'duh'
      // }]
    },
  },
};