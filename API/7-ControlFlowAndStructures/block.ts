import * as ts from 'typescript';

// 创建变量声明：let a = 1;
const letA = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'a',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(1)
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：let b = 2;
const letB = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'b',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(2)
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建表达式语句：console.log(a + b);
const logStatement = ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
        undefined,
        [
            ts.factory.createBinaryExpression(
                ts.factory.createIdentifier('a'),
                ts.factory.createToken(ts.SyntaxKind.PlusToken),
                ts.factory.createIdentifier('b')
            )
        ]
    )
);

// 创建块语句
const block = ts.factory.createBlock(
    [letA, letB, logStatement],
    true
);

// 创建源文件并打印代码
const sourceFileBlock = ts.factory.createSourceFile(
    [block],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed
});
const codeBlock = printer.printNode(ts.EmitHint.Unspecified, sourceFileBlock, sourceFileBlock);
console.log(codeBlock);

/**
 * 生成的代码：
 * {
 *  let a = 1;
 *  let b = 2;
 *  console.log(a + b);
 * }
 */