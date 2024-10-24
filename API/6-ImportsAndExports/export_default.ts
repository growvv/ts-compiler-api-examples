import * as ts from 'typescript';

// 创建表达式语句：console.log(message);
const logStatement = ts.factory.createExpressionStatement(
    ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
        undefined,
        [ts.factory.createIdentifier('message')]
    )
);

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

// 创建类声明：class Logger { log(message: string) { console.log(message); } }
const loggerClass = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword), ts.factory.createModifier(ts.SyntaxKind.DefaultKeyword)],
    'Logger',
    undefined,
    undefined,
    [
        ts.factory.createMethodDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'log',
            undefined,
            undefined,
            [ parameter ],
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
            ts.factory.createBlock([logStatement], true)
        )
    ]
);

// 创建源文件并打印代码
const sourceFileDefaultExport = ts.factory.createSourceFile(
    [loggerClass],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeDefaultExport = printer.printNode(ts.EmitHint.Unspecified, sourceFileDefaultExport, sourceFileDefaultExport);
console.log(codeDefaultExport);

/**
 * 生成的代码：
 * export default class Logger {
 *   public log(message: string) {
 *     console.log(message);
 *   }
 * }
 * 
 * ts.factory.createModifier：创建修饰符节点，用于表示修饰符，如 public。
 * ts.factory.createMethodDeclaration：创建方法声明节点，用于表示类的方法，如 log(message: string) { console.log(message); }。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 string。
 * ts.factory.createClassDeclaration：创建类声明节点，用于表示类，如 class Logger { ... }。
 */