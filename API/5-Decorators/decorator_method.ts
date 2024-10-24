import * as ts from 'typescript';

// 创建装饰器：@log
const logDecorator = ts.factory.createDecorator(
    ts.factory.createIdentifier('log')
);

// 创建方法声明：@log greet() { return `Hello, ${this.greeting}`; }
const greetMethod = ts.factory.createMethodDeclaration(
    [logDecorator, ts.factory.createModifier(ts.SyntaxKind.PublicKeyword)],
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

// 创建类声明：class Greeter { constructor(...) { ... } greet() { ... } }
const greeterClassWithMethod = ts.factory.createClassDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], // 类装饰器数组
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
        ),
        greetMethod
    ]
);

// 创建源文件并打印代码
const sourceFileWithMethod = ts.factory.createSourceFile(
    [greeterClassWithMethod],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeWithMethod = printer.printNode(ts.EmitHint.Unspecified, sourceFileWithMethod, sourceFileWithMethod);
console.log(codeWithMethod);

/**
 * 生成的代码：
 * export class Greeter {
 *   constructor(public greeting: string) {}
 *   greet() {
 *     return `Hello, ${this.greeting}`;
 *   }
 * }
 * 
 * ts.factory.createDecorator：创建装饰器节点，用于表示装饰器，如 @log。
 * ts.factory.createModifier：创建修饰符节点，用于表示修饰符，如 public。
 * ts.factory.createParameterDeclaration：创建参数声明节点，用于表示函数参数，如 greeting: string。
 * ts.factory.createKeywordTypeNode：创建关键字类型节点，用于表示关键字类型，如 string。
 * ts.factory.createMethodDeclaration：创建方法声明节点，用于表示类的方法，如 greet() { return `Hello, ${this.greeting}`; }。
 * ts.factory.createBlock：创建块节点，用于表示代码块，如 { return `Hello, ${this.greeting}`; }。
 * ts.factory.createTemplateExpression：创建模板表达式节点，用于表示模板表达式，如 `Hello, ${this.greeting}`。
 * ts.factory.createTemplateHead：创建模板头节点，用于表示模板字符串的头部，如 Hello,。
 * ts.factory.createTemplateSpan：创建模板跨度节点，用于表示模板字符串的中间部分，如 ${this.greeting}。
 * ts.factory.createPropertyAccessExpression：创建属性访问表达式节点，用于表示属性访问，如 this.greeting。
 * ts.factory.createThis：创建 this 节点，用于表示 this 关键字。
 * ts.factory.createTemplateTail：创建模板尾节点，用于表示模板字符串的尾部，如 ''。
 * ts.factory.createReturnStatement：创建返回语句节点，用于表示 return 语句，如 return `Hello, ${this.greeting}`;。
 * ts.factory.createSourceFile：创建源文件节点，用于表示 TypeScript 源文件，如 export class Greeter { ... }。
 * ts.createPrinter：创建打印机，用于打印节点。
 * ts.createPrinter.printNode：打印节点，将节点转
*/