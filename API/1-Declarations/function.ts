import * as ts from 'typescript';

// 创建函数声明：function greet(name: string): void { console.log(`Hello, ${name}!`); }
const greetFunction = ts.factory.createFunctionDeclaration(
    undefined,
    undefined,
    'greet',
    undefined,
    [
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            'name',
            undefined,
            ts.factory.createTypeReferenceNode('string', undefined),
            undefined
        )
    ],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
    ts.factory.createBlock(
        [
            ts.factory.createExpressionStatement(
                ts.factory.createCallExpression(
                    ts.factory.createPropertyAccessExpression(
                        ts.factory.createIdentifier('console'),
                        'log'
                    ),
                    undefined,
                    [
                        ts.factory.createTemplateExpression(
                            ts.factory.createTemplateHead('Hello, '),
                            [
                                ts.factory.createTemplateSpan(
                                    ts.factory.createIdentifier('name'),
                                    ts.factory.createTemplateTail('!')
                                )
                            ]
                        )
                    ]
                )
            )
        ],
        true
    )
);

// 创建导出函数声明：export function add(a: number, b: number): number { return a + b; }
const addFunction = ts.factory.createFunctionDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    undefined,
    'add',
    undefined,
    [
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            'a',
            undefined,
            ts.factory.createTypeReferenceNode('number', undefined),
            undefined
        ),
        ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            'b',
            undefined,
            ts.factory.createTypeReferenceNode('number', undefined),
            undefined
        )
    ],
    ts.factory.createTypeReferenceNode('number', undefined),
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

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [greetFunction, addFunction],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * function greet(name: string): void { console.log(`Hello, ${name}!`); }
 * export function add(a: number, b: number): number { return a + b; }
 * 
 * ts.factory.createFunctionDeclaration：创建函数声明，包括修饰符、名称、参数、返回类型、以及函数体。
 * ts.factory.createParameterDeclaration：创建参数声明，包括名称、类型、以及可选性。
 * ts.factory.createTypeReferenceNode：创建类型引用节点，用于表示类型引用，如 string 和 number。
 * ts.factory.createBlock：创建代码块节点，用于表示函数体，如 { console.log(`Hello, ${name}!`); }。
 * ts.factory.createReturnStatement：创建返回语句节点，用于表示函数返回值，如 return a + b;。
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元运算，如 a + b。
 * ts.factory.createTemplateExpression：创建模板表达式节点，用于表示模板字符串，如 `Hello, ${name}!`。
 */