const { docClient } = require('./dynamoSetup');
const { ServiceUnavailableError } = require('./errors');

const { TITLES_TABLE, EPISODES_TABLE, WATCH_LATEST_TABLE } = process.env;

exports.scanAllTitles = async () => {
  try {
    const params = {
      TableName: TITLES_TABLE,
      ReturnConsumedCapacity: 'TOTAL'
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

exports.queryAllEpisodes = async title => {
  try {
    const params = {
      TableName: EPISODES_TABLE,
      KeyConditionExpression: '#title = :title',
      ExpressionAttributeNames: {
        '#title': 'title'
      },
      ExpressionAttributeValues: {
        ':title': title
      },
      ReturnConsumedCapacity: 'TOTAL'
    };

    const episodes = await docClient.query(params).promise();

    if (episodes.Items[0]) {
      return episodes.Items;
    }
    return false;
  } catch (e) {
    console.log(`ERROR :: queryAllEpisodes: title - ${title} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};

exports.createWatchHistoryRecord = async Item => {
  try {
    const params = {
      TableName: WATCH_LATEST_TABLE,
      Item
    };
    return docClient.put(params).promise();
  } catch (e) {
    console.log(`ERROR :: createWatchHistoryRecord: Item - ${Item} :: ${e}`);
    throw new ServiceUnavailableError('db unavailable');
  }
};
