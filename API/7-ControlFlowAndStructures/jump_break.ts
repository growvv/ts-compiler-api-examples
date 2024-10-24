import * as ts from 'typescript';

// 创建条件表达式：i === 5
const conditionBreak = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('i'),
    ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
    ts.factory.createNumericLiteral(5)
);

// 创建 if 语句：if (i === 5) { break; }
const ifBreak = ts.factory.createIfStatement(
    conditionBreak,
    ts.factory.createBlock([
        ts.factory.createBreakStatement()
    ], true),
    undefined
);

// 创建循环体：{ if (i === 5) { break; } console.log(i); }
const loopBody = ts.factory.createBlock([
    ifBreak,
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createIdentifier('i')]
        )
    )
], true);

// 创建初始化器：let i = 0
const initializer = ts.factory.createVariableDeclarationList(
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
const condition = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('i'),
    ts.factory.createToken(ts.SyntaxKind.LessThanToken),
    ts.factory.createNumericLiteral(10)
);

// 创建增量器：i++
const incrementor = ts.factory.createPostfixIncrement(ts.factory.createIdentifier('i'));

// 创建 `for` 循环语句
const forLoopBreak = ts.factory.createForStatement(
    initializer,
    condition,
    incrementor,
    loopBody
);

// 创建源文件并打印代码
const sourceFileBreak = ts.factory.createSourceFile(
    [forLoopBreak],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeBreak = printer.printNode(ts.EmitHint.Unspecified, sourceFileBreak, sourceFileBreak);
console.log(codeBreak);

/**
 * 生成的代码：
 * for (let i = 0; i < 10; i++) {
 *   if (i === 5) { break; }
 *   console.log(i);
 * }
 * 
 * ts.factory.createBreakStatement：创建 break 语句节点，用于表示跳出循环。
 * ts.factory.createIfStatement：创建 if 语句节点，用于表示条件语句，包含条件、then 块和可选的 else 子句。如 if (i === 5) { break; }。
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元运算，如 i === 5。
 * ts.factory.createEqualsEqualsEqualsToken：创建 === 运算符节点，用于表示严格相等运算符。
 */