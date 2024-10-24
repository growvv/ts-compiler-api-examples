import * as ts from 'typescript';

// 创建类型别名：export type ID = string | number;
const idTypeAlias = ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    'ID',
    undefined,
    ts.factory.createUnionTypeNode([
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    ])
);

// 创建类型别名：type Callback = (error: Error | null, result?: any) => void;
const callbackTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'Callback',
    undefined,
    ts.factory.createFunctionTypeNode(
        undefined,
        [
            ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                'error',
                undefined,
                ts.factory.createUnionTypeNode([
                    ts.factory.createTypeReferenceNode('Error', undefined),
                    ts.factory.createLiteralTypeNode(ts.factory.createNull())
                ]),
                undefined
            ),
            ts.factory.createParameterDeclaration(
                undefined,
                undefined,
                'result',
                ts.factory.createToken(ts.SyntaxKind.QuestionToken),
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                undefined
            )
        ],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [idTypeAlias, callbackTypeAlias],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export type ID = string | number;
 * type Callback = (error: Error | null, result?: any) => void;
 * 
 * 类型别名是一个新名字，可以用来引用现有类型。类型别名有助于提高代码的可读性和可维护性。
 * 
 * ts.factory.createTypeAliasDeclaration：创建一个类型别名声明。
 * 修饰符：如 export 使用 ts.factory.createModifier。
 * 类型定义：可以是联合类型、函数类型等。使用 ts.factory.createUnionTypeNode 或 ts.factory.createFunctionTypeNode 等方法来构建复杂类型。
 */
