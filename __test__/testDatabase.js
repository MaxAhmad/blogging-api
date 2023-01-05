
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');


jest.setTimeout(60000);

// List your collection names here
const COLLECTIONS = [];

class DBManager {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getUri();
    this.connection = await mongoose.connect(url, { useNewUrlParser: true });
    this.db = this.connection.db(await this.server.getDbName());
  }

  stop() {
    this.connection.close();
    return this.server.stop();
  }

  cleanup() {
    return Promise.all(COLLECTIONS.map(c => this.db.collection(c).remove({})));
  }
}

module.exports = DBManager;