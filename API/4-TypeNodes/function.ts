import * as ts from 'typescript';

// 创建类型别名：type Greeter = (name: string) => void;
const greeterTypeAlias = ts.factory.createTypeAliasDeclaration(
    undefined,
    'Greeter',
    undefined,
    ts.factory.createFunctionTypeNode(
        undefined,
        [
            ts.factory.createParameterDeclaration(
                //   undefined,
                undefined,
                undefined,
                'name',
                undefined,
                ts.factory.createTypeReferenceNode('string', undefined),
                undefined
            )
        ],
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword)
    )
);

// 创建变量声明：let greet: Greeter = (name) => { console.log(`Hello, ${name}!`); };
const greetVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'greet',
                undefined,
                ts.factory.createTypeReferenceNode('Greeter', undefined),
                ts.factory.createArrowFunction(
                    undefined,
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
                    undefined,
                    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
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
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [greeterTypeAlias, greetVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * type Greeter = (name: string) => void;
 * let greet: Greeter = (name) => { console.log(`Hello, ${name}!`); };
 * 
 * ts.factory.createTypeAliasDeclaration：创建类型别名节点，用于表示类型别名，如 type Greeter = (name: string) => void;。
 * ts.factory.createFunctionTypeNode：创建函数类型节点，用于表示函数类型，如 (name: string) => void。
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 name: string。
 * ts.factory.createTypeReferenceNode：创建类型引用节点，用于表示类型引用，如 string。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 void。
 * ts.factory.createVariableStatement：创建变量声明节点，用于表示变量声明，如 let greet: Greeter = (name) => { console.log(`Hello, ${name}!`); };。
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 let greet: Greeter。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 greet: Greeter = (name) => { console.log(`Hello, ${name}!`); }。
 * ts.factory.createArrowFunction：创建箭头函数节点，用于表示箭头函数，如 (name) => { console.log(`Hello, ${name}!`); }。
 * ts.factory.createToken：创建标记节点，用于表示标记，如 =。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { console.log(`Hello, ${name}!`); }。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log(`Hello, ${name}!`);。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log(`Hello, ${name}!`)。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 */