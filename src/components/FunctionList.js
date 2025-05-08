import React, { useState } from 'react';
import '../styles/FunctionList.css';

const FunctionList = ({ expressions, addExpression, removeExpression, selectExpression }) => {
  const [newLatex, setNewLatex] = useState('');
  const [newColor, setNewColor] = useState('#9d4edd');

  const handleAdd = () => {
    if (newLatex.trim()) {
      addExpression({
        id: `func_${Date.now()}`,
        latex: newLatex,
        color: newColor,
      });
      setNewLatex('');
    }
  };

  return (
    <div className="function-list">
      <h3>Functions</h3>
      <div className="function-input">
        <input
          type="text"
          value={newLatex}
          onChange={(e) => setNewLatex(e.target.value)}
          placeholder="Enter LaTeX (e.g., y=x^2)"
        />
        <input
          type="color"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {expressions.map((expr) => (
          <li
            key={expr.id}
            onClick={() => selectExpression(expr.id)}
            style={{ borderLeft: `4px solid ${expr.color}` }}
          >
            {expr.latex}
            <button onClick={() => removeExpression(expr.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FunctionList;