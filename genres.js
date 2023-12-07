import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './src/db.js';

const db = await connectToDB('postgresql:///genres');

class Book extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Book.init(
  {
    bookId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'book',
    sequelize: db,
  },
);

class Genre extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Genre.init(
  {
    genreId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'genre',
    sequelize: db,
  },
);



// Define many-to-many relationship

// Create tables (drop if they already exist)
await db.sync({ force: true });

// Create some data


export { Book, Genre };
