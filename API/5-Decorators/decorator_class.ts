import * as ts from 'typescript';

// 创建装饰器：@sealed
const sealedDecorator = ts.factory.createDecorator(
    ts.factory.createIdentifier('sealed')
);

const publicGreet =  
ts.factory.createParameterDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
    undefined,
    'greeting',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    undefined
)

// 创建类声明：@sealed class Greeter { constructor(public greeting: string) {} }
const greeterClass = ts.factory.createClassDeclaration(
    [sealedDecorator, ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], // 装饰器数组
    'Greeter',
    undefined,
    undefined,
    [
        ts.factory.createConstructorDeclaration(
            undefined,
            [
                publicGreet
            ],
            ts.factory.createBlock([], true)
        )
    ]
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [greeterClass],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * @sealed
 * export class Greeter {
 *   constructor(public greeting: string) {}
 * }
 * 
 * ts.factory.createDecorator：创建装饰器节点，用于表示装饰器，如 @sealed。
 * ts.factory.createModifier：创建修饰符节点，用于表示修饰符，如 public。
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 greeting: string。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 string。
 * ts.factory.createConstructorDeclaration：创建构造函数声明节点，用于表示类的构造函数，如 constructor(public greeting: string) {}。
 * ts.factory.createClassDeclaration：创建类声明节点，用于表示类，如 class Greeter
 */