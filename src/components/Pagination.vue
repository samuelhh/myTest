<template>
  <div class="pagination">
    <el-pagination
      :page-sizes="pageSizes"
      :page-size="pageSize"
      background
      class="pagination1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      v-if="parseInt(total)>0"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40];
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 50
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      curPage: this.currentPage,
      pSizes: this.pageSizes
    };
  },
  methods: {
    handleCurrentChange(current) {
      this.curPage = current;
      this.$emit("currentChange", current);
    },
    handleSizeChange(size) {
      this.pSizes = size;
      this.$emit("sizeChange", size);
    }
  }
};
</script>