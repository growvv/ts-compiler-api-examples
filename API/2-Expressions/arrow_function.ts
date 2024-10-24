import * as ts from 'typescript';

// 创建变量声明：const add = (a: number, b: number): number => { return a + b; };
const addVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'add',
                undefined,
                undefined,
                ts.factory.createArrowFunction(
                    undefined,
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
                    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    ts.factory.createBlock(
                        [
                            ts.factory.createReturnStatement(
                                ts.factory.createBinaryExpression(
                                    ts.factory.createIdentifier('a'),
                                    ts.factory.createToken(ts.SyntaxKind.PlusToken),
                                    ts.factory.createIdentifier('b')
                                )
                            )
                        ],
                        true
                    )
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const multiply = (a: number, b: number) => a * b;
const multiplyVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'multiply',
                undefined,
                undefined,
                ts.factory.createArrowFunction(
                    undefined,
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
                    undefined,
                    ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                    ts.factory.createBinaryExpression(
                        ts.factory.createIdentifier('a'),
                        ts.factory.createToken(ts.SyntaxKind.AsteriskToken),
                        ts.factory.createIdentifier('b')
                    )
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [addVariable, multiplyVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * const add = (a: number, b: number): number => { return a + b; };
 * const multiply = (a: number, b: number) => a * b;
 * 
 * 箭头函数是一种简洁的函数表达式，它使用箭头（=>）来分隔参数和函数体。
 * 箭头函数可以省略函数体的大括号和 return 关键字，如果函数体只有一条语句。
 * 
 * ts.factory.createArrowFunction：创建箭头函数表达式，包括参数、返回类型、箭头 (=>)、以及函数体。
 * 
 * 块级函数体 vs 简化表达式：箭头函数可以有块级函数体（使用 {} 和 return）或直接返回表达式。
 * 
 */