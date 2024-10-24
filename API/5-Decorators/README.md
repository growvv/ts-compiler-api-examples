1. 装饰器概述
装饰器是 TypeScript 中的一种实验性特性（需要在 tsconfig.json 中启用 "experimentalDecorators": true），用于在声明类、方法、访问器、属性或参数时附加特殊的注解或元数据。装饰器通过使用 @ 符号进行标记，并可以接受参数。

```python
@sealed
class Greeter {
    @readonly
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @log
    greet() {
        return `Hello, ${this.greeting}`;
    }
}
```

解释：
- @sealed：类装饰器，用于修改或注解整个类。
- @readonly：属性装饰器，用于修改或注解类的属性。
- @log：方法装饰器，用于修改或注解类的方法。



思考 4 秒

好的，接下来我们将详细介绍 TypeScript 编译器 API 中的 ts.factory 下的 装饰器节点 (Decorators)。装饰器是一种特殊类型的声明，能够被附加到类声明、方法、访问器、属性或参数上，可以修改类的行为或元数据。通过使用 ts.factory，开发者可以以编程方式生成和操作这些装饰器节点。

本部分将涵盖以下内容：

装饰器概述
装饰器节点类型
类装饰器 (Class Decorators)
方法装饰器 (Method Decorators)
属性装饰器 (Property Decorators)
参数装饰器 (Parameter Decorators)
具体示例
类装饰器示例
方法装饰器示例
属性装饰器示例
参数装饰器示例
生成装饰器的注意事项
总结
每个示例将包括：

目标代码：展示使用装饰器的 TypeScript 代码。
使用 ts.factory 创建装饰器节点的代码：展示如何使用 ts.factory 方法来构建相应的装饰器 AST 节点。
生成效果：展示最终生成的 TypeScript 代码。
1. 装饰器概述
装饰器是 TypeScript 中的一种实验性特性（需要在 tsconfig.json 中启用 "experimentalDecorators": true），用于在声明类、方法、访问器、属性或参数时附加特殊的注解或元数据。装饰器通过使用 @ 符号进行标记，并可以接受参数。

示例：

typescript
复制代码
@sealed
class Greeter {
    @readonly
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @log
    greet() {
        return `Hello, ${this.greeting}`;
    }
}
解释：

@sealed：类装饰器，用于修改或注解整个类。
@readonly：属性装饰器，用于修改或注解类的属性。
@log：方法装饰器，用于修改或注解类的方法。

2. 装饰器节点类型
TypeScript 的 AST 中，装饰器节点可以附加在以下几种声明上：
- 类装饰器 (Class Decorators)
- 方法装饰器 (Method Decorators)
- 属性装饰器 (Property Decorators)
- 参数装饰器 (Parameter Decorators)
- 每种装饰器类型都有其特定的 AST 节点结构。



