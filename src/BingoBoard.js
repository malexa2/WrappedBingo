import React, { useEffect, useState } from 'react';

const BingoBoard = () => {
  const [boardData, setBoardData] = useState([[]]);
  const [selectedCells, setSelectedCells] = useState({}); // Tracks selected cells
  const [isCenterLocked, setIsCenterLocked] = useState(false); // Locks center cell editing

  // Center coords cuz I use them
  const CENTER_POSITION = { row: 2, col: 2 };

  // Load data from the JSON file
  useEffect(() => {
    fetch('/bingoData.json')
      .then((response) => response.json())
      .then((data) => setBoardData(data.squares));
  }, []);

  // Handle content change for the center cell only
  const handleCenterChange = (e) => {
    const updatedBoard = [...boardData];
    updatedBoard[CENTER_POSITION.row][CENTER_POSITION.col] = e.target.value;
    setBoardData(updatedBoard);
  };

  // Handle Enter key press on the center cell to lock it
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setIsCenterLocked(true);
    }
  };

  // Toggles cell colors on click
  const toggleCellColor = (row, col) => {
    const cellKey = `${row}-${col}`;
    setSelectedCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '50%' }}>
        <tbody>
          {boardData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const isCenterCell = rowIndex === CENTER_POSITION.row && colIndex === CENTER_POSITION.col;
                const cellKey = `${rowIndex}-${colIndex}`;
                const isSelected = selectedCells[cellKey];

                return (
                  <td
                    key={colIndex}
                    style={{
                      border: '1px solid #333',
                      width: '60px',
                      height: '60px',
                      backgroundColor: isSelected ? 'lightgreen' : 'white',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleCellColor(rowIndex, colIndex)}
                  >
                    {isCenterCell ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={handleCenterChange}
                        onKeyPress={handleKeyPress}
                        disabled={isCenterLocked} // Lock center cell after Enter is pressed
                        style={{
                          width: '100%',
                          height: '100%',
                          textAlign: 'center',
                          fontSize: '20px',
                          border: 'none',
                          outline: 'none',
                          backgroundColor: 'transparent',
                          cursor: isCenterLocked ? 'pointer' : 'text',
                        }}
                      />
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoBoard;
