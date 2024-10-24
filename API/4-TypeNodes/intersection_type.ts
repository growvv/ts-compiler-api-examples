import * as ts from 'typescript';

// 创建接口：interface A { a: number; }
const interfaceA = ts.factory.createInterfaceDeclaration(
    undefined,
    'A',
    undefined,
    undefined,
    [
        ts.factory.createPropertySignature(
            undefined,
            'a',
            undefined,
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
        )
    ]
);

// 创建接口：interface B { b: string; }
const interfaceB = ts.factory.createInterfaceDeclaration(
    undefined,
    'B',
    undefined,
    undefined,
    [
        ts.factory.createPropertySignature(
            undefined,
            'b',
            undefined,
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        )
    ]
);

// 创建类型别名：type AB = A & B;
const abTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'AB',
    undefined,
    ts.factory.createIntersectionTypeNode([
        ts.factory.createTypeReferenceNode('A', undefined),
        ts.factory.createTypeReferenceNode('B', undefined)
    ])
);

// 创建变量声明：let ab: AB = { a: 1, b: "Hello" };
const abVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'ab',
                undefined,
                ts.factory.createTypeReferenceNode('AB', undefined),
                ts.factory.createObjectLiteralExpression(
                    [
                        ts.factory.createPropertyAssignment('a', ts.factory.createNumericLiteral(1)),
                        ts.factory.createPropertyAssignment('b', ts.factory.createStringLiteral("Hello"))
                    ],
                    true
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [interfaceA, interfaceB, abTypeAlias, abVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * interface A {
 *     a: number;
 * }
 * 
 * interface B {
 *     b: string;
 * }
 * 
 * type AB = A & B;
 * 
 * let ab: AB = { a: 1, b: "Hello" };
 * 
 * ts.factory.createIntersectionTypeNode：创建交叉类型节点，用于表示交叉类型，如 A & B。
 * ts.factory.createTypeReferenceNode：创建类型引用节点，用于表示类型引用，如 A。
 * ts.factory.createTypeAliasDeclaration：创建类型别名节点，用于表示类型别名，如 type AB = A & B。
 * ts.factory.createInterfaceDeclaration：创建接口节点，用于表示接口，如 interface A。
 * ts.factory.createPropertySignature：创建属性签名节点，用于表示属性签名，如 a: number。
 * ts.factory.createVariableStatement：创建变量声明节点，用于表示变量声明，如 let ab: AB = { a: 1, b: "Hello" }。
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 let ab。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 ab。
 * ts.factory.createObjectLiteralExpression：创建对象字面量节点，用于表示对象字面量，如 { a: 1, b: "Hello" }。
 * ts.factory.createPropertyAssignment：创建属性赋值节点，用于表示属性赋值，如 a: 1。
 */