import { APIGatewayProxyHandler} from "aws-lambda";

import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userId } = event.pathParameters;

  const response = await document.query({
    TableName: "users_todos",
    KeyConditionExpression: "user_id = :user_id",
    ExpressionAttributeValues: {
      ":user_id": userId
    }
  })
  .promise();

  const userTodos = response.Items;

  if (userTodos) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        todos: userTodos,
      }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Nenhum todo encontrado!",
    }),
  };
}