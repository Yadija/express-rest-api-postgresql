import { nanoid } from 'nanoid';
import pkg from 'pg';

// exceptions
import AuthorizationError from '../exceptions/AuthorizationError.js';
import InvariantError from '../exceptions/InvariantError.js';
import NotFoundError from '../exceptions/NotFoundError.js';

// utils
import { mapDBToModel } from '../utils/index.js';

const { Pool } = pkg;

class ThreadsService {
  constructor() {
    this._pool = new Pool();
  }

  async addthread(content, owner) {
    const id = `thread-${nanoid(15)}`;

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO threads VALUES ($1, $2, $3, $4, $5) RETURNING id',
      values: [id, content, owner, createdAt, updatedAt],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvariantError('thread added failed');
    }

    return rows[0].id;
  }

  async getAllThreads() {
    const { rows } = await this._pool.query('SELECT id, content, owner FROM threads');
    return rows;
  }

  async getThreadById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('cannot find thread');
    }

    return rows.map(mapDBToModel)[0];
  }

  async editThreadById(id, content) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE threads SET content = $2, updated_at = $3 WHERE id = $1',
      values: [id, content, updatedAt],
    };

    await this._pool.query(query);
  }

  async deleteThreadById(id) {
    const query = {
      text: 'DELETE FROM threads WHERE id = $1',
      values: [id],
    };

    await this._pool.query(query);
  }

  async checkThreadIsExist(id) {
    const query = {
      text: 'SELECT owner FROM threads WHERE id = $1',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('cannot find thread');
    }

    return rows[0];
  }

  async verifyThreadOwner(id, owner) {
    const thread = await this.checkThreadIsExist(id);

    if (thread.owner !== owner) {
      throw new AuthorizationError('you are not entitled to access this resource');
    }
  }
}

export default ThreadsService;
