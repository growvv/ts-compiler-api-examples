import * as ts from 'typescript';

// 创建常量声明：const num = 100;
const numVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'num',
        undefined,
        undefined,
        ts.factory.createNumericLiteral(100)
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建常量声明：const str = "Hello, TypeScript!";
const strVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'str',
        undefined,
        undefined,
        ts.factory.createStringLiteral("Hello, TypeScript!")
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建常量声明：const bool = true;
const boolVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'bool',
        undefined,
        undefined,
        ts.factory.createTrue()
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建常量声明：const obj = { a: 1, b: "two" };
const objVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'obj',
        undefined,
        undefined,
        ts.factory.createObjectLiteralExpression(
          [
            ts.factory.createPropertyAssignment('a', ts.factory.createNumericLiteral(1)),
            ts.factory.createPropertyAssignment('b', ts.factory.createStringLiteral("two"))
          ],
          true
        )
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建常量声明：const arr = [1, 2, 3];
const arrVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'arr',
        undefined,
        undefined,
        ts.factory.createArrayLiteralExpression(
          [
            ts.factory.createNumericLiteral(1),
            ts.factory.createNumericLiteral(2),
            ts.factory.createNumericLiteral(3)
          ],
          false
        )
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [numVariable, strVariable, boolVariable, objVariable, arrVariable],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * const num = 100;
 * const str = "Hello, TypeScript!";
 * const bool = true;
 * const obj = { a: 1, b: "two" };
 * const arr = [1, 2, 3];
 * 
 * ts.factory.createVariableDeclarationList 创建变量声明列表节点，用于表示变量声明列表，如 const num。
 * ts.factory.createVariableDeclaration 创建变量声明节点，用于表示变量声明，如 num。
 * ts.factory.createObjectLiteralExpression 创建对象字面量节点，用于表示对象字面量，如 { a: 1, b: "two" }。
 * ts.factory.createPropertyAssignment 创建属性赋值节点，用于表示属性赋值，如 a: 1。
 * ts.factory.createArrayLiteralExpressio 创建数组字面量节点，用于表示数组字面量，如 [1, 2, 3]。
 */