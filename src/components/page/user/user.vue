<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="selectWord" placeholder="用户ID" class="handle-input mr10"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="plain" @click="clear">清除/刷新</el-button>
        <!-- <el-button type="plain" @click="getData">刷新</el-button> -->
      </div>
      <el-table
        :data="userData.slice((cur_page-1)*10,cur_page*10)"
        ref="filterTable"
        border
        class="table"
        fit
      >
        <el-table-column prop="userID" label="ID" width="100"></el-table-column>
        <el-table-column prop="userName" label="昵称" width="150"></el-table-column>
        <el-table-column prop="userPhone" label="电话" width="200"></el-table-column>
        <el-table-column prop="lastLogin" label="上次登录时间" width="200"></el-table-column>
        <el-table-column
          prop="userStatus"
          label="状态"
          width="150"
          :filters="[{ text: '离线', value: '离线' },{ text: '在线', value: '在线' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.userStatus === '在线' ? 'success' : 'info'"
              disable-transitions
            >{{scope.row.userStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userAddress" label="常用收货地址" :formatter="formatter"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
          :current-page="cur_page"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      urlSelectUser: "/pizzaexpress/user/getuserbyid",
      urlInit: "/pizzaexpress/user/getuserinfo",
      userData: [],
      cur_page: 1,
      total: 0,
      selectWord: "",
      userID: "",
      orderObj: "",
      orderFormVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    formatter(row, column) {
      return row.userAddress;
    },
    getData() {
      this.$axios.post(this.urlInit).then(res => {
        let userData = res.data.userData.data;
        this.userData = userData;
        this.total = userData.length;
      });
      // this.userData = [
      //   {
      //     userID: "1",
      //     userName: "小王",
      //     userPhone: "1388888888",
      //     userStatus: "在线",
      //     userAddress: "小王家里",
      //     lastLogin: "2018-12-01 10:00"
      //   },
      //   {
      //     userID: "2",
      //     userName: "大王",
      //     userPhone: "1388888888",
      //     userStatus: "离线",
      //     userAddress: "小王家里",
      //     lastLogin: "2018-12-01 10:00"
      //   },
      //   {
      //     userID: "1",
      //     userName: "小王",
      //     userPhone: "1388888888",
      //     userStatus: "在线",
      //     userAddress: "小王家里",
      //     lastLogin: "2018-12-01 10:00"
      //   }
      // ];
    },
    filterStatus(value, row) {
      return row.userStatus === value;
    },
    search() {
      if (this.selectWord == "") {
        this.$message.error("抱歉，搜索内容不能为空");
      } else {
        this.userID = this.selectWord;
        this.$axios
          .post(this.urlSelectUser, {
            userID: this.userID
          })
          .then(res => {
            let userData = res.data.userData.data;
            if (userData.length == 0) {
              this.$message({
                message: "未找到含有'" + this.selectWord + "'的记录",
                type: "info"
              });
            } else {
              this.userData = userData;
              this.total = userData.length;
            }
          });
      }
    },
    clear() {
      this.selectWord = "";
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
