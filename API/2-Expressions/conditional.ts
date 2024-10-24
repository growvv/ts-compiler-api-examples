import * as ts from 'typescript';

// 创建变量声明：const status = isActive ? "Active" : "Inactive";
const statusVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'status',
                undefined,
                undefined,
                ts.factory.createConditionalExpression(
                    ts.factory.createIdentifier('isActive'),
                    ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                    ts.factory.createStringLiteral("Active"),
                    ts.factory.createToken(ts.SyntaxKind.ColonToken),
                    ts.factory.createStringLiteral("Inactive")
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const message = age >= 18 ? "Adult" : "Minor";
const messageVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'message',
                undefined,
                undefined,
                ts.factory.createConditionalExpression(
                    ts.factory.createBinaryExpression(
                        ts.factory.createIdentifier('age'),
                        ts.factory.createToken(ts.SyntaxKind.GreaterThanEqualsToken),
                        ts.factory.createNumericLiteral(18)
                    ),
                    ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                    ts.factory.createStringLiteral("Adult"),
                    ts.factory.createToken(ts.SyntaxKind.ColonToken),
                    ts.factory.createStringLiteral("Minor")
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [statusVariable, messageVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印代码
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

// 生成的代码：
// const status = isActive ? "Active" : "Inactive";
// const message = age >= 18 ? "Adult" : "Minor";
// 
// 包括条件、问号、真值和冒号及假值。
// ts.factory.createConditionalExpression 创建三元表达式节点，用于表示三元运算，如 isActive ? "Active" : "Inactive"。