import * as ts from 'typescript';

// 创建变量声明：let numbers: number[] = [1, 2, 3, 4, 5];
const numbersVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'numbers',
                undefined,
                ts.factory.createArrayTypeNode(
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
                ),
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createNumericLiteral(1),
                        ts.factory.createNumericLiteral(2),
                        ts.factory.createNumericLiteral(3),
                        ts.factory.createNumericLiteral(4),
                        ts.factory.createNumericLiteral(5)
                    ],
                    false
                )
            )
        ],
        ts.NodeFlags.Let
    )
);

// 创建变量声明：let strings: Array<string> = ["one", "two", "three"];
const stringsVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'strings',
                undefined,
                ts.factory.createTypeReferenceNode(
                    'Array',
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

// 创建变量声明：let tuples: [number, string] = [1, "one"];
const tuplesVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'tuples',
                undefined,
                ts.factory.createTupleTypeNode([
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
                ]),
                ts.factory.createArrayLiteralExpression(
                    [
                        ts.factory.createNumericLiteral(1),
                        ts.factory.createStringLiteral("one")
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
    [numbersVar, stringsVar, tuplesVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * let numbers: number[] = [1, 2, 3, 4, 5];
 * let strings: Array<string> = ["one", "two", "three"];
 * let tuples: [number, string] = [1, "one"];
 * 
 * ts.factory.createVariableStatement：创建变量声明节点，用于表示变量声明，如 let numbers: number[] = [1, 2, 3, 4, 5];。
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 let numbers: number[] = [1, 2, 3, 4, 5];。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 numbers: number[] = [1, 2, 3, 4, 5]。
 * ts.factory.createArrayTypeNode：创建数组类型节点，用于表示数组类型，如 number[]。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 number。
 * ts.factory.createArrayLiteralExpression：创建数组字面量节点，用于表示数组字面量，如 [1, 2, 3, 4, 5]。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 "one"。
 * ts.factory.createTupleTypeNode：创建元组类型节点，用于表示元组类型，如 [number, string]。
 * ts.factory.createNumericLiteral：创建数字字面量节点，用于表示数字字面量，如 1。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件。
 * ts.createPrinter：创建打印机，用于打印节点。
 * printer.printNode：打印节点。
 */