const { nanoid } = require('nanoid');
const StoreThread = require('../entities/StoreThread');

class StoreThreadFactory {
  constructor({ title, body, owner }) {
    this.id = `thread-${nanoid(16)}`;
    this.title = title;
    this.body = body;
    this.owner = owner;
  }

  build() {
    return new StoreThread(this);
  }
}

module.exports = StoreThreadFactory;
