import { v4 as uuidV4 } from 'uuid';
import dayjs from 'dayjs';

import { document } from "../utils/dynamodbClient";

export const handle = async (event) => {
  const { userId } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body);

  await document
  .put({
    TableName: "users_todos",
    Item: {
      id: uuidV4(),
      user_id: userId,
      title,
      done: false,
      deadline: dayjs(deadline).format("DD/MM/YYYY"),
    },
  })
  .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
        message: "Todo created!",
    }),
    headers: {
        "Content-Type": "application/json",
    }
  }
}
