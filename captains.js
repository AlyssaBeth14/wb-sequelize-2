import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './src/db.js';

const db = await connectToDB('postgresql:///captains');

class Ship extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Ship.init(
  {
    shipId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'ship',
    sequelize: db,
  },
);

class Captain extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Captain.init(
  {
    captainId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
    },
    skillLevel: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: 'captain',
    sequelize: db,
  },
);

// Define relationships
Ship.hasOne(Captain, {foreignKey: 'shipId'})
//create the getCaptain and setCaptain methods
Captain.belongsTo(Ship, {foreignKey: 'shipId'})
//create the getShip and setShip methods


// Create all tables (drop if already exist)
await db.sync({ force: true });

// Create objects and add to tables
const blackPearl = await Ship.create({name: 'Black Pearl', type: 'Pirate Ship'})

const jack = await Captain.create({name: 'Jack Sparrow', nationality: 'England', skillLevel: 10})


// Associate captains with ships
jack.setShip(blackPearl)
await jack.save()
//or
blackPearl.setCaptain(jack)
await blackPearl.save()


export { Captain, Ship };
