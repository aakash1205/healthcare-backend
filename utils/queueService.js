const dotenv = require('dotenv');
dotenv.config();

const { QueueServiceClient } = require("@azure/storage-queue");
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!connectionString) {
  throw new Error('Azure Storage connection string is not defined');
}

const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);
const queueClient = queueServiceClient.getQueueClient("appointment-notifications");

const addToQueue = async (message) => {
  try {
    console.log('Adding message to queue:', message);
    const encodedMessage = Buffer.from(JSON.stringify(message)).toString('base64');
    await queueClient.sendMessage(encodedMessage);
    console.log('Message added successfully to queue');
  } catch (error) {
    console.error('Error adding to queue:', error);
  }
};

module.exports = { addToQueue }; 
