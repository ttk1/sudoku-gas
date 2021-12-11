// eslint-disable-next-line @typescript-eslint/no-unused-vars
function example(): void {
  const engine = LinearOptimizationService.createEngine();
  engine.addVariable('x', 0, 100, LinearOptimizationService.VariableType.INTEGER);
  engine.addVariable('y', 0, 100, LinearOptimizationService.VariableType.INTEGER);
  engine.addVariable('z', 0, 100, LinearOptimizationService.VariableType.INTEGER);

  const constraint = engine.addConstraint(0, 10000);
  constraint.setCoefficient('x', 227);
  constraint.setCoefficient('y', 497);
  constraint.setCoefficient('y', 723);

  engine.setObjectiveCoefficient('x', 227);
  engine.setObjectiveCoefficient('y', 497);
  engine.setObjectiveCoefficient('z', 723);
  engine.setMaximization();

  const solution = engine.solve();
  Logger.log('x: ' + solution.getVariableValue('x'));
  Logger.log('y: ' + solution.getVariableValue('y'));
  Logger.log('z: ' + solution.getVariableValue('z'));
}
