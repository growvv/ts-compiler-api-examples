import * as ts from 'typescript';

// 创建条件表达式：status
const switchExpression = ts.factory.createIdentifier('status');

// 创建 case "success":
const caseSuccess = ts.factory.createCaseClause(
    ts.factory.createStringLiteral("success"),
    [
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                undefined,
                [ts.factory.createStringLiteral("Operation was successful.")]
            )
        ),
        ts.factory.createBreakStatement()
    ]
);

// 创建 case "error":
const caseError = ts.factory.createCaseClause(
    ts.factory.createStringLiteral("error"),
    [
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                undefined,
                [ts.factory.createStringLiteral("An error occurred.")]
            )
        ),
        ts.factory.createBreakStatement()
    ]
);

// 创建 default:
const defaultClause = ts.factory.createDefaultClause([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createStringLiteral("Unknown status.")]
        )
    ),
    ts.factory.createBreakStatement()
]);

// 创建 switch 语句
const switchStatement = ts.factory.createSwitchStatement(
    switchExpression,
    ts.factory.createCaseBlock([
        caseSuccess,
        caseError,
        defaultClause
    ])
);

// 创建源文件并打印代码
const sourceFileSwitch = ts.factory.createSourceFile(
    [switchStatement],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeSwitch = printer.printNode(ts.EmitHint.Unspecified, sourceFileSwitch, sourceFileSwitch);
console.log(codeSwitch);

/**
 * 生成的代码：
 * switch (status) {
 *    case "success":
 *     console.log("Operation was successful.");
 *    break;
 *   case "error":
 *    console.log("An error occurred.");
 *   break;
 *  default:
 *   console.log("Unknown status.");
 * break;
 * }
 * 
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 status。
 * ts.factory.createCaseClause：创建 case 子句节点，用于表示 switch 语句的 case 子句，包含 case 关键字、表达式和语句列表。如 case "success":。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 "success"。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log("Operation was successful.");。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log("Operation was successful.")。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 * ts.factory.createBreakStatement：创建 break 语句节点，用于表示 switch 语句的 break 语句。
 * ts.factory.createDefaultClause：创建 default 子句节点，用于表示 switch 语句的 default 子句，包含 default 关键字和语句列表。如 default:。
 * ts.factory.createSwitchStatement：创建 switch 语句节点，用于表示 switch 语句，包含表达式和 case 子句列表。如 switch (status) { ... }。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 switch 语句。
 * 
 */