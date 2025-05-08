class Solver {
  constructor(inputs) {
    this.inputs = inputs;
  }

  solve() {
    throw new Error('Solve method must be implemented');
  }

  getSteps() {
    return [];
  }

  getGraphData(addExpression) {
    return null;
  }
}

export default Solver;