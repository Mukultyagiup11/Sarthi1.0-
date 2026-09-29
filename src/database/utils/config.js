import dotenv from 'dotenv'; 
dotenv.config();

const config = {
    local:{
        reader:{
            host:process.env.LOCAL_DB_READER_HOST,
            user:process.env.LOCAL_DB_USER,
            password:process.env.LOCAL_DB_PASSWORD,
            database:process.env.LOCAL_DB_NAME,
            port:process.env.LOCAL_DB_PORT,
        },
        writer: {
            host: process.env.LOCAL_DB_WRITER_HOST,
            user: process.env.LOCAL_DB_USER,
            password: process.env.LOCAL_DB_PASSWORD,
            database: process.env.LOCAL_DB_NAME,
            port: process.env.LOCAL_DB_PORT,
    }
    },
    uat: {
        reader: {
            host: process.env.UAT_DB_READER_HOST,
            user: process.env.UAT_DB_USER,
            password: process.env.UAT_DB_PASSWORD,
            database: process.env.UAT_DB_NAME,
            port: process.env.UAT_DB_PORT,
    },
        writer: {
           host: process.env.UAT_DB_WRITER_HOST,
           user: process.env.UAT_DB_USER,
           password: process.env.UAT_DB_PASSWORD,
           database: process.env.UAT_DB_NAME,
           port: process.env.UAT_DB_PORT,
    },
  },
  prod: {
    reader: {
      host: process.env.PROD_DB_READER_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      port: process.env.PROD_DB_PORT,
    },
    writer: {
      host: process.env.PROD_DB_WRITER_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      port: process.env.PROD_DB_PORT,
    },
  }
}

export default config;