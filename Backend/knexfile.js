// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './Database/db.sqlite'
    },
    migrations:{
      directory: './Database/migrations'
    },
    useNullAsDefault: true
  },

  teste: {
    client: 'sqlite3',
    connection: {
      filename: './Database/test.sqlite'
    },
    migrations:{
      directory: './Database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'semana11',
      user:     'teste',
      password: 'teste'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
