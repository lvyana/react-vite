# 新组件实现示例

## 1. Permission 权限控制组件

### 1.1 按钮级权限控制

创建 `src/components/Permission/index.tsx`：

```typescript
/**
 * @file 权限控制组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { ReactNode } from 'react';
import { useStore } from '@/store';

interface PermissionProps {
  /** 所需权限码 */
  permission: string | string[];
  /** 子元素 */
  children: ReactNode;
  /** 无权限时的替代内容 */
  fallback?: ReactNode;
  /** 权限匹配模式：all-全部匹配，any-任意匹配 */
  mode?: 'all' | 'any';
}

const Permission: React.FC<PermissionProps> = ({
  permission,
  children,
  fallback = null,
  mode = 'any',
}) => {
  const { permiss } = useStore();

  // 检查权限
  const hasPermission = () => {
    // 超级管理员权限
    if (permiss.includes('*:*:*')) {
      return true;
    }

    const permissions = Array.isArray(permission) ? permission : [permission];

    if (mode === 'all') {
      // 全部匹配
      return permissions.every((p) => permiss.includes(p));
    } else {
      // 任意匹配
      return permissions.some((p) => permiss.includes(p));
    }
  };

  return hasPermission() ? <>{children}</> : <>{fallback}</>;
};

export default Permission;

// 权限检查 Hook
export const usePermission = () => {
  const { permiss } = useStore();

  const hasPermission = (permission: string | string[], mode: 'all' | 'any' = 'any') => {
    if (permiss.includes('*:*:*')) {
      return true;
    }

    const permissions = Array.isArray(permission) ? permission : [permission];

    if (mode === 'all') {
      return permissions.every((p) => permiss.includes(p));
    } else {
      return permissions.some((p) => permiss.includes(p));
    }
  };

  return { hasPermission, permissions: permiss };
};
```

### 1.2 使用示例

```typescript
import Permission, { usePermission } from '@/components/Permission';

// 组件方式
<Permission permission="user:add">
  <Button type="primary">新增用户</Button>
</Permission>

// 多个权限（任意匹配）
<Permission permission={['user:edit', 'user:delete']} mode="any">
  <Button>编辑或删除</Button>
</Permission>

// 多个权限（全部匹配）
<Permission permission={['user:edit', 'user:delete']} mode="all">
  <Button>编辑且删除</Button>
</Permission>

// Hook 方式
const { hasPermission } = usePermission();

if (hasPermission('user:add')) {
  // 显示新增按钮
}
```

---

## 2. VirtualTable 虚拟滚动表格

创建 `src/components/VirtualTable/index.tsx`：

```typescript
/**
 * @file 虚拟滚动表格组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { useRef, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { VariableSizeGrid as Grid } from 'react-window';

interface VirtualTableProps<T> extends TableProps<T> {
  /** 行高 */
  rowHeight?: number;
  /** 表格高度 */
  height?: number;
}

function VirtualTable<T extends object>(props: VirtualTableProps<T>) {
  const { columns, dataSource, rowHeight = 54, height = 600, ...restProps } = props;
  const [tableWidth, setTableWidth] = useState(0);
  const widthColumnCount = columns!.filter(({ width }) => !width).length;
  const mergedColumns = columns!.map((column) => {
    if (column.width) {
      return column;
    }
    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  const gridRef = useRef<any>();
  const [connectObject] = useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => {
        if (gridRef.current) {
          return gridRef.current?.state?.scrollLeft;
        }
        return null;
      },
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current?.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: true,
    });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * rowHeight;

    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index];
          return totalHeight > height && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number);
        }}
        height={height}
        rowCount={rawData.length}
        rowHeight={() => rowHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft });
        }}
      >
        {({
          columnIndex,
          rowIndex,
          style,
        }: {
          columnIndex: number;
          rowIndex: number;
          style: React.CSSProperties;
        }) => (
          <div
            className={`virtual-table-cell ${
              columnIndex === mergedColumns.length - 1 ? 'virtual-table-cell-last' : ''
            }`}
            style={style}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <Table
      {...restProps}
      className="virtual-table"
      columns={mergedColumns}
      dataSource={dataSource}
      pagination={false}
      components={{
        body: renderVirtualList,
      }}
    />
  );
}

export default VirtualTable;
```

### 使用示例

```typescript
import VirtualTable from '@/components/VirtualTable';

// 大数据量表格
<VirtualTable
  columns={columns}
  dataSource={largeDataSource} // 10000+ 条数据
  height={600}
  rowHeight={54}
  scroll={{ y: 600 }}
/>
```

---

## 3. ImageUpload 图片上传组件

创建 `src/components/ImageUpload/index.tsx`：

```typescript
/**
 * @file 图片上传组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { useState } from 'react';
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

interface ImageUploadProps {
  /** 最大上传数量 */
  maxCount?: number;
  /** 是否启用裁剪 */
  crop?: boolean;
  /** 裁剪比例 */
  aspect?: number;
  /** 上传接口 */
  action?: string;
  /** 值改变回调 */
  onChange?: (fileList: UploadFile[]) => void;
  /** 默认文件列表 */
  value?: UploadFile[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxCount = 1,
  crop = false,
  aspect = 1,
  action = '/api/upload',
  onChange,
  value = [],
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(value);

  // 预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // 上传前校验
  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片！');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB！');
      return false;
    }
    return true;
  };

  // 文件改变
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  const uploadComponent = (
    <Upload
      action={action}
      listType="picture-card"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      maxCount={maxCount}
    >
      {fileList.length >= maxCount ? null : uploadButton}
    </Upload>
  );

  return (
    <>
      {crop ? (
        <ImgCrop rotationSlider aspect={aspect}>
          {uploadComponent}
        </ImgCrop>
      ) : (
        uploadComponent
      )}
      <Modal open={previewOpen} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

// 获取 base64
const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default ImageUpload;
```

### 使用示例

```typescript
import ImageUpload from '@/components/ImageUpload';

// 单图上传
<ImageUpload
  maxCount={1}
  crop={true}
  aspect={1}
  onChange={(fileList) => console.log(fileList)}
/>

// 多图上传
<ImageUpload
  maxCount={5}
  onChange={(fileList) => console.log(fileList)}
/>

// 在表单中使用
<Form.Item name="avatar" label="头像">
  <ImageUpload maxCount={1} crop={true} />
</Form.Item>
```

---

## 4. ExportButton 导出按钮组件

创建 `src/components/ExportButton/index.tsx`：

```typescript
/**
 * @file 导出按钮组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { useState } from 'react';
import { Button, Dropdown, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import * as XLSX from 'xlsx';

interface ExportButtonProps {
  /** 数据源 */
  dataSource: any[];
  /** 列配置 */
  columns: { title: string; dataIndex: string }[];
  /** 文件名 */
  fileName?: string;
  /** 按钮文本 */
  text?: string;
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
}

const ExportButton: React.FC<ExportButtonProps> = ({
  dataSource,
  columns,
  fileName = '导出数据',
  text = '导出',
  type = 'default',
}) => {
  const [loading, setLoading] = useState(false);

  // 导出 Excel
  const exportExcel = () => {
    try {
      setLoading(true);
      
      // 准备数据
      const headers = columns.map((col) => col.title);
      const data = dataSource.map((item) =>
        columns.map((col) => item[col.dataIndex])
      );
      
      // 创建工作表
      const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
      
      // 创建工作簿
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      
      // 导出文件
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 导出 CSV
  const exportCSV = () => {
    try {
      setLoading(true);
      
      // 准备数据
      const headers = columns.map((col) => col.title).join(',');
      const rows = dataSource.map((item) =>
        columns.map((col) => item[col.dataIndex]).join(',')
      );
      
      const csv = [headers, ...rows].join('\n');
      
      // 创建 Blob
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      
      // 下载
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.csv`;
      link.click();
      
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 导出 JSON
  const exportJSON = () => {
    try {
      setLoading(true);
      
      const json = JSON.stringify(dataSource, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.json`;
      link.click();
      
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'excel',
      label: '导出为 Excel',
      onClick: exportExcel,
    },
    {
      key: 'csv',
      label: '导出为 CSV',
      onClick: exportCSV,
    },
    {
      key: 'json',
      label: '导出为 JSON',
      onClick: exportJSON,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button type={type} icon={<DownloadOutlined />} loading={loading}>
        {text}
      </Button>
    </Dropdown>
  );
};

export default ExportButton;
```

### 使用示例

```typescript
import ExportButton from '@/components/ExportButton';

<ExportButton
  dataSource={dataSource}
  columns={columns}
  fileName="用户列表"
  text="导出数据"
  type="primary"
/>
```

---

## 5. SearchBar 高级搜索组件

创建 `src/components/SearchBar/index.tsx`：

```typescript
/**
 * @file 高级搜索组件
 * @author ly
 * @createDate 2026-02-28
 */
import React, { useState } from 'react';
import { Form, Row, Col, Button, Space } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';

interface SearchBarProps {
  /** 表单实例 */
  form: FormInstance;
  /** 搜索项配置 */
  items: React.ReactNode[];
  /** 搜索回调 */
  onSearch: (values: any) => void;
  /** 重置回调 */
  onReset?: () => void;
  /** 默认展开 */
  defaultExpanded?: boolean;
  /** 默认显示行数 */
  defaultRows?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  form,
  items,
  onSearch,
  onReset,
  defaultExpanded = false,
  defaultRows = 1,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  // 计算显示的项数
  const displayItems = expanded ? items : items.slice(0, defaultRows * 3);

  const handleSearch = () => {
    const values = form.getFieldsValue();
    onSearch(values);
  };

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  return (
    <Form form={form} onFinish={handleSearch}>
      <Row gutter={16}>
        {displayItems.map((item, index) => (
          <Col span={8} key={index}>
            {item}
          </Col>
        ))}
        <Col span={8} style={{ textAlign: 'right' }}>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
            {items.length > defaultRows * 3 && (
              <Button type="link" onClick={() => setExpanded(!expanded)}>
                {expanded ? '收起' : '展开'}
                {expanded ? <UpOutlined /> : <DownOutlined />}
              </Button>
            )}
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBar;
```

### 使用示例

```typescript
import SearchBar from '@/components/SearchBar';
import { Form, Input, Select } from 'antd';

const [form] = Form.useForm();

const searchItems = [
  <Form.Item name="username" label="用户名">
    <Input placeholder="请输入用户名" />
  </Form.Item>,
  <Form.Item name="status" label="状态">
    <Select placeholder="请选择状态">
      <Select.Option value="1">启用</Select.Option>
      <Select.Option value="0">禁用</Select.Option>
    </Select>
  </Form.Item>,
  // 更多搜索项...
];

<SearchBar
  form={form}
  items={searchItems}
  onSearch={(values) => console.log(values)}
  onReset={() => console.log('reset')}
  defaultRows={1}
/>
```

---

## 安装依赖

```bash
# 虚拟滚动
npm install react-window @types/react-window

# Excel 导出
npm install xlsx

# 图片裁剪
npm install antd-img-crop
```

这些组件可以大大提升项目的功能完整性和用户体验！
