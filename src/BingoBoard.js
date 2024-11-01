import React, { useEffect, useState } from 'react';

const BingoBoard = () => {
  const [boardData, setBoardData] = useState([[]]);

  // Load data from the JSON file
  useEffect(() => {
    fetch('/bingoData.json')
      .then((response) => response.json())
      .then((data) => setBoardData(data.squares));
  }, []);

  // Track the color state for each cell in a 2D array
  const [cellColors, setCellColors] = useState(
    Array(5).fill().map(() => Array(5).fill('white'))
  );

  // Track the content of the center cell
  // Used to make free space editable
  const [centerContent, setCenterContent] = useState('');  

  // Toggle cell color between red and white
  const toggleCellColor = (row, col) => {
    if (row === 2 && col === 2) return; // Skip the center cell
    const newColors = [...cellColors];
    newColors[row][col] = newColors[row][col] === 'white' ? 'red' : 'white';
    setCellColors(newColors);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <tbody>
          {boardData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => toggleCellColor(rowIndex, colIndex)}
                  style={{
                    border: '1px solid #333',
                    width: '60px',
                    height: '60px',
                    backgroundColor: cellColors[rowIndex][colIndex],
                    color: cellColors[rowIndex][colIndex] === 'white' ? 'black' : 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {/* Make center cell editable */}
                  {rowIndex === 2 && colIndex === 2 ? (
                    <input
                      type="text"
                      value={centerContent}
                      onChange={(e) => setCenterContent(e.target.value)}
                      style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        fontSize: '20px',
                        border: 'none',
                        outline: 'none',
                        backgroundColor: 'white',
                        color: 'black',
                      }}
                    />
                  ) : (
                    cell
                  )}
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
