
import mysql from 'mysql2/promise';
import config from './config.js';

class Connection {

    async getReaderConnection(type) {
        if (!config[type]) {
            throw new Error(`Unknown environment type: ${type}`);
        }

        return await mysql.createConnection(config[type].reader);
    }

    async getWriterConnection(type) {
        if (!config[type]) {
            throw new Error(`Unknown environment type: ${type}`);
        }

        return await mysql.createConnection(config[type].writer);
    }
}

const connection = new Connection();

export default connection;
