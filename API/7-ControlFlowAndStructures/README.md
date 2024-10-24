接下来我们将详细介绍 TypeScript 编译器 API 中的 `ts.factory` 下的 控制流与结构节点 (Control Flow and Structures)。控制流与结构节点用于表示代码中的各种控制结构，如条件语句、循环语句、跳转语句、异常处理等。通过使用 ts.factory，开发者可以以编程方式生成和操作这些控制流与结构节点。

本部分将涵盖以下内容：
1. 条件语句 (Conditional Statements)
    - `if` 语句
    - `switch` 语句
2. 循环语句 (Loop Statements)
   - `for` 循环
   - `while` 循环
   - `do-while` 循环
   - `for-in` 循环
   - `for-of` 循环
3. 跳转语句 (Jump Statements)
   - `break`
   - `continue`
   - `return`
   - `throw`
   - `goto`（TypeScript 不支持，但可以模拟签）
4. 异常处理 (Exception Handling)
      - try-catch-finally 语句
5. 块语句 (Block Statements)
6. 标签 (Labels)
7. 其他控制流结构
8.  总结

每个类别下将包括：
- 目标代码：展示使用控制流与结构的 TypeScript 代码。
  - 使用 `ts.factory` 创建 AST 的代码：展示如何使用 `ts.factory` 方法来构建相应的 AST 节点。
- 生成效果：展示最终生成的 TypeScript 代码。
- 解释：详细说明代码的构建过程和关键点。
