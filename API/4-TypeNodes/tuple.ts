import * as ts from 'typescript';


// 创建类型别名：type Point = [number, number];
const pointTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'Point',
    undefined,
    ts.factory.createTupleTypeNode([
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
    ])
);

// 创建变量声明：let coordinates: Point = [10, 20];
const coordinatesVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'coordinates',
                undefined,
                ts.factory.createTypeReferenceNode('Point', undefined),
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createNumericLiteral(10),
                        ts.factory.createNumericLiteral(20)
                    ],
                    true // true 表示这是一个元组
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [pointTypeAlias, coordinatesVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * type Point = [number, number];
 * let coordinates: Point = [10, 20];
 * 
 * createTupleTypeNode 方法用于创建元组类型，接收一个类型节点数组作为参数。
 */