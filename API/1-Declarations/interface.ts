import * as ts from 'typescript';

// 创建接口声明：export interface IUser { ... }
const userInterface = ts.factory.createInterfaceDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    'IUser',
    undefined,
    undefined,
    [
        // id: number;
        ts.factory.createPropertySignature(
            undefined,
            'id',
            undefined,
            ts.factory.createTypeReferenceNode('number', undefined)
        ),
        // name: string;
        ts.factory.createPropertySignature(
            undefined,
            'name',
            undefined,
            ts.factory.createTypeReferenceNode('string', undefined)
        ),
        // email?: string;
        ts.factory.createPropertySignature(
            undefined,
            'email',
            ts.factory.createToken(ts.SyntaxKind.QuestionToken),
            ts.factory.createTypeReferenceNode('string', undefined)
        ),
        // readonly isActive: boolean;
        ts.factory.createPropertySignature(
            [ts.factory.createModifier(ts.SyntaxKind.ReadonlyKeyword)],
            'isActive',
            undefined,
            ts.factory.createTypeReferenceNode('boolean', undefined)
        )
    ]
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [userInterface],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * export interface IUser {
 *    id: number;
 *    name: string;
 *    email?: string;
 *    readonly isActive: boolean;
 * }
 * 
 * ts.factory.createInterfaceDeclaration：创建接口声明，包括接口名、继承的接口、成员属性等。
 * ts.factory.createPropertySignature：创建属性签名，包括属性名称、可选标记（?）、只读标记（readonly）和类型。
 */
