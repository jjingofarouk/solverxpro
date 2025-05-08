import React, { useState } from 'react';
import * as math from 'mathjs';
import '../styles/SolverPanel.css';

const NumericalIntegrationSolver = ({ addExpression }) => {
  const [func, setFunc] = useState('x^2');
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [n, setN] = useState(100);
  const [result, setResult] = useState(null);

  const trapezoidalRule = () => {
    try {
      const scope = { x: 0 };
      const compiledFunc = math.compile(func);
      let sum = 0;
      const h = (b - a) / n;

      // Evaluate at endpoints
      scope.x = a;
      sum += compiledFunc.evaluate(scope);
      scope.x = b;
      sum += compiledFunc.evaluate(scope);

      // Evaluate at interior points
      for (let i = 1; i < n; i++) {
        scope.x = a + i * h;
        sum += 2 * compiledFunc.evaluate(scope);
      }

      const integral = (h / 2) * sum;
      setResult(integral);

      // Add the function to the graph
      addExpression({
        id: `int_${Date.now()}`,
        latex: `${func}`,
        color: '#ff0000',
      });
    } catch (error) {
      alert('Invalid function or parameters');
    }
  };

  return (
    <div className="solver">
      <h3>Numerical Integration (Trapezoidal Rule)</h3>
      <input
        type="text"
        value={func}
        onChange={(e) => setFunc(e.target.value)}
        placeholder="Enter function (e.g., x^2)"
      />
      <input
        type="number"
        value={a}
        onChange={(e) => setA(parseFloat(e.target.value))}
        placeholder="Lower bound"
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(parseFloat(e.target.value))}
        placeholder="Upper bound"
      />
      <input
        type="number"
        value={n}
        onChange={(e) => setN(parseInt(e.target.value))}
        placeholder="Number of intervals"
      />
      <button onClick={trapezoidalRule}>Calculate</button>
      {result !== null && <p>Result: {result.toFixed(6)}</p>}
    </div>
  );
};

export default NumericalIntegrationSolver;