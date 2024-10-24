import * as ts from 'typescript';

// 创建变量声明：let user: IUser;
const userVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          'user',
          undefined,
          ts.factory.createTypeReferenceNode('IUser', undefined),
          undefined
        )
      ],
      ts.NodeFlags.Let
    )
  );
  
  // 创建变量声明：let service: UserService;
  const serviceVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          'service',
          undefined,
          ts.factory.createTypeReferenceNode('UserService', undefined),
          undefined
        )
      ],
      ts.NodeFlags.Let
    )
  );
  
  // 创建变量声明：let data: Array<string>;
  const dataVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          'data',
          undefined,
          ts.factory.createTypeReferenceNode(
            'Array',
            [ts.factory.createTypeReferenceNode('string', undefined)]
          ),
          undefined
        )
      ],
      ts.NodeFlags.Let
    )
  );
  
  // 创建变量声明：let promise: Promise<number>;
  const promiseVar = ts.factory.createVariableStatement(
    undefined,
    ts.factory.createVariableDeclarationList(
      [
        ts.factory.createVariableDeclaration(
          'promise',
          undefined,
          ts.factory.createTypeReferenceNode(
            'Promise',
            [ts.factory.createTypeReferenceNode('number', undefined)]
          ),
          undefined
        )
      ],
      ts.NodeFlags.Let
    )
  );
  
  // 创建源文件并打印代码
  const sourceFile = ts.factory.createSourceFile(
    [userVar, serviceVar, dataVar, promiseVar],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
  );
  
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
  console.log(code);

/**
 * 生成的代码：
 * let user: IUser;
 * let service: UserService;
 * let data: Array<string>;
 * let promise: Promise<number>;
 * 
 * ts.factory.createTypeReferenceNode：创建类型引用节点，用于表示引用其他类型的类型。
 * ts.factory.createTypeReferenceNode(typeName, typeArguments)：创建类型引用节点。
 * 
 */