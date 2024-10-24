import * as ts from 'typescript';

// 创建命名导入元素：useState, useEffect
const namedImports = ts.factory.createNamedImports([
    ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier('useState')),
    ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier('useEffect'))
]);

// 创建命名导入子句：{ useState, useEffect }
const importClause = ts.factory.createImportClause(
    false, // 是否为类型导入
    undefined, // 默认导入名称
    namedImports // 命名导入列表
);

// 创建导入声明：import { useState, useEffect } from 'react';
const namedImport = ts.factory.createImportDeclaration(
    undefined,
    importClause,
    ts.factory.createStringLiteral('react'),
    undefined
);

// 创建源文件并打印代码
const sourceFileNamed = ts.factory.createSourceFile(
    [namedImport],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeNamed = printer.printNode(ts.EmitHint.Unspecified, sourceFileNamed, sourceFileNamed);
console.log(codeNamed);

/**
 * 生成的代码：
 * import { useState, useEffect } from 'react';
 * 
 * ts.factory.createNamedImports：创建命名导入元素列表，用于表示命名导入的名称，如 useState, useEffect。
 * ts.factory.createImportSpecifier：创建导入元素节点，用于表示导入的名称，如 useState。
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 useState。
 * ts.factory.createImportClause：创建导入子句节点，用于表示导入的名称和命名导入列表，如 { useState, useEffect }。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 'react'。
 * ts.factory.createImportDeclaration：创建导入声明节点，用于表示导入语句，如 import { useState, useEffect } from 'react'。
 */