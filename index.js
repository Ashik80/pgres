const pgPromise = require('pg-promise');

export class DBConnection {
  constructor({host, port, user, password, database}) {
    const pgp = pgPromise();
    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;
    this.db = pgp(connectionString);
  }
}

export class BaseModel {
  constructor({ table, data, connection }) {
    this.connection = connection;

    this.table = table;
    this.data = data;
  }

  #getModelKeyValueString() {
    const keys = Object.keys(this.data);
    let keyString = '';
    let valueString = '';
    keys.map((key, index) => {
      if (keys[index + 1]) {
        keyString += key + ',';
        valueString +=  `'${this.data[key]}'` + ',';
        return null;
      }
      keyString += key;
      valueString +=  `'${this.data[key]}'`;
      return null;
    });
    return { keyString, valueString };
  }

  #getUpdateKeyValuePair(obj) {
    const keys = Object.keys(obj);
    let keyValue = '';
    keys.map((key, index) => {
      if (keys[index + 1]) {
        return keyValue += `${key}='${obj[key]}',`;
      }
      return keyValue += `${key}='${obj[key]}'`;
    });
    return keyValue;
  }

  list() {
    return this.connection.db.any(`SELECT * FROM ${this.table}`);
  }

  findById(id) {
    return this.connection.db.one(`SELECT * FROM ${this.table} WHERE id = ${id}`);
  }

  save() {
    const { keyString, valueString } = this.#getModelKeyValueString();
    return this.connection.db.none(`INSERT INTO ${this.table} (${keyString}) VALUES (${valueString})`);
  }

  update(updateObject) {
    const keyValue = this.#getUpdateKeyValuePair(updateObject);
    return this.connection.db.none(`UPDATE ${this.table} SET ${keyValue} WHERE id = ${updateObject.id}`);
  }

  delete(deleteObj) {
    return this.connection.db.none(`DELETE FROM ${this.table} WHERE id = ${deleteObj.id}`);
  }
}
