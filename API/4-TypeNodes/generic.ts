import * as ts from 'typescript';

// 创建类型别名：type GenericArray<T> = T[];
const genericArrayTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'GenericArray',
    [
        ts.factory.createTypeParameterDeclaration(
            undefined,
            ts.factory.createIdentifier('T'),
            undefined,
            undefined
        )
    ],
    ts.factory.createArrayTypeNode(
        ts.factory.createTypeReferenceNode('T', undefined)
    )
);

// 创建变量声明：let numberArray: GenericArray<number> = [1, 2, 3];
const numberArrayVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'numberArray',
                undefined,
                ts.factory.createTypeReferenceNode(
                    'GenericArray',
                    [ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)]
                ),
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createNumericLiteral(1),
                        ts.factory.createNumericLiteral(2),
                        ts.factory.createNumericLiteral(3)
                    ],
                    false
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：let stringArray: GenericArray<string> = ["one", "two", "three"];
const stringArrayVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'stringArray',
                undefined,
                ts.factory.createTypeReferenceNode(
                    'GenericArray',
                    [ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)]
                ),
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createStringLiteral("one"),
                        ts.factory.createStringLiteral("two"),
                        ts.factory.createStringLiteral("three")
                    ],
                    false
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建接口：interface Response<T> { data: T; error: string | null; }
const responseInterface = ts.factory.createInterfaceDeclaration(
    undefined,
    'Response',
    [
        ts.factory.createTypeParameterDeclaration(
            undefined,
            ts.factory.createIdentifier('T'),
            undefined,
            undefined
        )
    ],
    undefined,
    [
        ts.factory.createPropertySignature(
            undefined,
            'data',
            undefined,
            ts.factory.createTypeReferenceNode('T', undefined)
        ),
        ts.factory.createPropertySignature(
            undefined,
            'error',
            undefined,
            ts.factory.createUnionTypeNode([
                ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                ts.factory.createLiteralTypeNode(ts.factory.createNull())
            ])
        )
    ]
);

// 创建变量声明：let userResponse: Response<IUser>;
const userResponseVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'userResponse',
                undefined,
                ts.factory.createTypeReferenceNode(
                    'Response',
                    [ts.factory.createTypeReferenceNode('IUser', undefined)]
                ),
                undefined
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：let numberResponse: Response<number>;
const numberResponseVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'numberResponse',
                undefined,
                ts.factory.createTypeReferenceNode(
                    'Response',
                    [ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)]
                ),
                undefined
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [genericArrayTypeAlias, numberArrayVar, stringArrayVar, responseInterface, userResponseVar, numberResponseVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * type GenericArray<T> = T[];
 * let numberArray: GenericArray<number> = [1, 2, 3];
 * let stringArray: GenericArray<string> = ["one", "two", "three"];
 * 
 * interface Response<T> { data: T; error: string | null; }
 * let userResponse: Response<IUser>;
 * let numberResponse: Response<number>;
 * 
 * createTypeAliasDeclaration 方法用于创建类型别名，接收名称、类型参数、类型节点作为参数。
 * createTypeParameterDeclaration 方法用于创建类型参数，接收名称、约束、默认值作为参数。
 * createArrayTypeNode 方法用于创建数组类型，接收元素类型节点作为参数。
 * createTypeReferenceNode 方法用于创建类型引用，接收名称、类型参数节点作为参数。
 * createInterfaceDeclaration 方法用于创建接口，接收名称、类型参数、继承、成员、修饰符作为参数。
 * createPropertySignature 方法用于创建属性签名，接收名称、类型、修饰符作为参数。
 */