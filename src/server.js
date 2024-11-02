const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'bingo_data_user',
  host: 'dpg-csinftogph6c73a8mmb0-a',
  database: 'bingo_data',
  password: 'bVdn5Ob9DKEj3V2iEFvvCbUBxbTSDtnD',
  port: 5432,
});

// Endpoint to save the board data
app.post('/api/saveBoard', async (req, res) => {
  const { name, board, selectedCells } = req.body;

  try {
    const createBoards = `
    CREATE TABLE bingo_boards (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      board JSON NOT NULL,
      selected_cells JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    const cre = await pool.query(queryText);
    const queryText = `
      INSERT INTO bingo_boards (name, board, selected_cells)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [name, JSON.stringify(board), JSON.stringify(selectedCells)];
    const result = await pool.query(queryText, values);
    res.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error("Error saving board:", error);
    res.json({ success: false, error });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
