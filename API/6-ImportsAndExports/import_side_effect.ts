import * as ts from 'typescript';

// 创建导入声明：import './polyfills';
const sideEffectImport = ts.factory.createImportDeclaration(
    undefined,
    undefined, // 无导入子句
    ts.factory.createStringLiteral('./polyfills'),
    undefined
);

// 创建源文件并打印代码
const sourceFileSideEffect = ts.factory.createSourceFile(
    [sideEffectImport],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeSideEffect = printer.printNode(ts.EmitHint.Unspecified, sourceFileSideEffect, sourceFileSideEffect);
console.log(codeSideEffect);

/**
 * 生成的代码：
 * import './polyfills';
 * 
 * ts.factory.createImportDeclaration：创建导入声明节点，用于表示导入语句，如 import './polyfills'。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 './polyfills'。
 */
