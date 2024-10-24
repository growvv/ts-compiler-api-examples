import * as ts from 'typescript';

// 创建标签：outerLoop
const label = ts.factory.createLabeledStatement(
    'outerLoop',
    ts.factory.createEmptyStatement()
);

// 创建标签语句的主体 `for` 循环
const innerForLoop = ts.factory.createForStatement(
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'j',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(0)
            )
        ],
        ts.NodeFlags.Let
    ),
    ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('j'),
        ts.factory.createToken(ts.SyntaxKind.LessThanToken),
        ts.factory.createNumericLiteral(3)
    ),
    ts.factory.createPostfixIncrement(ts.factory.createIdentifier('j')),
    ts.factory.createBlock([
        // if (i === j) { continue outerLoop; }
        ts.factory.createIfStatement(
            ts.factory.createBinaryExpression(
                ts.factory.createIdentifier('i'),
                ts.factory.createToken(ts.SyntaxKind.EqualsEqualsEqualsToken),
                ts.factory.createIdentifier('j')
            ),
            ts.factory.createBlock([
                ts.factory.createContinueStatement('outerLoop')
            ], true),
            undefined
        ),
        // console.log(`i=${i}, j=${j}`);
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
                undefined,
                [
                    ts.factory.createTemplateExpression(
                        ts.factory.createTemplateHead("i="),
                        [
                            ts.factory.createTemplateSpan(
                                ts.factory.createIdentifier('i'),
                                ts.factory.createTemplateMiddle(", j=")
                            ),
                            ts.factory.createTemplateSpan(
                                ts.factory.createIdentifier('j'),
                                ts.factory.createTemplateTail("")
                            )
                        ]
                    )
                ]
            )
        )
    ], true)
);

// 创建外层 `for` 循环：for (let i = 0; i < 3; i++) { ... }
const outerForLoop = ts.factory.createForStatement(
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'i',
                undefined,
                undefined,
                ts.factory.createNumericLiteral(0)
            )
        ],
        ts.NodeFlags.Let
    ),
    ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('i'),
        ts.factory.createToken(ts.SyntaxKind.LessThanToken),
        ts.factory.createNumericLiteral(3)
    ),
    ts.factory.createPostfixIncrement(ts.factory.createIdentifier('i')),
    ts.factory.createBlock([
        innerForLoop
    ], true)
);

// 完善标签语句，将 `for` 循环作为标签的主体
const labeledOuterForLoop = ts.factory.createLabeledStatement(
    'outerLoop',
    outerForLoop
);

// 创建源文件并打印代码
const sourceFileLabel = ts.factory.createSourceFile(
    [labeledOuterForLoop],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeLabel = printer.printNode(ts.EmitHint.Unspecified, sourceFileLabel, sourceFileLabel);
console.log(codeLabel);

/**
 * 生成的代码：
 * outerLoop: for (let i = 0; i < 3; i++) {
 *   for (let j = 0; j < 3; j++) {
 *     if (i === j) {
 *       continue outerLoop;
 *     }
 *     console.log(`i=${i}, j=${j}`);
 *   }
 * }
 * 
 * ts.factory.createLabeledStatement：创建标签语句节点，用于标记代码块的位置，以便在代码中跳转到该位置。
 * ts.factory.createContinueStatement：创建 continue 语句节点，用于表示跳过当前循环的剩余部分。
 */