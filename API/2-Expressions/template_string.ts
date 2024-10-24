import * as ts from 'typescript';

// 创建变量声明：const greeting = `Hello, ${name}!`;
const greetingVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'greeting',
                undefined,
                undefined,
                ts.factory.createTemplateExpression(
                    ts.factory.createTemplateHead('Hello, '),
                    [
                        ts.factory.createTemplateSpan(
                            ts.factory.createIdentifier('name'),
                            ts.factory.createTemplateTail('!')
                        )
                    ]
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建变量声明：const info = `Name: ${user.name}, Age: ${user.age}`;
const infoVariable = ts.factory.createVariableStatement(
    [ts.factory.createModifier(ts.SyntaxKind.ConstKeyword)],
    ts.factory.createVariableDeclarationList(
        [
            ts.factory.createVariableDeclaration(
                'info',
                undefined,
                undefined,
                ts.factory.createTemplateExpression(
                    ts.factory.createTemplateHead('Name: '),
                    [
                        ts.factory.createTemplateSpan(
                            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('user'), 'name'),
                            ts.factory.createTemplateMiddle(', Age: ')
                        ),
                        ts.factory.createTemplateSpan(
                            ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('user'), 'age'),
                            ts.factory.createTemplateTail('')
                        )
                    ]
                )
            )
        ],
        ts.NodeFlags.Const
    )
);

// 创建源文件并打印代码
const sourceFile = ts.factory.createSourceFile(
    [greetingVariable, infoVariable],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

// 打印源文件
const printer = ts.createPrinter();
const code = printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
console.log(code);

/**
 * 生成的代码：
 * const greeting = `Hello, ${name}!`;
 * const info = `Name: ${user.name}, Age: ${user.age}`;
 * 
 * ts.factory.createTemplateExpression 创建模板表达式节点，用于表示模板表达式，如 `Hello, ${name}!`。
 * ts.factory.createTemplateHead 创建模板头节点，用于表示模板字符串的头部，如 `Hello, `。
 * ts.factory.createTemplateSpan 创建模板跨度节点，用于表示模板字符串中的变量，如 ${name}。
 * ts.factory.createTemplateTail 创建模板尾节点，用于表示模板字符串的尾部，如 `!`。
 * ts.factory.createTemplateMiddle 创建模板中间节点，用于表示模板字符串中的中间部分，如 `, Age: `。
 */
