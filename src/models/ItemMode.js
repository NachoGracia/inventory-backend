const { getDbClient } = require("../db");

const getAllItems = async () => {
  const client = await getDbClient();

  try {
    const res = await client.query("SELECT * FROM items");

    return res.rows;
  } catch (error) {
    console.error("Error obteniendo items", error);
    throw error;
  } finally {
    client.release();
  }
};

const insertItem = async (item, description = item, quantity) => {
  const client = await getDbClient();

  try {
    const res = await client.query(
      "INSERT INTO items (item, description, stock_quantity) VALUES ($1,$2,$3) RETURNING *",
      [item, description, quantity]
    );

    return res.rows[0];
  } catch (error) {
    console.error("Error adding new item", error);
    throw error;
  } finally {
    client.release();
  }
};
module.exports = { getAllItems, insertItem };
