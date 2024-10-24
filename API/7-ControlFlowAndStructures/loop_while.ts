
import * as ts from 'typescript';

// 创建变量声明：let count = 0;
const letCount = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'count',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(0)
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建条件表达式：count < 10
const whileCondition = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('count'),
    ts.factory.createToken(ts.SyntaxKind.LessThanToken),
    ts.factory.createNumericLiteral(10)
);

// 创建循环体：{ console.log(count); count++; }
const whileBody = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createIdentifier('count')]
        )
    ),
    ts.factory.createExpressionStatement(
        ts.factory.createPostfixIncrement(ts.factory.createIdentifier('count'))
    )
], true);

// 创建 `while` 循环语句
const whileLoop = ts.factory.createWhileStatement(
    whileCondition,
    whileBody
);

// 创建源文件并打印代码
const sourceFileWhile = ts.factory.createSourceFile(
    [letCount, whileLoop],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeWhile = printer.printNode(ts.EmitHint.Unspecified, sourceFileWhile, sourceFileWhile);
console.log(codeWhile);

/**
 * 生成的代码：
 * let count = 0;
 * while (count < 10) {
 *  console.log(count);
 *  count++;
 * }
 * 
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元运算，如 count < 10。
 * ts.factory.createPostfixIncrement：创建后缀递增表达式节点，用于表示后缀递增运算，如 count++。
 * ts.factory.createWhileStatement：创建 while 循环语句节点，用于表示 while 循环，包含条件和循环体。如 while (count < 10) { ... }。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 while 循环。
 * 
 */