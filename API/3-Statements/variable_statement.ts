import * as ts from 'typescript';

// 创建常量声明：const a = 10;
const constA = ts.factory.createVariableStatement(
  [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'a',
        undefined,
        undefined,
        ts.factory.createNumericLiteral(10)
      )
    ],
    // ts.NodeFlags.Const
  )
);

// 创建变量声明：let b: string = "TypeScript";
const letB = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'b',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.factory.createStringLiteral("TypeScript")
      )
    ],
    ts.NodeFlags.Let
  )
);

// 创建变量声明：var c: boolean = true;
const varC = ts.factory.createVariableStatement(
  undefined,
  ts.factory.createVariableDeclarationList(
    [
      ts.factory.createVariableDeclaration(
        'c',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
        ts.factory.createTrue()
      )
    ],
  )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [constA, letB, varC],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * const a = 10;
 * let b: string = "TypeScript";
 * var c: boolean = true;
 * 
 * createVariableStatement 方法用于创建变量声明，接收一个变量声明列表作为参数。
 * createVariableDeclarationList 方法用于创建变量声明列表，接收一个变量声明数组和一个标记作为参数。
 * createVariableDeclaration 方法用于创建变量声明，接收一个变量名、类型、初始值和修饰符数组作为参数。
 * createModifier 方法用于创建修饰符，接收一个修饰符标记作为参数。
 */