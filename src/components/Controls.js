import React from 'react';
import '../styles/Controls.css';

const Controls = ({ resetGraph, exportGraph, saveWorkspace, loadWorkspace }) => {
  return (
    <div className="controls">
      <button onClick={resetGraph}>Reset Graph</button>
      <button onClick={exportGraph}>Export Graph</button>
      <button onClick={saveWorkspace}>Save Workspace</button>
      <button onClick={loadWorkspace}>Load Workspace</button>
    </div>
  );
};

export default Controls;