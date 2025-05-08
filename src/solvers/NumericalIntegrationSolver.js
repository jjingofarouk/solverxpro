import Solver from './Solver';

class NumericalIntegrationSolver extends Solver {
  solve() {
    const { func, a, b, n } = this.inputs;
    if (!func || isNaN(a) || isNaN(b) || isNaN(n)) throw new Error('Invalid inputs');
    const h = (b - a) / n;
    let sum = 0;
    for (let i = 0; i <= n; i++) {
      const x = a + i * h;
      const y = eval(func.replace('x', x)); // Simplified evaluation
      sum += i === 0 || i === n ? y : 2 * y;
    }
    return { area: (h / 2) * sum };
  }

  getSteps() {
    const { a, b, n } = this.inputs;
    return [
      `Step size: h = (${b} - ${a})/${n} = ${(b - a) / n}`,
      `Apply trapezoidal rule: Area ≈ (h/2) * (f(x0) + 2f(x1) + ... + f(xn))`,
    ];
  }

  getGraphData(addExpression) {
    const { func, a, b, n } = this.inputs;
    addExpression({
      id: `integral_${Date.now()}`,
      latex: `y=${func}`,
      color: '#ff006e',
    });
    const h = (b - a) / n;
    for (let i = 0; i < n; i++) {
      const x1 = a + i * h;
      const x2 = x1 + h;
      addExpression({
        id: `trap_${i}_${Date.now()}`,
        latex: `y \\in [0, ${func}](x \\in [${x1}, ${x2}])`,
        color: '#00ff00',
        fillOpacity: 0.3,
      });
    }
  }
}

export default NumericalIntegrationSolver;