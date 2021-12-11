import { variable } from './utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sudoku(): void {
  const engine = LinearOptimizationService.createEngine();

  // add variables
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      for (let v = 1; v < 10; v++) {
        engine.addVariable(variable(i, j, v), 0, 1, LinearOptimizationService.VariableType.INTEGER);
      }
    }
  }

  // 各マスに 1~9 の数字がちょうど一つ割り当てられるための制約
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const constraint = engine.addConstraint(1, 1);
      for (let v = 1; v < 10; v++) {
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // 各行に 1~9 の数字がそれぞれ一回ずつ割り当てられるための制約
  for (let i = 0; i < 9; i++) {
    for (let v = 1; v < 10; v++) {
      const constraint = engine.addConstraint(1, 1);
      for (let j = 0; j < 9; j++) {
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // 各列に 1~9 の数字がそれぞれ一回ずつ割り当てられるための制約
  for (let j = 0; j < 9; j++) {
    for (let v = 1; v < 10; v++) {
      const constraint = engine.addConstraint(1, 1);
      for (let i = 0; i < 9; i++) {
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // 各 3x3 ブロックに 1~9 の数字がそれぞれ一回ずつ割り当てられるための制約
  for (let k = 0; k < 9; k++) {
    for (let v = 1; v < 10; v++) {
      const constraint = engine.addConstraint(1, 1);
      for (let l = 0; l < 9; l++) {
        constraint.setCoefficient(variable(Math.floor(k / 3) * 3 + Math.floor(l / 3), (k % 3) * 3 + l % 3, v), 1);
      }
    }
  }

  // 問題の設定
  const p = puzzle();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const v = p[i][j];
      if (v != 0) {
        const constraint = engine.addConstraint(1, 1);
        constraint.setCoefficient(variable(i, j, v), 1);
      }
    }
  }

  // solve
  Logger.log('開始！');
  const solution = engine.solve();
  Logger.log('終了！');

  // 結果の表示
  for (let i = 0; i < 9; i++) {
    let line = '';
    for (let j = 0; j < 9; j++) {
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

function puzzle(): number[][] {
  return [
    [6, 5, 0, 0, 0, 0, 0, 0, 9],
    [0, 0, 2, 0, 8, 0, 0, 0, 0],
    [0, 0, 1, 9, 3, 2, 6, 0, 0],
    [0, 0, 0, 8, 0, 0, 2, 0, 0],
    [0, 0, 0, 4, 5, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 3, 0, 0, 7],
    [0, 9, 0, 0, 0, 0, 7, 0, 0],
    [4, 0, 0, 0, 0, 0, 3, 8, 0],
    [0, 0, 7, 0, 1, 0, 9, 0, 0]
  ];
}
