import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './src/db.js';

const db = await connectToDB('postgresql:///comments');

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);

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

class Comment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: 'comment',
    sequelize: db,
  },
);

// Define relationships


// Create tables (drop if they already exist)
await db.sync({ force: true });

// Create some data
const jane = await User.create({ email: 'jane@jhacks.com' });
const fred = await User.create({ email: 'fred@mail.com' });

const hamlet = await Book.create({ title: 'Hamlet' });



export { Book, Comment, User };
