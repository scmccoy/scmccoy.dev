// Quick guide to common graphiql queries/mutations

// Query Cards
// query {
//   cards {
//     statement
//     category
//     actionItems 
//   }
// }

// Add Card mutation
// mutation {
//   addCard(card: {
//     statement: "hello"
//     category: "upside"
//   }) { 
//     category
//     statement
//     actionItems
//   }
// }

// REMOVE CARD
// mutation {
//   removeCard(cardId: "5f7a4baf5bd36e0a235de36a") { 
//     _id
//     statement
//     category
//     actionItems
//   }
// }

// ADD ACTION ITEM
// mutation {
//   addAction(cardId: "5f7a659cb5791313b13da774", action: "do something535") {
//     statement
//     category
//     actionItems
//   }
// }





















