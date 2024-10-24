import * as ts from 'typescript';

// 创建函数：export function square(x: number): number { return x * x; }
const squareFunction = ts.factory.createFunctionDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    undefined,
    'square',
    undefined,
    [
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            'x',
            undefined,
            ts.factory.createTypeReferenceNode('number', undefined),
            undefined
        )
    ],
    ts.factory.createTypeReferenceNode('number', undefined),
    ts.factory.createBlock(
        [
            ts.factory.createReturnStatement(
                ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier('x'),
                    ts.SyntaxKind.AsteriskToken,
                    ts.factory.createIdentifier('x')
                )
            )
        ],
        true
    )
);

// 创建常量：export const E: number = 2.718;
const eConstant = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'E',
                undefined,
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                ts.factory.createNumericLiteral(2.718)
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建模块：export module MathUtils { ... }
const mathUtilsModule = ts.factory.createModuleDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier('MathUtils'),
    ts.factory.createModuleBlock([squareFunction, eConstant]),
    ts.NodeFlags.None  // 区别在这里，module 为 None，namespace 为 Namespace
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [mathUtilsModule],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印代码
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export module MathUtils {
 *    export function square(x: number): number {
 *       return x * x;
 *   }
 *   export const E: number = 2.718;
 * }
 * 
 * ts.factory.createModuleDeclaration：与命名空间类似，用于创建模块声明。
 * 模块体：使用 ts.factory.createModuleBlock，包含模块内的声明，如函数和常量。
 * 注意：在现代 TypeScript 中，推荐使用 namespace 替代 module，因为 module 已被废弃。但 ts.factory 仍然支持创建 module 声明。
 */