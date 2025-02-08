import "dotenv/config";
import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename and __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT, DB_PORT } =
  process.env;

const sequelize = new Sequelize({
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

const modelFiles = fs
  .readdirSync(path.join(__dirname, "../models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );

for (const file of modelFiles) {
  // const model = await import(path.join(__dirname, "../models", file));
  const model = await import(
    `file://${path.join(__dirname, "../models", file)}`
  );

  modelDefiners.push(model.default); // Use .default because import() returns a module object
}

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize, Sequelize.DataTypes));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Phone,
  Business,
  Review,
  Cylinder,
  Product,
  Deliverer,
  Order,
  Token,
  Cart,
} = sequelize.models;

// Many-to-Many Relationship between User and Business through Review
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

Business.hasMany(Review, { foreignKey: "businessId" });
Review.belongsTo(Business, { foreignKey: "businessId" });

// 1-to-1 Relationship between User and Business
User.hasOne(Business, { foreignKey: "userId" });
Business.belongsTo(User, { foreignKey: "userId" });

// 1-to-1 Relationship between Business and Phone
Business.hasMany(Phone, { foreignKey: "businessId" });
Phone.belongsTo(Business, { foreignKey: "businessId" });

// 1-to-1 Relationship between Product and Cylinder
Cylinder.hasMany(Product, { foreignKey: "cylinderId" });
Product.belongsTo(Cylinder, { foreignKey: "cylinderId" });

// many-to-many relationship between Business and Product through an intermediate table
Business.belongsToMany(Product, { through: "business_product" });
Product.belongsToMany(Business, { through: "business_product" });

// 1-to-1 Relationship between Business and Deliverer
Business.hasMany(Deliverer, { foreignKey: "businessId" });
Deliverer.belongsTo(Business, { foreignKey: "businessId" });

// 1-to-1 Relationship between User and Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// 1-to-1 Relationship between Product and Order
Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

// 1-to-1 Relationship between Deliverer and Order
Deliverer.hasMany(Order, { foreignKey: "delivererId" });
Order.belongsTo(Deliverer, { foreignKey: "delivererId" });

// 1-to-1 Relationship between Business and Order
Business.hasMany(Order, { foreignKey: "businessId" });
Order.belongsTo(Business, { foreignKey: "businessId" });

// 1-to-1 Relationship between User and Token
User.hasMany(Token, { foreignKey: "userId" });
Token.belongsTo(User, { foreignKey: "userId" });

// 1-to-1 Relationship between User and Cart
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

// Many-to-Many Relationship between Cart and Product
Cart.belongsToMany(Product, { through: "cart_product" });
Product.belongsToMany(Cart, { through: "cart_product" });

const conn = sequelize;

export { User, Phone, Business, conn };
