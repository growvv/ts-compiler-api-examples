import * as ts from 'typescript';

// 创建类声明：export class Person { ... }
const personClass = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    'Person',
    undefined,
    undefined,
    [
        // private name: string;
        ts.factory.createPropertyDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
            'name',
            undefined,
            ts.factory.createTypeReferenceNode('string', undefined),
            undefined
        ),
        // protected age: number;
        ts.factory.createPropertyDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.ProtectedKeyword)],
            'age',
            undefined,
            ts.factory.createTypeReferenceNode('number', undefined),
            undefined
        ),
        // constructor(name: string, age: number) { ... }
        ts.factory.createConstructorDeclaration(
            undefined,
            [
                ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    'name',
                    undefined,
                    ts.factory.createTypeReferenceNode('string', undefined),
                    undefined
                ),
                ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    'age',
                    undefined,
                    ts.factory.createTypeReferenceNode('number', undefined),
                    undefined
                )
            ],
            ts.factory.createBlock(
                [
                    // this.name = name;
                    ts.factory.createExpressionStatement(
                        ts.factory.createBinaryExpression(
                            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'name'),
                            ts.SyntaxKind.EqualsToken,
                            ts.factory.createIdentifier('name')
                        )
                    ),
                    // this.age = age;
                    ts.factory.createExpressionStatement(
                        ts.factory.createBinaryExpression(
                            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'age'),
                            ts.SyntaxKind.EqualsToken,
                            ts.factory.createIdentifier('age')
                        )
                    )
                ],
                true
            )
        ),
        // public greet(): void { ... }
        ts.factory.createMethodDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'greet',
            undefined,
            undefined,
            [],
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
            ts.factory.createBlock(
                [
                    ts.factory.createExpressionStatement(
                        ts.factory.createCallExpression(
                            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                            undefined,
                            [
                                ts.factory.createTemplateExpression(
                                    ts.factory.createTemplateHead('Hello, my name is '),
                                    [
                                        ts.factory.createTemplateSpan(
                                            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'name'),
                                            ts.factory.createTemplateTail(' and I am ')
                                        ),
                                        ts.factory.createTemplateSpan(
                                            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'age'),
                                            ts.factory.createTemplateTail(' years old.')
                                        )
                                    ]
                                )
                            ]
                        )
                    )
                ],
                true
            )
        )
    ]
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [personClass],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export class Person {
 *    private name: string;
 *    protected age: number;
 *    constructor(name: string, age: number) {
 *      this.name = name;
 *      this.age = age;
 *    }
 *   public greet(): void {
 *     console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
 *   }
 * }
 * 
 * ts.factory.createClassDeclaration：创建类声明，包括修饰符、名称、基类、接口、以及类体。
 * ts.factory.createPropertyDeclaration：创建属性声明，包括修饰符、名称、类型、以及初始值。
 * ts.factory.createConstructorDeclaration：创建构造函数声明，包括参数、以及构造函数体。
 * 
 */