import * as ts from 'typescript';

// 创建参数声明：message: string
const parameter =
ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'message',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    undefined
)

// 创建类声明：class Utility { static log(message: string) { console.log(message); } }
const utilityClass = ts.factory.createClassDeclaration(
    undefined,
    'Utility',
    undefined,
    undefined,
    [
        ts.factory.createMethodDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.StaticKeyword), ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'log',
            undefined,
            undefined,
            [
                parameter
            ],
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
            ts.factory.createBlock(
                [
                    ts.factory.createExpressionStatement(
                        ts.factory.createCallExpression(
                            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                            undefined,
                            [ts.factory.createIdentifier('message')]
                        )
                    )
                ],
                true
            )
        )
    ]
);

// 创建导出赋值：export = Utility;
const exportAssignment = ts.factory.createExportAssignment(
    undefined,
    true, // isExportEquals，true 表示使用 export = 语法
    ts.factory.createIdentifier('Utility')
);

// 创建源文件并打印代码
const sourceFileExportAssignment = ts.factory.createSourceFile(
    [utilityClass, exportAssignment],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeExportAssignment = printer.printNode(ts.EmitHint.Unspecified, sourceFileExportAssignment, sourceFileExportAssignment);
console.log(codeExportAssignment);

/**
 * 生成的代码：
 * class Utility {
 *   public static log(message: string) {
 *    console.log(message);
 *  }
 * }
 * export = Utility;
 * 
 * ts.factory.createModifier：创建修饰符节点，用于表示修饰符，如 public。
 * ts.factory.createExportAssignment：创建导出赋值节点，用于表示 export = 语法，如 export = Utility。
*/