import * as ts from 'typescript';

// 创建变量声明：const config = { apiKey: '123456', endpoint: 'https://api.example.com' };
const configVar = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'config',
                undefined,
                undefined,
                ts.factory.createObjectLiteralExpression(
                    [
                        ts.factory.createPropertyAssignment('apiKey', ts.factory.createStringLiteral('123456')),
                        ts.factory.createPropertyAssignment('endpoint', ts.factory.createStringLiteral('https://api.example.com'))
                    ],
                    true
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建导出赋值：export default config;
const exportDefaultAssignment = ts.factory.createExportAssignment(
    undefined,
    false, // isExportEquals，false 表示使用 export default 语法
    ts.factory.createIdentifier('config')
);

// 创建源文件并打印代码
const sourceFileExportDefault = ts.factory.createSourceFile(
    [configVar, exportDefaultAssignment],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeExportDefault = printer.printNode(ts.EmitHint.Unspecified, sourceFileExportDefault, sourceFileExportDefault);
console.log(codeExportDefault);

/**
 * 生成的代码：
 * const config = { 
 *   apiKey: '123456',
 *   endpoint: 'https://api.example.com'
 * };
 * export default config;
 * 
 * ts.factory.createExportAssignment：创建导出赋值节点，用于表示 export default 语法，如 export default config。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 'https://api.example.com'。
 * ts.factory.createObjectLiteralExpression：创建对象字面量节点，用于表示对象字面量
*/