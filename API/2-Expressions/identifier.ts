import * as ts from 'typescript';

// 创建变量声明：let a = b;
const aVariable = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'a',
                undefined,
                undefined,
                ts.factory.createIdentifier('b')
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：const result = calculate(a, b);
const resultVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'result',
                undefined,
                undefined,
                ts.factory.createCallExpression(
                    ts.factory.createIdentifier('calculate'),
                    undefined,
                    [
                        ts.factory.createIdentifier('a'),
                        ts.factory.createIdentifier('b')
                    ]
                )
            )
        ],
        // ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [aVariable, resultVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印代码
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

// 生成的代码：
// let a = b;
// const result = calculate(a, b);
//
// ts.factory.createIdentifier：创建标识符（变量或函数名称）。
// ts.factory.createCallExpression：创建函数调用表达式，其中包含标识符作为函数名和参数。
