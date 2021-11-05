const express = require('express');
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const PORT = process.env.PORT || 5000;
const client_folder = "./client-vue/dist";
const stateInfo = require("./stateInfo.json")
const stateNameArr = stateInfo.map(state => state.name)

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

  type Center {
    lat: Float
    lng: Float
  } 

  type Query {
    hello: String
    states(query: String): [String]
    centers(query: String): Center
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    centers: ({ query }) => {
        if (query) {
            let centerState = {}
            stateInfo.forEach((state) => {
                if (state.name.toLowerCase() === query.toLowerCase()) {
                    centerState = { lat: state.lat, lng: state.lng }
                }
            })
            return centerState
        }
    },
    states: ({ query }) => {
        if (!query) {
            return stateNameArr
        }
        return stateNameArr.filter((state) => state.toLowerCase().slice(0, query.length) === query.toLowerCase())
    }
};


app.use(cors());
app.use("/", express.static(client_folder));
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

const listener = app.listen(PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
});
