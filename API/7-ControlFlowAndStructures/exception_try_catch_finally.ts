import * as ts from 'typescript';

// 创建 try 块：{ riskyOperation(); }
const tryBlock = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createIdentifier('riskyOperation'),
            undefined,
            []
        )
    )
], true);

// 创建 catch 参数：error
const catchParam = ts.factory.createVariableDeclaration(
    'error',
    undefined,
    undefined,
    undefined
);

// 创建 catch 块：{ console.error("An error occurred:", error); }
const catchBlock = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('console'), 'error'),
            undefined,
            [
                ts.factory.createStringLiteral("An error occurred:"),
                ts.factory.createIdentifier('error')
            ]
        )
    )
], true);

// 创建 catch 子句
const catchClause = ts.factory.createCatchClause(
    catchParam,
    catchBlock
);

// 创建 finally 块：{ cleanup(); }
const finallyBlock = ts.factory.createBlock([
    ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
            ts.factory.createIdentifier('cleanup'),
            undefined,
            []
        )
    )
], true);

// 创建 `try-catch-finally` 语句
const tryCatchFinally = ts.factory.createTryStatement(
    tryBlock,
    catchClause,
    finallyBlock
);

// 创建源文件并打印代码
const sourceFileTryCatch = ts.factory.createSourceFile(
    [tryCatchFinally],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeTryCatch = printer.printNode(ts.EmitHint.Unspecified, sourceFileTryCatch, sourceFileTryCatch);
console.log(codeTryCatch);

/**
 * 生成的代码：
 * try {
 *  riskyOperation();
 * } catch (error) {
 *  console.error("An error occurred:", error);
 * } finally {
 *  cleanup();
 * }
 * 
 * ts.factory.createBlock：创建块节点，用于表示代码块，用{}包围，如 { riskyOperation(); }。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 error。
 * ts.factory.createCatchClause：创建 catch 子句节点，用于表示 catch 子句，包含参数和 catch 块。如 catch (error) { console.error("An error occurred:", error); }。
 * ts.factory.createTryStatement：创建 try 语句节点，用于表示 try 语句，包含 try 块、catch 子句和 finally 块。如 try { riskyOperation(); } catch (error) { console.error("An error occurred:", error); } finally { cleanup (); }。
*/