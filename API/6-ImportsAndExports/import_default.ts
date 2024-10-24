import * as ts from 'typescript';

// 创建默认导入：import React from 'react';
const defaultImport = ts.factory.createImportDeclaration(
    undefined, // 修饰符数组
    ts.factory.createImportClause(
        false, // 是否为类型导入
        ts.factory.createIdentifier('React'), // 默认导入的名称
        undefined // 命名导入列表
    ),
    ts.factory.createStringLiteral('react'), // 模块名称
    undefined // assert clause
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [defaultImport],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * import React from 'react';
 * 
 * ts.factory.createImportDeclaration：创建导入声明节点，用于表示导入语句，如 import React from 'react'。
 * ts.factory.createImportClause：创建导入子句节点，用于表示导入的名称和命名导入列表，如 React。
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 React。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 'react'。
 */