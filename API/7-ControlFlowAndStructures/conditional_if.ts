import * as ts from 'typescript';

// 创建条件表达式：isActive
const condition = ts.factory.createIdentifier('isActive');

// 创建 then 块：{ console.log("Active"); }
const thenBlock = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createStringLiteral("Active")]
        )
    )
], true);

// 创建 else 块：{ console.log("Inactive"); }
const elseBlock = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createStringLiteral("Inactive")]
        )
    )
], true);

// 创建 if 语句：if (isActive) { ... } else { ... }
const ifStatement = ts.factory.createIfStatement(
    condition,
    thenBlock,
    elseBlock
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [ifStatement],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * if (isActive) {
 *    console.log("Active");
 * } else {
 *   console.log("Inactive");
 * }
 * 
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 isActive。
 * ts.factory.createBlock：创建块节点，用于表示代码块，用{}包围，如 { console.log("Active"); }。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log("Active");。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log("Active")。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 "Active"。
 * ts.factory.createIfStatement：创建 if 语句节点，用于表示条件语句，包含条件、then 块和可选的 else 子句。如 if (isActive) { ... } else { ... }。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 if 语句。
 * ts.createPrinter：创建打印机，用于将节点打印为代码。
 * printer.printNode：打印节点为代码。
 * 
 */