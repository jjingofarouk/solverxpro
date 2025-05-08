import Solver from './Solver';

class ProjectileMotionSolver extends Solver {
  solve() {
    const { v0, theta, g = 9.81 } = this.inputs;
    if (!v0 || !theta) throw new Error('Invalid inputs');
    const rad = (theta * Math.PI) / 180;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);
    const tFlight = (2 * vy) / g;
    const hMax = (vy * vy) / (2 * g);
    const range = vx * tFlight;
    const trajectory = [];
    for (let t = 0; t <= tFlight; t += tFlight / 100) {
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;
      if (y >= 0) trajectory.push({ x, y });
    }
    return { tFlight, hMax, range, trajectory };
  }

  getSteps() {
    const { v0, theta, g } = this.inputs;
    return [
      `v_x = ${v0} cos(${theta}°) = ${(v0 * Math.cos((theta * Math.PI) / 180)).toFixed(2)}`,
      `v_y = ${v0} sin(${theta}°) = ${(v0 * Math.sin((theta * Math.PI) / 180)).toFixed(2)}`,
      `Time of flight: t = 2v_y / g = ${((2 * v0 * Math.sin((theta * Math.PI) / 180)) / g).toFixed(2)} s`,
    ];
  }

  getGraphData(addExpression) {
    const { trajectory } = this.solve();
    addExpression({
      id: `projectile_${Date.now()}`,
      latex: `(${trajectory.map(p => p.x).join(',')}, ${trajectory.map(p => p.y).join(',')})`,
      color: '#00ff00',
    });
    const { hMax, range } = this.solve();
    addExpression({
      id: `max_height_${Date.now()}`,
      latex: `(${range / 2}, ${hMax})`,
      color: '#ff0000',
      pointStyle: 'dot',
    });
  }
}

export default ProjectileMotionSolver;