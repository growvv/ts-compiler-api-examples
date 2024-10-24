import * as ts from 'typescript';

// 创建变量声明：const num
const constNum = ts.factory.createVariableDeclarationList(
    [
        ts.factory.createVariableDeclaration(
            'num',
            undefined,
            undefined,
            undefined
        )
    ],
    ts.NodeFlags.Const
);

// 创建 `for-of` 循环语句
const forOfLoop = ts.factory.createForOfStatement(
    undefined,
    constNum,
    ts.factory.createIdentifier('numbers'),
    ts.factory.createBlock([
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                undefined,
                [ts.factory.createIdentifier('num')]
            )
        )
    ], true)
);

// 创建变量声明：const numbers = [1, 2, 3, 4, 5];
const numbersVar = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'numbers',
                undefined,
                undefined,
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createNumericLiteral(1),
                        ts.factory.createNumericLiteral(2),
                        ts.factory.createNumericLiteral(3),
                        ts.factory.createNumericLiteral(4),
                        ts.factory.createNumericLiteral(5)
                    ],
                    false
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFileForOf = ts.factory.createSourceFile(
    [numbersVar, forOfLoop],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeForOf = printer.printNode(ts.EmitHint.Unspecified, sourceFileForOf, sourceFileForOf);
console.log(codeForOf);

/**
 * 生成的代码：
 * const numbers = [1, 2, 3, 4, 5];
 * for (const num of numbers) {
 *   console.log(num);
 * }
 * 
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 const num。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 num。
 * ts.factory.createArrayLiteralExpression：创建数组字面量节点，用于表示数组字面量，如 [1, 2, 3, 4, 5]。
 * ts.factory.createForOfStatement：创建 for-of 循环语句节点，用于表示 for-of 循环，包含变量声明、迭代表达式和循环体。如 for (const num of numbers) { console.log(num); }。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { console.log(num); }。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log(num);。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log(num)。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 num。
 * ts.factory.createNumericLiteral：创建数字字面量节点，用于表示数字字面量，如 1。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个 TypeScript 文件，包含多个顶级节点。如 const numbers = [1, 2, 3, 4, 5]; for (const num of numbers) { console.log(num); }。
 * ts.createPrinter：创建打印机，用于将节点转换成字符串。
 */