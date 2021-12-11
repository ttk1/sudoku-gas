import { variable } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function magicSquare(): void {
  const engine = LinearOptimizationService.createEngine();

  // add variables
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let v = 1; v < 10; v++) {
        engine.addVariable(variable(i, j, v), 0, 1, LinearOptimizationService.VariableType.INTEGER);
      }
    }
  }

  // 各マスに必ず数字が割り当てられるための制約
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const constraint = engine.addConstraint(1, 1);
      for (let v = 1; v < 10; v++) {
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // マスに 1~9 の数字がそれぞれ一回ずつ割り当てられるための制約
  for (let v = 1; v < 10; v++) {
    const constraint = engine.addConstraint(1, 1);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // 各行の和が 15 になるための制約
  for (let i = 0; i < 3; i++) {
    const constraint = engine.addConstraint(15, 15);
    for (let j = 0; j < 3; j++) {
      for (let v = 1; v < 10; v++) {
        constraint.setCoefficient(variable(i, j, v), v);
      }
    }
  }

  // 各列の和が 15 になるための制約
  for (let j = 0; j < 3; j++) {
    const constraint = engine.addConstraint(15, 15);
    for (let i = 0; i < 3; i++) {
      for (let v = 1; v < 10; v++) {
        constraint.setCoefficient(variable(i, j, v), v);
      }
    }
  }

  // 対角線の和が 15 になるための制約
  const constraintA = engine.addConstraint(15, 15);
  const constraintB = engine.addConstraint(15, 15);
  for (let i = 0; i < 3; i++) {
    for (let v = 1; v < 10; v++) {
      constraintA.setCoefficient(variable(i, i, v), v);
      constraintB.setCoefficient(variable(i, 3 - i - 1, v), v);
    }
  }

  // solve
  Logger.log('開始！');
  const solution = engine.solve();
  Logger.log('終了！');

  // 結果の表示
  for (let i = 0; i < 3; i++) {
    let line = '';
    for (let j = 0; j < 3; j++) {
      for (let v = 1; v < 10; v++) {
        const value = solution.getVariableValue(variable(i, j, v));
        if (value != 0) {
          line += ` ${v}`;
          break;
        }
      }
    }
    Logger.log(line);
  }
}
