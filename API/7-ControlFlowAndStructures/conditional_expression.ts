import * as ts from 'typescript';

// 创建参数声明：isActive: boolean
const paramIsActive = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'isActive',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
    undefined
);

// 创建三元运算符表达式：isActive ? "Active" : "Inactive"
const ternaryExpression = ts.factory.createConditionalExpression(
    ts.factory.createIdentifier('isActive'),
    ts.factory.createToken(ts.SyntaxKind.QuestionToken),
    ts.factory.createStringLiteral("Active"),
    ts.factory.createToken(ts.SyntaxKind.ColonToken),
    ts.factory.createStringLiteral("Inactive")
);

// 创建表达式语句：console.log(isActive ? "Active" : "Inactive");
const expressionStatement = ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
        undefined,
        [ternaryExpression]
    )
);

// 创建块语句
const block = ts.factory.createBlock(
    [expressionStatement],
    true
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [block],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * {
 *   console.log(isActive ? "Active" : "Inactive");
 * }
 * 
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 isActive: boolean。
 * ts.factory.createConditionalExpression：创建三元表达式节点，用于表示三元运算，如 isActive ? "Active" : "Inactive"。
 * ts.factory.createQuestionToken：创建问号标记节点，用于表示三元运算符的问号部分。
 * ts.factory.createColonToken：创建冒号标记节点，用于表示三元运算符的冒号部分。
 */