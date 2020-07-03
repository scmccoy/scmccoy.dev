import Habits from "./habits";

export const habitsMutations = {
  Mutation: {
    async addHabit(_, { habit }) {
      // console.log("Add Habit: ", habit);
      try {
        const newHabit = await Habits.create({
          ...habit,
        });
        return newHabit;
      } catch (error) {
        console.error("Error! ", error);
      }
    },
    async addEvent(_, { habitId, date }) {
      try {
        date.setHours(0, 0, 0, 0);
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId,
            'events.date': {
              $ne: date,
            },
          },
          {
            $addToSet: {
              events: {
                date,
              },
            },
          }
        );
        return habit;
      } catch (error) {
        console.error("addEvent Error", error);
      }
    },
    async removeEvent(_, { habitId, eventId }) {
      try {
        const habit = await Habits.findOneAndUpdate(
          {
            _id: habitId
          },
          {
            $pull: {
              events: {
                _id: eventId,
              },
            },
          }
        );
        return habit;
      } catch (error) {
        console.error("removeEvent Error", error);
      }
    },
  },
};
