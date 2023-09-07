<template>
  <div>
    <!-- 最上方的步骤记录条 -->

    <el-header style="margin-top: 20px;">
      <el-steps :active="3" align-center>
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
        <el-step title="Step 4" description="Some description" />
      </el-steps>
    </el-header>

    <el-table :ref="multipleTableRef" :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="50" />
      <!-- <el-table-column property="服务类型（维修/回收）" label="服务类型（维修/回收）" width="180" />
      
      <el-table-column property="下单时间" label="下单时间" width="180"></el-table-column>
      <el-table-column property="下单用户名" label="下单用户名" width="120"></el-table-column>
      <el-table-column property="物品名称" label="物品名称" width="120"></el-table-column>
      <el-table-column property="约定的服务地点" label="约定的服务地点" width="300"></el-table-column>
      <el-table-column property="订单金额" label="订单金额" width="150"></el-table-column>
      <el-table-column property="订单状态" label="订单状态" width="100"></el-table-column> -->
      <el-table-column property="服务类型（维修/回收）" label="服务类型（维修/回收）" min-width="180" />
<el-table-column property="下单时间" label="下单时间" min-width="180" />
<el-table-column property="物品名称" label="物品名称" min-width="120" />
<el-table-column property="约定的服务地点" label="约定的服务地点" min-width="300" />
<el-table-column property="订单金额" label="订单金额" min-width="150" />
<el-table-column property="订单状态" label="订单状态" min-width="100" />

     
    </el-table>

    <div class="spacer"></div>

    <div class="spacer"></div>
    <el-row>
      <el-col :span="8">
        <el-countdown title="自动关闭界面剩余时间" :value="value" style="font-size: 20px;" />
      </el-col>
      <el-col :span="8">
        <el-countdown title="支付剩余时间" format="HH:mm:ss" :value="value1" />
      </el-col>
    </el-row>
  </div>

  <div class="total-amount">
    <span class="amount-label">总金额：</span>
    <span class="amount-value">{{ this.price }}元</span>
    <el-button type="primary" @click="goback">返回</el-button>
    <el-button type="primary" @click="submitForm">支付</el-button>
  </div>
</template>

<script>
import { ref} from 'vue';
import { ElTable, ElSteps, ElCountdown } from 'element-plus';
import { deleteRepairOrder } from "@/api/repairprice_info.js";
import { mapState} from 'vuex'

export default {
  name: 'PricePage',
  components: {
    ElTable,
    ElSteps,
    ElCountdown,
  },
  computed:{
     ...mapState(['userid']), // 获取 userid 数据
  },
  data() {
    return {
      multipleTableRef: ref(null),
      tableData: ref([]),
      currentTime: null,
      id: null,//用户id
      orderId: null,
    };
  },
  created() {
    const passedData = this.$route.query.data;
    console.log("接受的数据", passedData);
    if (passedData) {
      const parsedData = JSON.parse(passedData);
      this.form = parsedData.form;
      this.price= parsedData.price;
      this.uploadedImages = parsedData.uploadedImages;
      this.productId=parsedData.productId;
      this.currentTime = parsedData.currentTime;
      this.orderId = parsedData.orderId;
      this.id =this.userid; 
      console.log("接受的数据", this.id);
      console.log("接受的数据", this.orderId);
      this.tableData.push({
        form: parsedData.form,
        '服务类型（维修/回收）': '维修',
        下单用户名: parsedData.name,
        物品名称:parsedData.form.Brand,
        约定的服务地点:parsedData.form.RepairLocation,
        下单时间: parsedData.currentTime,
        订单金额: parsedData.form.OrderPrice,
        订单状态: '待支付', 
      });
    }
  },
  methods: {
    async submitForm() {
      try {
         // 构造要传递给PayPage的数据
        const dataToPass = {
          productId:this.productId,
        };
        console.log("传递的数据", dataToPass);
         // 使用query参数传递数据，而不是params
         this.$router.push({
          name: 'paypage',
          query: {
            data: JSON.stringify(dataToPass),
            productId:this.productId,
          },
         
        });
        
      } catch (error) {
        console.error('Error navigating to PricePage:', error);
      }
      
    },
    async goback() {
      try {
        await this.deleteOrder(this.id, this.orderId);
         // 构造要传递给repairpage的数据
        const dataToPass = {
          productId:this.productId,
        };
        console.log("传递的数据", dataToPass);
         // 使用query参数传递数据，而不是params
         this.$router.push({
          name: 'repairpage',
          query: {
            data: JSON.stringify(dataToPass),
          },
         
        });
        
      } catch (error) {
        console.error('Error navigating to repairpage:', error);
      }
    },
    async deleteOrder(uid, id) {
      try {
        console.log("用户", uid)
        console.log("订单", id)
        const response = await deleteRepairOrder(uid, id);
        if (response.success) {
          // 订单删除成功，执行你的成功处理逻辑
          console.log('订单删除成功',response);
        } else {
          // 订单删除失败，执行你的失败处理逻辑
          console.error('订单删除失败',response);
        }
      } catch (error) {
        // 处理请求错误
        console.error('Error deleting order:', error);
      }
    },
  },
};
</script>

<style scoped>
.spacer {
  height: 100px; /* 调整为所需的空白高度 */
}
.center-steps {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.el-col {
  text-align: center;
}

.h1 {
  margin-top: 20px;
}

.el-table__header-wrapper {
  margin-bottom: 10px;
}

.el-table__footer-wrapper {
  margin-top: 10px;
}

.total-amount {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0px;
  margin-right: 20px;
  }
  .amount-label {
    margin-right: 20px;
    font-size: larger;
  }

  .amount-value {
    font-weight: bold;
    margin-right: 10px;
  }

  .countdown-footer {
    margin-top: 8px;
  }

  /* 表头样式 */
.el-table__header-wrapper {
  margin-bottom: 0px; /* 调整表头底部的边距 */
}

/* 表格内容底部样式 */
.el-table__footer-wrapper {
  margin-top: 0px; /* 调整表格内容底部的边距 */
}

</style>
