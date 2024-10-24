import * as ts from 'typescript';

// 创建参数装饰器：@inject('greeting')
const injectDecorator = ts.factory.createDecorator(
    ts.factory.createCallExpression(
        ts.factory.createIdentifier('inject'),
        undefined,
        [ts.factory.createStringLiteral('greeting')]
    )
);

// 创建参数装饰器：@log
const logDecorator = ts.factory.createDecorator(
    ts.factory.createIdentifier('log')
);

// 创建参数声明：@inject('greeting') message: string
const injectedParameter = ts.factory.createParameterDeclaration(
    [injectDecorator], // 装饰器数组
    undefined,
    'message',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    undefined
);

// 创建构造函数：constructor(@inject('greeting') message: string) { ... }
const constructorDeclaration = ts.factory.createConstructorDeclaration(
    undefined,
    [injectedParameter],
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
    ),
);

// 创建方法参数声明：@log target: any, propertyKey: string, parameterIndex: number
const loggedParameter = ts.factory.createParameterDeclaration(
    [logDecorator], // 装饰器数组
    undefined,
    'target',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    undefined
);

// 创建方法参数声明：propertyKey: string
const propertyKeyParameter = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'propertyKey',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    undefined
);

// 创建方法参数声明：parameterIndex: number
const parameterIndexParameter = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    'parameterIndex',
    undefined,
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    undefined
);

// 创建方法声明：greet(@log target: any, propertyKey: string, parameterIndex: number) { ... }
const greetMethod = ts.factory.createMethodDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
    undefined,
    'greet',
    undefined,
    undefined,
    [loggedParameter, propertyKeyParameter, parameterIndexParameter],
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
);

// 创建类声明：class Greeter { greeting: string; constructor(...) { ... } greet(...) { ... } }
const greeterClassWithParameterDecorators = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], // 类装饰器数组
    'Greeter',
    undefined,
    undefined,
    [
        // greeting: string;
        ts.factory.createPropertyDeclaration(
            undefined,
            'greeting',
            undefined,
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
            undefined
        ),
        constructorDeclaration,
        greetMethod
    ]
);

// 创建源文件并打印代码
const sourceFileWithParameterDecorators = ts.factory.createSourceFile(
    [greeterClassWithParameterDecorators],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeWithParameterDecorators = printer.printNode(ts.EmitHint.Unspecified, sourceFileWithParameterDecorators, sourceFileWithParameterDecorators);
console.log(codeWithParameterDecorators);

/**
 * 生成的代码：
 * export class Greeter {
 *   greeting: string;
 *   constructor(@inject('greeting') message: string) {
 *     this.greeting = message;
 *   }
 *   public greet(@log target: any, propertyKey: string, parameterIndex: number): string {
 *     return `Hello, ${this.greeting}`;
 *   }
 * }
 * 
 * ts.factory.createDecorator：创建装饰器节点，用于表示装饰器，如 @sealed。
 * ts.factory.createCallExpression：创建调用表达式节点，用于表示函数调用，如 inject('greeting')。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 'greeting'。
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 message: string。
 * ts.factory.createConstructorDeclaration：创建构造函数声明节点，用于表示类的构造函数，如 constructor(@inject('greeting') message: string) {}。
 * ts.factory.createMethodDeclaration：创建方法声明节点，用于表示类的方法，如 greet(@log target: any, propertyKey: string, parameterIndex: number) {}。
 * ts.factory.createBlock：创建块节点，用于表示块，如 { ... }。
 * ts.factory.createBinaryExpression：创建二元表达式节点，用于表示二元表达式，如 this.greeting = message。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 this.greeting。
 * ts.factory.createReturnStatement：创建返回语句节点，用于表示返回语句，如 return `Hello, ${this.greeting}`。
 * ts.factory.createTemplateExpression：创建模板表达式节点，用于表示模板表达式，如 `Hello, ${this.greeting}`。
 * ts.factory.createTemplateHead：创建模板头节点，用于表示模板头，如 'Hello, '。
 * ts.factory.createTemplateSpan：创建模板跨度节点，用于表示模板跨度，如 ${this.greeting}。
 * ts.factory.createTemplateTail：创建模板尾节点，用于表示模板尾，如 ''
*/