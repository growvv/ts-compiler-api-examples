import * as ts from 'typescript';

// 创建类型别名：type ID = string | number;
const idTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'ID',
    undefined,
    ts.factory.createUnionTypeNode([
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    ])
);

// 创建变量声明：let identifier: ID;
const identifierVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'identifier',
                undefined,
                ts.factory.createTypeReferenceNode('ID', undefined),
                undefined
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：let value: string | number | boolean;
const valueVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'value',
                undefined,
                ts.factory.createUnionTypeNode([
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
                ]),
                undefined
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [idTypeAlias, identifierVar, valueVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/** 
 * 生成的代码：
 * type ID = string | number;
 * let identifier: ID;
 * let value: string | number | boolean;
 * 
 * ts.factory.createTypeAliasDeclaration：创建类型别名节点，用于表示类型别名声明，如 type ID = string | number。
 * ts.factory.createUnionTypeNode：创建联合类型节点，用于表示联合类型，如 string | number。
 * ts.factory.createVariableStatement：创建变量声明节点，用于表示变量声明语句，如 let identifier: ID。
*/