import * as ts from 'typescript';

// 创建变量声明：const key
const constKey = ts.factory.createVariableDeclarationList(
    [
        ts.factory.createVariableDeclaration(
            'key',
            undefined,
            undefined,
            undefined
        )
    ],
    ts.NodeFlags.Const
);

// 创建 `for-in` 循环语句
const forInLoop = ts.factory.createForInStatement(
    constKey,
    ts.factory.createIdentifier('obj'),
    ts.factory.createBlock([
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                undefined,
                [
                    ts.factory.createTemplateExpression(
                        ts.factory.createTemplateHead(""),
                        [
                            ts.factory.createTemplateSpan(
                                ts.factory.createIdentifier('key'),
                                ts.factory.createTemplateTail(`: \${obj[key]}`)
                            )
                        ]
                    )
                ]
            )
        )
    ], true)
);

// 创建变量声明：const obj = { a: 1, b: 2, c: 3 };
const objVar = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'obj',
                undefined,
                undefined,
                ts.factory.createObjectLiteralExpression([
                    ts.factory.createPropertyAssignment('a', ts.factory.createNumericLiteral(1)),
                    ts.factory.createPropertyAssignment('b', ts.factory.createNumericLiteral(2)),
                    ts.factory.createPropertyAssignment('c', ts.factory.createNumericLiteral(3))
                ], true)
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFileForIn = ts.factory.createSourceFile(
    [objVar, forInLoop],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeForIn = printer.printNode(ts.EmitHint.Unspecified, sourceFileForIn, sourceFileForIn);
console.log(codeForIn);

/**
 * 生成的代码：
 * const obj = { a: 1, b: 2, c: 3 };
 * for (const key in obj) {
 *  console.log(`${key}: ${obj[key]}`);
 * }
 * 
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 const key。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 key。
 * ts.factory.createForInStatement：创建 for-in 循环语句节点，用于表示 for-in 循环，包含变量声明、表达式和循环体。如 for (const key in obj) { console.log(`${key}: ${obj[key]}`); }。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { console.log(`${key}: ${obj[key]}`); }。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log(`${key}: ${obj[key]}`);。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log(`${key}: ${obj[key]}`)。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 * ts.factory.createTemplateExpression：创建模板表达式节点，用于表示模板表达式，如 `${key}: ${obj[key]}`。
 * ts.factory.createTemplateHead：创建模板头节点，用于表示模板头，如 ""。
 * ts.factory.createTemplateSpan：创建模板跨度节点，用于表示模板跨度，如 ${key}。
 * ts.factory.createTemplateTail：创建模板尾节点，用于表示模板尾，如 `: ${obj[key]}`。
 * ts.factory.createObjectLiteralExpression：创建对象字面量节点，用于表示对象字面量，如 { a: 1, b: 2, c: 3 }。
 * ts.factory.createPropertyAssignment：创建属性赋值节点，用于表示属性赋值，如 a: 1。
 * ts.factory.createNumericLiteral：创建数字字面量节点，用于表示数字字面量，如 1。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 for-in 循环。
 * 
 */