import * as ts from 'typescript';

// 创建变量声明：let num: number = 42;
const numVar = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'num',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.factory.createNumericLiteral(42)
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：let str: string = "Hello, TypeScript!";
const strVar = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'str',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createStringLiteral("Hello, TypeScript!")
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：let bool: boolean = true;
const boolVar = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'bool',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
        ts.factory.createTrue()
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：let anyVar: any = "Any value";
const anyVar = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'anyVar',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
        ts.factory.createStringLiteral("Any value")
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：let unknownVar: unknown = 123;
const unknownVar = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'unknownVar',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
        ts.factory.createNumericLiteral(123)
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [numVar, strVar, boolVar, anyVar, unknownVar],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * let num: number = 42;
 * let str: string = "Hello, TypeScript!";
 * let bool: boolean = true;
 * let anyVar: any = "Any value";
 * let unknownVar: unknown = 123;
 * 
 * ts.factory.createVariableStatement：创建变量声明节点，用于表示变量声明，如 let num: number = 42;。
 * ts.factory.createVariableDeclarationList：创建变量声明列表节点，用于表示变量声明列表，如 let num: number = 42;。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 num: number = 42。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示基本类型，如 number、string、boolean、any、unknown。
 * ts.factory.createNumericLiteral：创建数字字面量节点，用于表示数字字面量，如 42。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 "Hello, TypeScript!"。
 * ts.factory.createTrue：创建 true 字面量节点，用于表示 true。
 * ts.factory.createVariableDeclaration：创建变量声明节点，用于表示变量声明，如 num: number = 42。
 * ts.factory.createSourceFile：创建源文件节点，用于表示整个源文件，如 变量声明。
 */