import Solver from './Solver';

class QuadraticSolver extends Solver {
  solve() {
    const { a, b, c } = this.inputs;
    if (!a || !b || !c) throw new Error('Invalid inputs');
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      const real = -b / (2 * a);
      const imag = Math.sqrt(-discriminant) / (2 * a);
      return { roots: [`${real} ± ${imag}i`], complex: true };
    }
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return { roots: [root1, root2], complex: false };
  }

  getSteps() {
    const { a, b, c } = this.inputs;
    const discriminant = b * b - 4 * a * c;
    return [
      `Discriminant: b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`,
      discriminant < 0
        ? `Complex roots: x = (-${b} ± √${-discriminant}i)/(2(${a}))`
        : `Roots: x = (-${b} ± √${discriminant})/(2(${a}))`,
    ];
  }

  getGraphData(addExpression) {
    const { a, b, c } = this.inputs;
    addExpression({
      id: `quadratic_${Date.now()}`,
      latex: `y=${a}x^2+${b}x+${c}`,
      color: '#ff006e',
    });
  }
}

export default QuadraticSolver;