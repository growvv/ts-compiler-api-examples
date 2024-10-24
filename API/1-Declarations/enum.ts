import * as ts from 'typescript';

// 创建枚举声明：export enum Color { ... }
const colorEnum = ts.factory.createEnumDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    'Color',
    [
        ts.factory.createEnumMember('Red', ts.factory.createStringLiteral('RED')),
        ts.factory.createEnumMember('Green', ts.factory.createStringLiteral('GREEN')),
        ts.factory.createEnumMember('Blue', ts.factory.createStringLiteral('BLUE'))
    ]
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [colorEnum],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export enum Color {
 *   Red = 'RED',
 *   Green = 'GREEN',
 *   Blue = 'BLUE'
 * }
 * 
 * ts.factory.createEnumDeclaration：创建枚举声明。
 * ts.factory.createEnumMember：创建枚举成员。
 * 修饰符：如 export 使用 ts.factory.createModifier。
 * 枚举成员：使用 ts.factory.createEnumMember，包括成员名称和初始化值。
 */