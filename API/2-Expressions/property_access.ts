import * as ts from 'typescript';

// 创建变量声明：const length = str.length;
const lengthVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'length',
                undefined,
                undefined,
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier('str'),
                    'length'
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const firstItem = arr[0];
const firstItemVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'firstItem',
                undefined,
                undefined,
                ts.factory.createElementAccessExpression(
                    ts.factory.createIdentifier('arr'),
                    ts.factory.createNumericLiteral(0)
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const userName = user.name;
const userNameVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'userName',
                undefined,
                undefined,
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier('user'),
                    'name'
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const consoleLog = console.log;
const consoleLogVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'consoleLog',
                undefined,
                undefined,
                ts.factory.createPropertyAccessExpression(
                    ts.factory.createIdentifier('console'),
                    'log'
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [lengthVariable, firstItemVariable, userNameVariable, consoleLogVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印代码
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 打印的输出：
 * const length = str.length;
 * const firstItem = arr[0];
 * const userName = user.name;
 * const consoleLog = console.log;
 * 
 * createPropertyAccessExpression 创建一个属性访问表达式，如 obj.prop 或 obj['prop']。
 */