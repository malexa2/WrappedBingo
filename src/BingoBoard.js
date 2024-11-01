import React, { useEffect, useState } from 'react';

const BingoBoard = () => {
  const [boardData, setBoardData] = useState([[]]);

  // Load data from the JSON file
  useEffect(() => {
    fetch('/bingoData.json')
      .then((response) => response.json())
      .then((data) => setBoardData(data.squares));
  }, []);

  // Update the content of a cell
  const handleCellChange = (e, row, col) => {
    const updatedBoard = [...boardData];
    updatedBoard[row][col] = e.target.value;
    setBoardData(updatedBoard);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <tbody>
          {boardData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #333', width: '60px', height: '60px' }}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                    style={{
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      fontSize: '20px',
                      border: 'none',
                      outline: 'none',
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoBoard;
