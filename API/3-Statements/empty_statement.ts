import * as ts from 'typescript';

// 创建空语句
const emptyStmt = ts.factory.createEmptyStatement();

// 创建 for 循环语句：for (let i = 0; i < 10; i++) ;
const forEmpty = ts.factory.createForStatement(
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'i',
        undefined,
        undefined,
        ts.factory.createNumericLiteral(0)
      )
    ],
    ts.NodeFlags.Let
  ),
  ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('i'),
    ts.factory.createToken(ts.SyntaxKind.LessThanToken),
    ts.factory.createNumericLiteral(10)
  ),
  ts.factory.createPostfixIncrement(ts.factory.createIdentifier('i')),
  emptyStmt
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [emptyStmt, forEmpty],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * ;
 * for (let i = 0; i < 10; i++) ;
 * 
 * ts.factory.createEmptyStatement：创建空语句节点，用于表示空语句。
 */
