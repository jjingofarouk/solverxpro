import Solver from './Solver';

class CircuitSolver extends Solver {
  solve() {
    const { v, r1, r2, config } = this.inputs;
    if (!v || !r1 || !r2) throw new Error('Invalid inputs');
    let rEq, current;
    if (config === 'series') {
      rEq = r1 + r2;
      current = v / rEq;
    } else {
      rEq = (r1 * r2) / (r1 + r2);
      current = v / rEq;
    }
    return { rEq, current, voltage: v };
  }

  getSteps() {
    const { v, r1, r2, config } = this.inputs;
    return [
      config === 'series'
        ? `Equivalent resistance: R = ${r1} + ${r2} = ${r1 + r2} Ω`
        : `Equivalent resistance: R = (${r1}*${r2})/(${r1}+${r2}) = ${((r1 * r2) / (r1 + r2)).toFixed(2)} Ω`,
      `Current: I = V/R = ${v}/${config === 'series' ? r1 + r2 : ((r1 * r2) / (r1 + r2)).toFixed(2)}`,
    ];
  }
}

export default CircuitSolver;