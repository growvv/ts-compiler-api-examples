import * as ts from 'typescript';

// 创建命名空间导入：* as utils
const namespaceImport = ts.factory.createNamespaceImport(ts.factory.createIdentifier('utils'));

// 创建导入子句：* as utils
const importClauseNamespace = ts.factory.createImportClause(
    false, // 是否为类型导入
    undefined, // 默认导入名称
    namespaceImport // 命名空间导入
);

// 创建导入声明：import * as utils from './utils';
const namespaceImportDeclaration = ts.factory.createImportDeclaration(
    undefined,
    importClauseNamespace,
    ts.factory.createStringLiteral('./utils'),
    undefined
);

// 创建源文件并打印代码
const sourceFileNamespace = ts.factory.createSourceFile(
    [namespaceImportDeclaration],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.None
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const codeNamespace = printer.printNode(ts.EmitHint.Unspecified, sourceFileNamespace, sourceFileNamespace);
console.log(codeNamespace);

/**
 * 生成的代码：
 * import * as utils from './utils';
 * 
 * ts.factory.createNamespaceImport：创建命名空间导入节点，用于表示导入的命名空间，如 * as utils。
 * ts.factory.createImportClause：创建导入子句节点，用于表示导入的名称和命名导入列表，如 * as utils。
 * ts.factory.createIdentifier：创建标识符节点，用于表示变量或属性，如 utils。
 * ts.factory.createStringLiteral：创建字符串字面量节点，用于表示字符串字面量，如 './utils'。
 * ts.factory.createImportDeclaration：创建导入声明节点，用于表示导入语句，如 import * as utils from './utils'。
 */
