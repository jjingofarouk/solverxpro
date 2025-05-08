import React, { useState } from 'react';
import GraphingCalculator from './components/GraphingCalculator';
import FunctionList from './components/FunctionList';
import SolverPanel from './components/SolverPanel';
import Controls from './components/Controls';
import './styles/App.css';

const App = () => {
  const [expressions, setExpressions] = useState([]);
  const [selectedExpression, setSelectedExpression] = useState(null);

  const addExpression = (expression) => {
    setExpressions([...expressions, expression]);
  };

  const removeExpression = (id) => {
    setExpressions(expressions.filter((expr) => expr.id !== id));
  };

  const selectExpression = (id) => {
    setSelectedExpression(id);
  };

  const resetGraph = () => {
    setExpressions([]);
    setSelectedExpression(null);
  };

  const exportGraph = () => {
    alert('Exporting graph as image...');
    // Implement export logic (e.g., canvas to PNG)
  };

  const saveWorkspace = () => {
    localStorage.setItem('workspace', JSON.stringify(expressions));
    alert('Workspace saved!');
  };

  const loadWorkspace = () => {
    const saved = localStorage.getItem('workspace');
    if (saved) {
      setExpressions(JSON.parse(saved));
      alert('Workspace loaded!');
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <img src="/assets/logo.png" alt="SolverPro Logo" className="logo" />
        <FunctionList
          expressions={expressions}
          addExpression={addExpression}
          removeExpression={removeExpression}
          selectExpression={selectExpression}
        />
        <SolverPanel addExpression={addExpression} />
      </div>
      <div className="main">
        <Controls
          resetGraph={resetGraph}
          exportGraph={exportGraph}
          saveWorkspace={saveWorkspace}
          loadWorkspace={loadWorkspace}
        />
        <GraphingCalculator
          expressions={expressions}
          onExpressionSelect={selectExpression}
        />
      </div>
    </div>
  );
};

export default App;