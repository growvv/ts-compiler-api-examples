import * as ts from 'typescript';

// 创建装饰器：@readonly
const readonlyDecorator = ts.factory.createDecorator(
    ts.factory.createIdentifier('readonly')
);

// 创建属性声明：@readonly greeting: string;
const greetingProperty = ts.factory.createPropertyDeclaration(
    [readonlyDecorator], // 装饰器数组
    'greeting',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    undefined
)

// 创建类声明：class Greeter { @readonly greeting: string; constructor(...) { ... } greet() { ... } }
const greeterClassWithProperty = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],  // 类装饰器数组
    'Greeter',
    undefined,
    undefined,
    [
        greetingProperty,
        ts.factory.createConstructorDeclaration(
            // undefined,
            undefined,
            [
                ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    'message',
                    undefined,
                    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
                    undefined
                )
            ],
            ts.factory.createBlock(
                [
                    ts.factory.createExpressionStatement(
                        ts.factory.createBinaryExpression(
                            ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'greeting'),
                            ts.SyntaxKind.EqualsToken,
                            ts.factory.createIdentifier('message')
                        )
                    )
                ],
                true
            )
        ),
        ts.factory.createMethodDeclaration(
            [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
            undefined,
            'greet',
            undefined,
            undefined,
            [],
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            ts.factory.createBlock(
                [
                    ts.factory.createReturnStatement(
                        ts.factory.createTemplateExpression(
                            ts.factory.createTemplateHead('Hello, '),
                            [
                                ts.factory.createTemplateSpan(
                                    ts.factory.createPropertyAccessExpression(ts.factory.createThis(), 'greeting'),
                                    ts.factory.createTemplateTail('')
                                )
                            ]
                        )
                    )
                ],
                true
            )
        )
    ]
);

// 创建源文件并打印代码
const sourceFileWithProperty = ts.factory.createSourceFile(
    [greeterClassWithProperty],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeWithProperty = printer.printNode(ts.EmitHint.Unspecified, sourceFileWithProperty, sourceFileWithProperty);
console.log(codeWithProperty);

/**
 * 生成的代码：
 * export class Greeter {
 *   @readonly greeting: string;
 *   constructor(message: string) {
 *     this.greeting = message;
 *   }
 *   public greet(): string {
 *     return `Hello, ${this.greeting}`;
 *   }
 * }
 */