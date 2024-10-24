import * as ts from 'typescript';

// 创建参数声明：a: number
const paramA = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'a',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
);

// 创建参数声明：b: number
const paramB = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'b',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
);

// 创建返回表达式：a + b
const returnExpression = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('a'),
    ts.factory.createToken(ts.SyntaxKind.PlusToken),
    ts.factory.createIdentifier('b')
);

// 创建 return 语句：return a + b;
const returnStatement = ts.factory.createReturnStatement(returnExpression);

// 创建函数体块
const functionBody = ts.factory.createBlock(
    [returnStatement],
    true
);

// 创建函数声明：function sum(a: number, b: number): number { return a + b; }
const sumFunction = ts.factory.createFunctionDeclaration(
    undefined,
    undefined,
    'sum',
    undefined,
    [paramA, paramB],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    functionBody
);

// 创建源文件并打印代码
const sourceFileReturn = ts.factory.createSourceFile(
    [sumFunction],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeReturn = printer.printNode(ts.EmitHint.Unspecified, sourceFileReturn, sourceFileReturn);
console.log(codeReturn);

/**
 * 生成的代码：
 * function sum(a: number, b: number): number {
 *   return a + b;
 * }
 * 
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 a: number。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 number。
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元运算，如 a + b。
 * ts.factory.createReturnStatement：创建返回语句节点，用于表示返回语句，如 return a + b。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { return a + b; }。
 * ts.factory.createFunctionDeclaration：创建函数声明节点，用于表示函数声明，包含名称、参数、返回类型和函数体。如 function sum(a: number, b: number): number { return a + b; }。
 * 
 */
