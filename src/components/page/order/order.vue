<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          订单信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="订单编号" value="订单编号"></el-option>
          <el-option key="2" label="配送员编号" value="配送员编号"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <br>
        <br>
        <el-date-picker
          v-model="select_date"
          type="datetimerange"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :clearable="false"
        ></el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button type="plain" icon="search" @click="clear">清除/刷新</el-button>
        <!-- <el-button type="plain" icon="search" @click="getData">刷新</el-button> -->
        <br>
      </div>
      <el-table
        :data="orderData.slice((cur_page-1)*10,cur_page*10)"
        ref="filterTable"
        border
        class="table"
        fit
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="订单编号：">
                <span>{{ props.row.orderID }}</span>
              </el-form-item>
              <el-form-item label="用户编号：">
                <span>{{ props.row.user }}</span>
              </el-form-item>
              <el-form-item label="配送员编号：">
                <span>{{ props.row.deliver }}</span>
              </el-form-item>
              <el-form-item label="送餐地址：">
                <span>{{ props.row.orderAddress }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.startDate }}</span>
              </el-form-item>
              <el-form-item label="送达时间：">
                <span>{{ props.row.finishDate }}</span>
              </el-form-item>
              <el-form-item label="订单内容：">
                <span>{{ props.row.orderInfo }}</span>
              </el-form-item>
              <el-form-item label="金额：">
                <span>{{ props.row.orderAmount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="orderID" label="ID" width="200"></el-table-column>
        <el-table-column prop="startDate" label="下单时间" sortable :formatter="formatter"></el-table-column>
        <el-table-column prop="user" label="用户编号" width="120"></el-table-column>
        <el-table-column prop="deliver" label="配送员编号" width="120"></el-table-column>
        <el-table-column
          prop="orderStatus"
          label="配送状态"
          width="120"
          :filters="[{ text: '已送达', value: '已送达' }, { text: '正在配送', value: '正在配送' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.orderStatus === '已送达' ? 'success' : 'primary'"
              disable-transitions
            >{{scope.row.orderStatus}}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.orderStatus=='正在配送'"
              type="text"
              icon="el-icon-view"
              @click="openDetails(scope.row)"
            >查看配送状态</el-button>
          </template>
        </el-table-column>-->
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
import { constants } from "fs";
export default {
  name: "order",
  data() {
    return {
      urlSelect: "/pizzaexpress/order/getorderbyselect",
      urlInit: "/pizzaexpress/order/getlasttwentyorders",
      orderData: [],
      cur_page: 1,
      total: 10,
      select_cate: "",
      select_word: "",
      select_date: [],
      orderID: "-1",
      deliverID: "-1",
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
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
    getData() {
      this.$axios
        .post(this.urlInit, {
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let orderData = res.data.orderData.data;
          this.orderData = orderData;
          this.total = orderData.length;
        });
      // this.orderData = [
      //   {
      //     orderid: "1",
      //     date: "2019-02-05 10:01:00",
      //     user: "秦妤欣",
      //     deliver: "吴青峰",
      //     orderInfo: "夏威夷芝心披萨",
      //     orderStatus: "配送完成",
      //     orderAmount: "100.0"
      //   },
      // ];
    },
    filterStatus(value, row) {
      return row.orderStatus === value;
    },
    search() {
      switch (this.select_cate) {
        case "配送员编号":
          this.orderID = "-1";
          this.deliverID = this.select_word;
          break;
        case "订单编号":
          this.deliverID = "-1";
          this.orderID = this.select_word;
          break;
      }
      if (this.select_cate == "") {
        this.$message.error("抱歉，搜索类别不能为空");
      } else if (this.select_word == "") {
        this.$message.error("抱歉，搜索内容不能为空");
      } else {
        if (!this.select_date[0] || !this.select_date[1]) {
          this.$axios
            .post(this.urlSelect, {
              orderID: this.orderID,
              deliverID: this.deliverID,
              startTime: "-1",
              endTime: "-1",
              shopID: sessionStorage.getItem("shopID")
            })
            .then(res => {
              let orderData = res.data.orderData.data;
              if (orderData.length == 0) {
                this.$message({
                  message: "抱歉，未找到记录",
                  type: "info"
                });
              } else {
                this.orderData = orderData;
                this.total = orderData.length;
              }
            });
        } else {
          this.$axios
            .post(this.urlSelect, {
              orderID: this.orderID,
              deliverID: this.deliverID,
              startTime: this.select_date[0],
              endTime: this.select_date[1],
              shopID: sessionStorage.getItem("shopID")
            })
            .then(res => {
              let orderData = res.data.orderData.data;
              if (orderData.length == 0) {
                this.$message({
                  message: "抱歉，未找到记录",
                  type: "info"
                });
              } else {
                this.orderData = orderData;
                this.total = orderData.length;
              }
            });
        }
      }
    },
    openDetails(row) {
      // this.$axios
      // .post(this.urlDeliverPos, {
      //   deliver: row.deliver
      // })
      // .then(res => {
      //   let deliverPos = res.data.orderData.data;
      //   this.deliverPos = deliverPos;
      //   let status = res.data.status; //状态码
      //   if (status == 200) {
      //     console.log(this.deliverPos);
      //   } else {
      //     console.log(status);
      //   }
      // });
      (this.deliverPos = [121.406432, 31.226782]),
        this.$router.push({
          name: "OrderDetail",
          query: {
            // detail: row
            orderID: row.orderID,
            startDate: row.startDate,
            orderInfo: row.orderInfo,
            deliver: row.deliver,
            user: row.user,
            deliverPos: this.deliverPos,
            orderAddress: row.orderAddress
          }
        });
    },
    goTo() {
      this.$router.push("/dashboard2");
    },
    formatter(row, column) {
      return row.startDate;
    },
    clear() {
      this.select_cate = "";
      this.select_word = "";
      this.select_date = [];
      this.deliverID = "-1";
      (this.orderID = "-1"), this.getData();
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
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
