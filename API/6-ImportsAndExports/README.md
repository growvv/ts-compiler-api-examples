接下来我们将详细介绍 TypeScript 编译器 API 中的 `ts.factory` 下的 导入与导出节点 (Imports and Exports)。导入与导出是模块化编程的核心部分，通过使用 `ts.factory`，开发者可以以编程方式生成和操作这些导入与导出节点。

本部分将涵盖以下内容：

1. 导入节点 (Import Declarations)
   - 默认导入 (Default Imports)
   - 命名导入 (Named Imports)
   - 命名空间导入 (Namespace Imports)
   - 仅导入模块 (Side-effect Imports)
2. 导出节点 (Export Declarations)
   - 默认导出 (Default Exports)
   - 命名导出 (Named Exports)
   - 导出赋值 (Export Assignments)
   - 重导出 (Re-exports)
3. 导入与导出结合的示例
4. 生成导入与导出节点的注意事项
5. 总结
