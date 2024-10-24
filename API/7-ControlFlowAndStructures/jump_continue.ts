import * as ts from 'typescript';

// 创建条件表达式：i % 2 === 0
const conditionContinue = ts.factory.createBinaryExpression(
    ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('i'),
        ts.factory.createToken(ts.SyntaxKind.PercentToken),
        ts.factory.createNumericLiteral(2)
    ),
    ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
    ts.factory.createNumericLiteral(0)
);

// 创建 if 语句：if (i % 2 === 0) { continue; }
const ifContinue = ts.factory.createIfStatement(
    conditionContinue,
    ts.factory.createBlock([
        ts.factory.createContinueStatement()
    ], true),
    undefined
);

// 创建循环体：{ if (i % 2 === 0) { continue; } console.log(i); }
const loopBodyContinue = ts.factory.createBlock([
    ifContinue,
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createIdentifier('i')]
        )
    )
], true);

// 创建初始化器：let i = 0
const initializerContinue = ts.factory.createVariableDeclarationList(
    [
        ts.factory.createVariableDeclaration(
            'i',
            undefined,
            undefined,
            ts.factory.createNumericLiteral(0)
        )
    ],
    ts.NodeFlags.Let
);

// 创建条件表达式：i < 10
const conditionContinue2 = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('i'),
    ts.factory.createToken(ts.SyntaxKind.LessThanToken),
    ts.factory.createNumericLiteral(10)
);

// 创建增量器：i++
const incrementorContinue = ts.factory.createPostfixIncrement(ts.factory.createIdentifier('i'));

// 创建 `for` 循环语句
const forLoopContinue = ts.factory.createForStatement(
    initializerContinue,
    conditionContinue2,
    incrementorContinue,
    loopBodyContinue
);

// 创建源文件并打印代码
const sourceFileContinue = ts.factory.createSourceFile(
    [forLoopContinue],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeContinue = printer.printNode(ts.EmitHint.Unspecified, sourceFileContinue, sourceFileContinue);
console.log(codeContinue);

/**
 * 生成的代码：
 * for (let i = 0; i < 10; i++) {
 *   if (i % 2 === 0) { 
 *     continue; 
 *   }
 *   console.log(i);
 * }
 * 
 * ts.factory.createContinueStatement：创建 continue 语句节点，用于表示跳过当前循环的剩余部分。
 */
