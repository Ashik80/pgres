### PGres

# Introduction

`Pgres` is just another ORM used for querying postgres databases. It is made to make the setup process very easy. This package depends on the package `pg-promise`.

NOTE: `pgres` can only be used to do CRUD operations on the database. It does not support any schema migration.

# Usage

Make a connection object as below:

```
import { DBConnection } from "@try-catch-80/pgres";

const connection = new DBConnection({
  host: 'localhost',
  port: 5432,
  user: '<your_username>',
  password: '<your_password>',
  database: '<your_dbname>'
});
```

Make models according to your database by extending the model class from `BaseModel`:

```
import { BaseModel } from "@try-catch-80/pgres";

export class YourModel extends BaseModel {
  constructor({
    name = '',
    emai = '',
    description = ''
  } = {}) {
    const data = {
      name,
      email,
      description
    };

    super({ table: 'users', data, connection }); // You have to call super() to pass the necessary data to BaseModel
    /*
    super takes 3 named parameters:
    table (The name of your db table),
    data (The model data),
    connection (The DBConnection object)
    */
  }
}
```

You have some methods out-of-the-box, such as:
`list`: gets all the data for a particular model
`findById`: gets data by primary key which should be spelled 'id' in the database. Takes parameter `(id)`
`save`: doesn't take any parameter. Saves data to the database after initialization
`update`: takes model object as parameter. updates the object
`delete`: takes model object as parameter. deletes the object
