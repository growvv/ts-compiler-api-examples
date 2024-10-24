import * as ts from 'typescript';

// 创建函数：export function log(message: string): void { ... }
const logFunction = ts.factory.createFunctionDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    undefined,
    'log',
    undefined,
    [
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            'message',
            undefined,
            ts.factory.createTypeReferenceNode('string', undefined),
            undefined
        )
    ],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
    ts.factory.createBlock(
        [
            ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier('console'),
                        'log'
                    ),
                    undefined,
                    [ts.factory.createIdentifier('message')]
                )
            )
        ],
        true
    )
);

// 创建常量：export const PI: number = 3.1415;
const piConstant = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'PI',
                undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                ts.factory.createNumericLiteral(3.1415)
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建命名空间：export namespace Utilities { ... }
const utilitiesNamespace = ts.factory.createModuleDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier('Utilities'),
    ts.factory.createModuleBlock([logFunction, piConstant]),
    ts.NodeFlags.Namespace
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [utilitiesNamespace],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export namespace Utilities {
 *   export function log(message: string): void {
 *     console.log(message);
 *   }
 *   export const PI: number = 3.1415;
 * }
 * 
 * ts.factory.createModuleDeclaratio 创建命名空间节点，用于表示命名空间，如 namespace Utilities { ... }。
 * 模块体：使用 ts.factory.createModuleBlock 包含模块内的声明，如函数和常量。
 */