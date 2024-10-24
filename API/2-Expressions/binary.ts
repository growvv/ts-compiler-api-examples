import * as ts from 'typescript';

// 创建变量声明：const sum = a + b;
const sumVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'sum',
                undefined,
                undefined,
                ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier('a'),
                    ts.factory.createToken(ts.SyntaxKind.PlusToken),
                    ts.factory.createIdentifier('b')
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const isEqual = a === b;
const isEqualVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'isEqual',
                undefined,
                undefined,
                ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier('a'),
                    ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
                    ts.factory.createIdentifier('b')
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const isGreater = a > b;
const isGreaterVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'isGreater',
                undefined,
                undefined,
                ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier('a'),
                    ts.factory.createToken(ts.SyntaxKind.GreaterThanToken),
                    ts.factory.createIdentifier('b')
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [sumVariable, isEqualVariable, isGreaterVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印代码
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

// 生成的代码：
// const sum = a + b;
// const isEqual = a === b;
// const isGreater = a > b;
//
// ts.factory.createBinaryExpression：创建二元表达式节点，ts.factory.createBinaryExpression：创建二元运算表达式，包括操作符（如 +, ===, >）和左右操作数。如 a + b。