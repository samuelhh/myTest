<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50" align="center" />

      <el-table-column
        label="学校名称"
        prop="schoolName"
        min-width="200"
        align="center"
        show-overflow-tooltip
      />

      <el-table-column label="省份" prop="schoolProvince" align="center" />
      <el-table-column label="城市" prop="schoolCity" align="center" />
      <el-table-column
        label="创建时间"
        prop="createTime"
        align="center"
        width="160"
      />
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.schoolStatus }}</template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="pageTotal"
      :pageSize="pageSize"
      :currentPage="pageNum"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
    ></Pagination>
  </div>
</template>

<script>
import * as api from "@/api/list";
import Pagination from "@/components/Pagination";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      tableData: [],

      //分页数据
      pageNum: 1,
      pageSize: 10,
      pageTotal: 0,
    };
  },
  methods: {
    //列表
    getTabaleList() {
      let param = {
        page: this.pageNum,
        size: this.pageSize,
      };
      api.queryListByAdmin(param).then((res) => {
        // console.log(res);
        this.tableData = res.data.data.list;
        this.pageTotal=res.data.data.total;
      });
    },
    //翻页
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getTableList();
    },
    //选择每页显示条数
    handleCurrentChange(val) {
      // console.log(val)
      this.pageNum = val;
      this.getTableList();
    },
  },
 async mounted() {
   await this.getTabaleList();
   
  },
};
</script>

<style lang="scss" scoped>
</style>