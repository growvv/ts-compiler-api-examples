使用编译器API
## 设置
首先，您需要从npm安装 `TypeScript >=1.6`。

完成后，您需要将其链接到项目所在的位置。如果不是在Node项目内部进行链接，则会全局链接。

```bash
npm install -g typescript
npm link typescript
```

您还需要一些示例中的Node.js声明文件。要获取声明文件，请运行：
```bash
npm install -D @types/node
```
就这样，准备好了。现在可以尝试以下示例。

编译器API有几个主要组件：
- `Program`代表整个应用程序的TypeScript术语
- `CompilerHost`表示用户系统，并具有用于读取文件、检查目录和区分大小写等操作的API。
- 许多`SourceFiles`代表应用程序中的每个源文件，承载文本和TypeScript AST。

## 一个最小化编译器
此示例是一个简单的编译器，它接受一系列TypeScript文件并将它们编译为相应的JavaScript。

我们需要通过`createProgram`创建一个`Program`-这将创建一个默认`CompilerHost`，其使用文件系统来获取文件。

minimal-compiler.ts


## 一个简单的转换函数
创建编译器并不需要太多代码行数，但您可能只想获得给定TypeScript源码对应JavaScript输出。为此，可以使用`ts.transpileModule`通过两行代码就能实现 string=>string 转换。

simple_transpile.ts

## 从JavaScript文件获取DTS
这仅适用于 TypeScript 3.7 及以上版本。此示例演示如何处理 JavaScript 文件列表，并显示终端中生成的 `d.ts` 文件。

dts-from-js.ts


## 重新打印 TypeScript 文件部分内容

此示例将记录出 TypeScript 或 JavaScript 源代码文件子部分，在希望应用程序代码成为the source of truth 时很有用。例如通过 JSDoc 注释展示导出项。

```bash
ts-node print-source.ts target.ts [identifier]

ts-node print-source.ts input.ts i
```

## 遍历AST与小型linter

`Node` 接口是 TypeScript AST 的根接口。通常情况下我们使用 `forEachChild` 函数以递归方式来遍历树形结构。这包含了访问者模式，并且通常提供更大灵活性。

作为如何遍历某个文件AST结构的示例，请考虑以下最小限度 linter 执行以下操作：
- 检查所有循环体是否被花括号包围。
- 检查所有 if/else 体是否被花括号包围。
- "更严格" 的相等运算符 (===/!==) 被使用而非 "松散" 运算符 (==/!=) 。

```bash
ts-node litter_linter.ts target.ts
```

在本例中, 我们无需创建类型检查器因为我们只想遍历每个 SourceFile.
所有可能 `ts.SyntaxKind` 可以在枚举下找到.

## 撰写增量程序监视器

TypeScript 2.7引入了两个新的API：一个用于创建“观察者”程序，提供一组API来触发重建，另一个是“构建器”API，观察者可以利用它。BuilderPrograms是智能到足以缓存错误并在先前编译的模块上发出的Program实例，如果它们或其依赖项未以级联方式更新，则会进行重新编译。 观察者可以利用构建器程序实例仅更新受影响文件（如错误和发射）的结果。 这可以加快具有许多文件的大型项目。

此API在编译器内部用于实现其`--watch`模式，但也可通过以下方式被其他工具利用：

```bash
ts-node watch.ts
```

## 支持增量构建的语言服务
请参考“[使用语言服务API](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)”页面获取更多详细信息。

服务层提供了一组额外的实用工具，可以帮助简化一些复杂情况。在下面的代码片段中，我们将尝试构建一个增量构建服务器，监视一组文件，并仅更新已更改文件的输出。我们将通过创建一个`LanguageService`对象来实现这一点。与前面示例中的程序类似，我们需要一个`LanguageServiceHost`。 `LanguageServiceHost`扩展了文件概念，包括`version`、`isOpen`标志和`ScriptSnapshot`。版本允许语言服务跟踪文件变化。 isOpen告诉语言服务在使用该文件时保留AST在内存中。 ScriptSnapshot是对文本的抽象，允许语言服务查询更改。

如果您只是想要实现观察式功能，请探索上述watcher API。

```bash
ts-node language-service.ts
```


## 自定义模块解析
您可以通过实现可选方法`CompilerHost.resolveModuleNames`来覆盖编译器解析模块的标准方式：

> CompilerHost.resolveModuleNames(moduleNames: string[], containingFile: string): string[]。

该方法接收一个文件中的模块名称列表，并应返回一个大小为moduleNames.length的数组，数组的每个元素存储以下内容之一：

- 具有非空属性 `resolvedFileName` 的 `ResolvedModule` 实例 - 对应于 moduleNames 数组中名称的解析，或者
- 如果无法解析模块名称，则为 `undefined` 。

您可以通过调用 `resolveModuleName` 来调用标准模块解析过程：

> resolveModuleName(moduleName: string, containingFile: string, options: CompilerOptions, moduleResolutionHost: ModuleResolutionHost): ResolvedModuleNameWithFallbackLocations。

此函数返回一个对象，其中存储了模块解析结果（resolvedModule属性值）以及在做出当前决定之前被视为候选项的文件名列表。

```bash
ts-node custom-module-resolution.ts
```

## 创建和打印AST
TypeScript具有factory functions和printer API，您可以结合使用。
- factory允许您以TypeScript的AST格式生成新的树节点。
- printer可以获取现有树（由createSourceFile或工厂函数生成的任何一个），并产生输出字符串。

以下是一个示例，利用这两者来生成阶乘函数：

```bash
ts-node print-ast.ts
```

## 类型检查器API

程序包含一个TypeChecker对象，该对象提供了用于检索和推理语法树节点类型的方法。 类型检查器API通常与AST节点一起使用两种表示：

- 符号：描述类型系统如何看待已声明的实体，例如类、函数或变量。
- 类型：描述实体可以声明为的后备类型。 这些通常具有指向其声明的后备Symbol的指针。
例如，给定一个单个函数声明：

TypeScript将在包含范围中为greet创建一个Symbol。 在查找（“解析”）名称为greet的标识符时，可以检索到该Symbol。 此Symbol将包含关于greet如何被声明以及可用于获取有关greet类型信息的信息。

顺便说一句，TypeScript还会创建一个描述greet 的type ，这有效上是 type () => void - 无参数且void返回值类型的函数。 在这种情况下，该type 将由与 greet 关联的原始symbol支持。

可以像program.getTypeChecker()那样检索type checker 。 常用的type checker API 包括：

- getSymbolAtLocation(node)： 检索与AST节点相关联的 Symbol
- getTypeAtLocation(node)： 检索与AST节点相关联 的 Type
- getTypeOfSymbolAtLocation(symbol, node) ： 检索特定AST 节点处与 symbol 相关联 的 Type
- typeToString(type) ： 将 type 打印成人类可读字符串

>符号概念上仅巧合地具有JavaScript 符号概念相同名称。 JavaScript 的 Symbol 是运行时基元，用于创建唯一标识符 TypeScript 的 Symbol 与JavaScript Symbol 不相关，并且用于表示实体对 类型系统视图。


## 使用类型检查器
在这个例子中，我们将遍历AST并使用检查器来序列化类信息。我们将使用类型检查器获取符号和类型信息，同时抓取导出类、它们的构造函数以及相应的构造函数参数的JSDoc注释。

```bash
ts-node type-checker.ts target.ts
```