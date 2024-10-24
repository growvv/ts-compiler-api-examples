import * as ts from 'typescript';

// 创建表达式语句：console.log("Hello, World!");
const logStatement = ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier('console'),
            'log'
        ),
        undefined,
        [ts.factory.createStringLiteral("Hello, World!")]
    )
);

// 创建表达式语句：a = b + c;
const assignStatement = ts.factory.createExpressionStatement(
    ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('a'),
        ts.factory.createToken(ts.SyntaxKind.EqualsToken),
        ts.factory.createBinaryExpression(
            ts.factory.createIdentifier('b'),
            ts.factory.createToken(ts.SyntaxKind.PlusToken),
            ts.factory.createIdentifier('c')
        )
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [logStatement, assignStatement],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);


// 生成的代码：
// console.log("Hello, World!");
// a = b + c;
//
// ts.factory.createExpressionStatement 创建表达式语句节点，将表达式转换成语句，如 console.log("Hello, World!")。
// ts.factory.createCallExpression 创建调用表达式节点，用于表示函数调用，如 console.log("Hello, World!")。
// ts.factory.createPropertyAccessExpression 创建属性访问表达式节点，用于表示属性访问，如 console.log。
