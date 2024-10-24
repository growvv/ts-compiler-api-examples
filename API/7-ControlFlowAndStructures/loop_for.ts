import * as ts from 'typescript';

// 创建初始化器：let i = 0
const initializer = ts.factory.createVariableDeclarationList(
    [
        ts.factory.createVariableDeclaration(
            'i',
            undefined,
            undefined,
            ts.factory.createNumericLiteral(0)
        )
    ],
    ts.NodeFlags.Let
);

// 创建条件表达式：i < 5
const condition = ts.factory.createBinaryExpression(
    ts.factory.createIdentifier('i'),
    ts.factory.createToken(ts.SyntaxKind.LessThanToken),
    ts.factory.createNumericLiteral(5)
);

// 创建增量器：i++
const incrementor = ts.factory.createPostfixIncrement(ts.factory.createIdentifier('i'));

// 创建循环体：{ console.log(i); }
const loopBody = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'log'),
            undefined,
            [ts.factory.createIdentifier('i')]
        )
    )
], true);

// 创建 for 循环语句
const forLoop = ts.factory.createForStatement(
    initializer,
    condition,
    incrementor,
    loopBody
);

// 创建源文件并打印代码
const sourceFileFor = ts.factory.createSourceFile(
    [forLoop],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeFor = printer.printNode(ts.EmitHint.Unspecified, sourceFileFor, sourceFileFor);
console.log(codeFor);

/**
 * 生成的代码：
 * for (let i = 0; i < 5; i++) {
 *   console.log(i);
 * }
 * 
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 let i = 0。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 i = 0。
 * ts.factory.createNumericLiteral：创建数字字面量节点，用于表示数字字面量，如 0。
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元表达式，如 i < 5。
 * ts.factory.createToken：创建标记节点，用于表示标记，如 <。
 * ts.factory.createPostfixIncrement：创建后缀递增表达式节点，用于表示后缀递增表达式，如 i++。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { console.log(i); }。
 * ts.factory.createExpressionStatement：创建表达式语句节点，将表达式转换成语句，如 console.log(i);。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 console.log(i)。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 console.log。
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 i。
 * ts.factory.createForStatement：创建 for 循环语句节点，用于表示 for 循环，包含初始化器、条件、增量器和循环体。如 for (let i = 0; i < 5; i++) { console.log(i); }。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 for 循环语句。
 * 
 */
