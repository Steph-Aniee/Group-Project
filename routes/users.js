var express = require("express");
var router = express.Router();
const db = require("../model/helper");
var createError = require("http-errors");

//Now what's still missing is how to connect the favourites with the data that is being fetched via GET request from users. So we can easily display everything together.

/* GET all info from users / from the profiles table */
router.get("/", async function (req, res, next) {
  try {
    const result = await db(`SELECT first_name, preferences FROM profiles;`);
    res.send(result.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//need this to test /register
router.get("/all", async function (req, res, next) {
  try {
    const result = await db(`SELECT * FROM profiles;`);
    res.send(result.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* GET specific user/profile */
router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const results = await db(
      `SELECT first_name, preferences FROM profiles WHERE id = ${id};`
    );
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* POST new user/profile */
router.post("/", async function (req, res, next) {
  try {
    await db(
      `INSERT INTO profiles (first_name, last_name, email, password, preferences) VALUES ('${req.body.first_name}','${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.preferences}');`
    );

    const response = await db(`SELECT first_name, preferences FROM profiles;`);
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* DELETE users/profile */
router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    await db(`DELETE FROM profiles WHERE id = ${id};`);
    // Fetch the updated list/table
    const results = await db(`SELECT first_name, preferences FROM profiles;`);
    res.send(results.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* PUT users/profile */
router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    await db(
      `UPDATE profiles SET first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', email = '${req.body.email}', password = '${req.body.password}', preferences = '${req.body.preferences}', description = '${req.body.description}', cooking_skills = '${req.body.cooking_skills}' WHERE id = ${id};`
    );
    // Fetch the updated user/profile
    const response = await db(
      `SELECT first_name, preferences, cooking_skills, description FROM profiles;`
    );
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
