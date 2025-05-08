import React, { useState } from 'react';
import QuadraticSolver from '../solvers/QuadraticSolver';
import LinearSystemSolver from '../solvers/LinearSystemSolver';
import NumericalIntegrationSolver from '../solvers/NumericalIntegrationSolver';
import ProjectileMotionSolver from '../solvers/ProjectileMotionSolver';
import CircuitSolver from '../solvers/CircuitSolver';
import '../styles/SolverPanel.css';

const SolverPanel = ({ addExpression }) => {
  const [solverType, setSolverType] = useState('quadratic');
  const [solution, setSolution] = useState(null);

  const solvers = {
    quadratic: QuadraticSolver,
    linearSystem: LinearSystemSolver,
    numericalIntegration: NumericalIntegrationSolver,
    projectile: ProjectileMotionSolver,
    circuit: CircuitSolver,
  };

  const handleSolve = (inputs) => {
    const solver = new solvers[solverType](inputs);
    const result = solver.solve();
    setSolution({ result, steps: solver.getSteps() });
    if (solver.getGraphData) {
      solver.getGraphData(addExpression);
    }
  };

  const renderInputs = () => {
    switch (solverType) {
      case 'quadratic':
        return (
          <div>
            <input type="number" id="a" placeholder="a (x^2)" step="any" />
            <input type="number" id="b" placeholder="b (x)" step="any" />
            <input type="number" id="c" placeholder="c (constant)" step="any" />
          </div>
        );
      case 'linearSystem':
        return (
          <div>
            <input type="number" id="a1" placeholder="a1 (x)" step="any" />
            <input type="number" id="b1" placeholder="b1 (y)" step="any" />
            <input type="number" id="c1" placeholder="c1" step="any" />
            <input type="number" id="a2" placeholder="a2 (x)" step="any" />
            <input type="number" id="b2" placeholder="b2 (y)" step="any" />
            <input type="number" id="c2" placeholder="c2" step="any" />
          </div>
        );
      case 'numericalIntegration':
        return (
          <div>
            <input type="text" id="func" placeholder="Function (e.g., x^2)" />
            <input type="number" id="a" placeholder="Lower bound" step="any" />
            <input type="number" id="b" placeholder="Upper bound" step="any" />
            <input type="number" id="n" placeholder="Intervals" step="1" />
          </div>
        );
      case 'projectile':
        return (
          <div>
            <input type="number" id="v0" placeholder="Initial velocity (m/s)" step="any" />
            <input type="number" id="theta" placeholder="Angle (degrees)" step="any" />
            <input type="number" id="g" placeholder="Gravity (m/s^2)" step="any" defaultValue="9.81" />
          </div>
        );
      case 'circuit':
        return (
          <div>
            <input type="number" id="v" placeholder="Voltage (V)" step="any" />
            <input type="number" id="r1" placeholder="Resistor 1 (Ω)" step="any" />
            <input type="number" id="r2" placeholder="Resistor 2 (Ω)" step="any" />
            <select id="config">
              <option value="series">Series</option>
              <option value="parallel">Parallel</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const inputs = {};
    document.querySelectorAll('#solver-inputs input, #solver-inputs select').forEach((input) => {
      inputs[input.id] = input.type === 'number' ? parseFloat(input.value) : input.value;
    });
    handleSolve(inputs);
  };

  return (
    <div className="solver-panel">
      <h3>Solvers</h3>
      <select value={solverType} onChange={(e) => setSolverType(e.target.value)}>
        <option value="quadratic">Quadratic Equation</option>
        <option value="linearSystem">Linear System</option>
        <option value="numericalIntegration">Numerical Integration</option>
        <option value="projectile">Projectile Motion</option>
        <option value="circuit">Circuit Analysis</option>
      </select>
      <div id="solver-inputs">{renderInputs()}</div>
      <button onClick={handleSubmit}>Solve</button>
      {solution && (
        <div className="solution-output">
          <h4>Solution</h4>
          <pre>{JSON.stringify(solution.result, null, 2)}</pre>
          <h4>Steps</h4>
          <ul>
            {solution.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SolverPanel;