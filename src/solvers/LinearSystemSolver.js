import Solver from './Solver';

class LinearSystemSolver extends Solver {
  solve() {
    const { a1, b1, c1, a2, b2, c2 } = this.inputs;
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-10) throw new Error('No unique solution');
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    return { x, y };
  }

  getSteps() {
    const { a1, b1, c1, a2, b2, c2 } = this.inputs;
    const det = a1 * b2 - a2 * b1;
    return [
      `Determinant: ${a1}*${b2} - ${a2}*${b1} = ${det}`,
      `x = (${c1}*${b2} - ${c2}*${b1})/${det}`,
      `y = (${a1}*${c2} - ${a2}*${c1})/${det}`,
    ];
  }

  getGraphData(addExpression) {
    const { a1, b1, c1, a2, b2, c2 } = this.inputs;
    addExpression({
      id: `line1_${Date.now()}`,
      latex: `y=(${c1}-${a1}x)/${b1}`,
      color: '#9d4edd',
    });
    addExpression({
      id: `line2_${Date.now()}`,
      latex: `y=(${c2}-${a2}x)/${b2}`,
      color: '#00ff00',
    });
  }
}

export default LinearSystemSolver;