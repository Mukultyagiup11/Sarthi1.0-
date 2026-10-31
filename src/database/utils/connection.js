import mysql from 'mysql2/promise';
import config from './config.js';

class Connection{
    constructor(){
        this.readerPools={};
        this.writerPools={};
    }
    
    getReaderConnection(type){
        if(!config[type]){
            throw new Error(`Unknown environment type:${type}`);
        }
        if(!this.readerPools[type]){
            this.readerPools[type] =  mysql.createPool({
                ...config[type].reader,
                waitForConnections:true,
                connectionLimit:10,
                queueLimit:100

            });
        }
        return this.readerPools[type];
    }
    getWriterConnection(type) {
    if (!config[type]) {
      throw new Error(`Unknown environment type: ${type}`);
    }
    if (!this.writerPools[type]) {
      this.writerPools[type] = mysql.createPool({
        ...config[type].writer,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 100,
      });
    }
    return this.writerPools[type];
  }
}

const connection = new Connection();
export default connection;