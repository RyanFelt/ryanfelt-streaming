const { docClient } = require('./dynamoSetup');
const { ServiceUnavailableError } = require('./errors');

const { TITLES_TABLE, EPISODES_TABLE, WATCHED_LAST_TABLE } = process.env;

exports.scanAllTitles = async () => {
  try {
    const params = {
      TableName: TITLES_TABLE,
      ReturnConsumedCapacity: 'TOTAL',
    };

    const titles = await docClient.scan(params).promise();

    if (titles.Items[0]) {
      return titles.Items;
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: scanAllTitles :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.queryAllEpisodes = async (title) => {
  try {
    const params = {
      TableName: EPISODES_TABLE,
      KeyConditionExpression: '#title = :title',
      ExpressionAttributeNames: {
        '#title': 'title',
      },
      ExpressionAttributeValues: {
        ':title': title,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };

    const episodes = await docClient.query(params).promise();

    if (episodes.Items[0]) {
      return episodes.Items;
    }
    return [];
  } catch (e) {
    console.log(`ERROR :: queryAllEpisodes: title - ${title} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.createWatchedLast = async (Item) => {
  try {
    const params = {
      TableName: WATCHED_LAST_TABLE,
      Item,
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: createWatchHistoryRecord: Item - ${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.queryAllWatchedLast = async (userId) => {
  try {
    const params = {
      TableName: WATCHED_LAST_TABLE,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        ':userId': userId,
      },
      ReturnConsumedCapacity: 'TOTAL',
    };

    const records = await docClient.query(params).promise();

    if (records.Items[0]) {
      return records.Items;
    }
    return [];
  } catch (e) {
    console.log(`ERROR :: queryAllWatchedLast: userId - ${userId} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

// const putItem = async (Item, table) => {
//   try {
//     const params = {
//       TableName: table,
//       Item,
//     };
//     return docClient.put(params).promise();
//   } catch (e) {
//     console.log(`ERROR :: putItem: Table = ${table} Item=${Item} :: ${e}`);
//   }
// };

exports.scanAllEpisodes = async () => {
  try {
    const params = {
      TableName: EPISODES_TABLE,
      ReturnConsumedCapacity: 'TOTAL',
    };

    const episodes = await docClient.scan(params).promise();

    if (episodes.Items[0]) {
      return episodes.Items;
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: scanAllEpisodes :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};
