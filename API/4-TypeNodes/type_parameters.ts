import * as ts from 'typescript';

// 创建类型参数：<T>
const typeParameterT = ts.factory.createTypeParameterDeclaration(undefined, 'T', undefined, undefined);

// 创建函数声明：function identity<T>(arg: T): T { return arg; }
const identityFunction = ts.factory.createFunctionDeclaration(
  undefined,
  undefined,
  'identity',
  [typeParameterT],
  [
    ts.factory.createParameterDeclaration(
      undefined,
      undefined,
      'arg',
      undefined,
      ts.factory.createTypeReferenceNode('T', undefined),
      undefined
    )
  ],
  ts.factory.createTypeReferenceNode('T', undefined),
  ts.factory.createBlock(
    [
      ts.factory.createReturnStatement(
        ts.factory.createIdentifier('arg')
      )
    ],
    true
  )
);

// 创建类型参数：<T>
const containerTypeParam = ts.factory.createTypeParameterDeclaration(undefined, 'T', undefined, undefined);

// 创建类声明：class Container<T> { ... }
const containerClass = ts.factory.createClassDeclaration(
  undefined,
  'Container',
  [containerTypeParam],
  undefined,
  [
    // private value: T;
    ts.factory.createPropertyDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.PrivateKeyword)],
      'value',
      undefined,
      ts.factory.createTypeReferenceNode('T', undefined),
      undefined
    ),
    // constructor(value: T) { this.value = value; }
    ts.factory.createConstructorDeclaration(
      undefined,
      [
        ts.factory.createParameterDeclaration(
          undefined,
          undefined,
          'value',
          undefined,
          ts.factory.createTypeReferenceNode('T', undefined),
          undefined
        )
      ],
      ts.factory.createBlock(
        [
          ts.factory.createExpressionStatement(
            ts.factory.createBinaryExpression(
              ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'value'),
              ts.SyntaxKind.EqualsToken,
              ts.factory.createIdentifier('value')
            )
          )
        ],
        true
      )
    ),
    // getValue(): T { return this.value; }
    ts.factory.createMethodDeclaration(
      undefined,
      undefined,
      'getValue',
      undefined,
      undefined,
      [],
      ts.factory.createTypeReferenceNode('T', undefined),
      ts.factory.createBlock(
        [
          ts.factory.createReturnStatement(
            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'value')
          )
        ],
        true
      )
    )
  ]
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
  [identityFunction, containerClass],
  ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
  ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 类型参数用于在泛型类型和函数中引入可变的类型。
 * 
 * 生成的代码
 * function identity<T>(arg: T): T {
 *    return arg;
 * }
 * class Container<T> {
 *   private value: T;
 *   constructor(value: T) {
 *     this.value = value;
 *   }
 *   getValue(): T {
 *    return this.value;
 *   }
 * }
 * 
 * ts.factory.createTypeParameterDeclaration：创建类型参数声明节点，用于表示类型参数，如 <T>。
 * ts.factory.createFunctionDeclaration：创建函数声明节点，用于表示函数声明，如 function identity<T>(arg: T): T { return arg; }。
 * ts.factory.createTypeReferenceNode：创建类型引用节点，用于表示类型引用，如 T。
 */