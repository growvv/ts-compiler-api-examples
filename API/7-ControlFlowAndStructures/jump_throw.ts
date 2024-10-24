import * as ts from 'typescript';

// 创建参数声明：a: number
const paramAThrow = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'a',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
);

// 创建参数声明：b: number
const paramBThrow = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'b',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
);

// 创建条件表达式：b === 0
const conditionThrow = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('b'),
    ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
    ts.factory.createNumericLiteral(0)
);

// 创建 `throw` 表达式：throw new Error("Division by zero");
const throwExpression = ts.factory.createThrowStatement(
    ts.factory.createNewExpression(
        ts.factory.createIdentifier('Error'),
        undefined,
        [ts.factory.createStringLiteral("Division by zero")]
    )
);

// 创建 `if` 语句：if (b === 0) { throw new Error("Division by zero"); }
const ifThrow = ts.factory.createIfStatement(
    conditionThrow,
    ts.factory.createBlock([throwExpression], true),
    undefined
);

// 创建返回表达式：a / b
const returnExpressionThrow = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('a'),
    ts.factory.createToken(ts.SyntaxKind.SlashToken),
    ts.factory.createIdentifier('b')
);

// 创建 `return` 语句：return a / b;
const returnStatementThrow = ts.factory.createReturnStatement(returnExpressionThrow);

// 创建函数体块
const functionBodyThrow = ts.factory.createBlock(
    [ifThrow, returnStatementThrow],
    true
);

// 创建函数声明：function divide(a: number, b: number): number { ... }
const divideFunction = ts.factory.createFunctionDeclaration(
    undefined,
    undefined,
    'divide',
    undefined,
    [paramAThrow, paramBThrow],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    functionBodyThrow
);

// 创建源文件并打印代码
const sourceFileThrow = ts.factory.createSourceFile(
    [divideFunction],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeThrow = printer.printNode(ts.EmitHint.Unspecified, sourceFileThrow, sourceFileThrow);
console.log(codeThrow);

/**
 * 生成的代码：
 * function divide(a: number, b: number): number {
 *   if (b === 0) {
 *     throw new Error("Division by zero");
 *   }
 *   return a / b;
 * }
 * 
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元运算，如 b === 0。
 * ts.factory.createThrowStatement：创建 throw 语句节点，用于表示抛出异常，如 throw new Error("Division by zero")。
 * ts.factory.createNewExpression：创建 new 表达式节点，用于表示创建实例，如 new Error("Division by zero")。
 * ts.factory.createFunctionDeclaration：创建函数声明节点，用于表示函数声明，包含名称、参数、返回类型和函数体。如 function divide(a: number, b: number): number { ... }。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 divide 函数。
 */