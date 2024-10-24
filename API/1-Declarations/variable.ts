import * as ts from 'typescript';

// 创建常量声明：const x: number = 42;
const constVariable = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'x',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.factory.createNumericLiteral(42)
      )
    ],
    ts.NodeFlags.Const
  )
);

// 创建变量声明：let y: string = "Hello, TypeScript!";
const letVariable = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'y',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createStringLiteral("Hello, TypeScript!")
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：var z: boolean = true;
const varVariable = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'z',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
        ts.factory.createTrue()
      )
    ],
    ts.NodeFlags.None
  )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [constVariable, letVariable, varVariable],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * const x: number = 42;
 * let y: string = "Hello, TypeScript!";
 * var z: boolean = true;
 * 
 * ts.factory.createVariableStatement：创建一个变量语句。
 * 修饰符：如 const, let, var 使用 ts.factory.createModifier。
 * ts.factory.createVariableDeclarationList：创建变量声明列表，包含一个或多个变量声明。
 * ts.factory.createVariableDeclaration：创建单个变量声明，包括名称、类型注解和初始化表达式。
 */