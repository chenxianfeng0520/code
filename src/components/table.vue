<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :span-method="objectSpanMethod"
    >
      <el-table-column width="50" />
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="date" label="Date1" />
      <el-table-column prop="name" label="Name2" />
      <el-table-column prop="address" label="Address1" />
    </el-table>
  </div>
</template>
<script setup>
const objectSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 1) {
    if (row.num) {
      return {
        rowspan: row.num,
        colspan: 1,
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0,
      };
    }
  }
};

const load = (row, treeNode, resolve) => {
  const index = row.index;
  tableData.splice(
    index + 1,
    0,
    {
      id: 3,
      date: "2016-05-01",
      name: "wangxiaohu",
      address: "No. 189, Grove St, Los Angeles",
      hasChildren: false,
    },
    {
      id: 3,
      date: "2016-05-01",
      name: "wangxiaohu",
      address: "No. 189, Grove St, Los Angeles",
      hasChildren: false,
    }
  );

  let top = null;
  tableData.forEach((element, index) => {
    if (element.id != tableData[index - 1]?.id) {
      element.num = 1;
      top = element;
    } else {
      top.num++;
    }
  });

  setTimeout(() => {
    resolve([]);
  }, 1000);
};

const tableData = [
  {
    id: 1,
    date: "2016-05-02",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-04",
    name: "wangxiaohu",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 3,
    date: "2016-05-01",
    name: "wangxiaohu",
    hasChildren: true,
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 4,
    date: "2016-05-03",
    name: "wangxiaohu",
    hasChildren: true,
    address: "No. 189, Grove St, Los Angeles",
  },
];

tableData.map((v, index) => {
  v.index = index;
  return v;
});

</script>
