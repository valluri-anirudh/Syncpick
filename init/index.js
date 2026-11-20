// Seed script: run with `node init/index.js`
if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");
const User = require("../models/user.js");

const db_url = process.env.ATLAS_DB_URL || "mongodb://127.0.0.1:27017/Syncpick";

const initDb = async () => {
  await mongoose.connect(db_url);
  console.log("Connected");

  // Reuse a demo owner (password: demo1234) so the seeded listings have a valid owner.
  let owner = await User.findOne({ username: "demo" });
  if (!owner) {
    owner = await User.register(
      new User({ username: "demo", email: "demo@syncpick.test" }),
      "demo1234"
    );
  }

  await listing.deleteMany({});
  const docs = initData.data.map((obj) => ({ ...obj, owner: owner._id }));
  await listing.insertMany(docs);
  console.log(`${docs.length} listings inserted`);
  await mongoose.connection.close();
};

initDb().catch((err) => {
  console.log(err);
  process.exit(1);
});
