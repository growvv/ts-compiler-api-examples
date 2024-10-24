import * as ts from 'typescript';

// 创建参数声明：a: number
const paramANamedExports = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'a',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
)
// 创建参数声明：b: number
const paramBNamedExports = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'b',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
)

// 创建函数声明：export function add(a: number, b: number): number { return a + b; }
const addFunction = ts.factory.createFunctionDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    undefined,
    'add',
    undefined,
    [
        paramANamedExports,
        paramBNamedExports
    ],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.factory.createBlock(
        [
            ts.factory.createReturnStatement(
                ts.factory.createBinaryExpression(
                    ts.factory.createIdentifier('a'),
                    ts.SyntaxKind.PlusToken,
                    ts.factory.createIdentifier('b')
                )
            )
        ],
        true
    )
);

// 创建常量声明：export const PI = 3.1415;
const piConstant = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'PI',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(3.1415)
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建返回表达式：return a * b;
const returnStatement = ts.factory.createReturnStatement(
    ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('a'),
        ts.SyntaxKind.AsteriskToken,
        ts.factory.createIdentifier('b')
    )
)

// 创建类声明：export class Calculator { multiply(a: number, b: number): number { return a * b; } }
const calculatorClass = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    'Calculator',
    undefined,
    undefined,
    [
        ts.factory.createMethodDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'multiply',
            undefined,
            undefined,
            [
                paramANamedExports,
                paramBNamedExports
            ],
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
            ts.factory.createBlock(
                [
                    returnStatement
                ],
                true
            )
        )
    ]
);

// 创建源文件并打印代码
const sourceFileNamedExports = ts.factory.createSourceFile(
    [addFunction, piConstant, calculatorClass],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeNamedExports = printer.printNode(ts.EmitHint.Unspecified, sourceFileNamedExports, sourceFileNamedExports);
console.log(codeNamedExports);

/**
 * 生成的代码：
 * export function add(a: number, b: number): number {
 *   return a + b;
 * }
 * export const PI = 3.1415;
 * export class Calculator {
 *   public multiply(a: number, b: number): number {
 *     return a * b;
 *   }
 * }
 * 
 * ts.factory.createModifier：创建修饰符节点，用于表示修饰符，如 public。
 * ts.factory.createMethodDeclaration：创建方法声明节点，用于表示类的方法，如 multiply(a: number, b: number) { return a * b; }。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 number。
 * ts.factory.createClassDeclaration：创建类声明节点，用于表示类，如 class Calculator { ... }。
 */