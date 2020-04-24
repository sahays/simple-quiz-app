import { API, graphqlOperation } from "aws-amplify";

const mutation = async (mutationFn, input) => {
  const apiResponse = await API.graphql(
    graphqlOperation(mutationFn, {
      input: input,
    })
  );
  console.log(apiResponse);
  return apiResponse;
};

const query = async (queryFn, input) => {
  const result = await API.graphql(graphqlOperation(queryFn, input));
  console.log(result);
  return result;
};

const filter = async (queryFn, input, limit = 500) => {
  const result = await API.graphql(
    graphqlOperation(queryFn, {
      filter: input,
      limit: limit,
    })
  );
  console.log(result);
  return result;
};

const listAll = async (listFn, limit = 500) => {
  const result = await API.graphql(
    graphqlOperation(listFn, {
      limit: limit,
    })
  );
  console.log(result);
  return result;
};

const GraphQlUtil = () => {
  return {
    mutation,
    query,
    filter,
    listAll,
  };
};

export default GraphQlUtil;
