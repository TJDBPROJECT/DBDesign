<template>
  <div>
    <!--最上方的步骤记录条-->

    <el-header style="margin-top: 20px;">
        <el-steps :active="3" align-center>
    <el-step title="Step 1" description="Some description" />
    <el-step title="Step 2" description="Some description" />
    <el-step title="Step 3" description="Some description" />
    <el-step title="Step 4" description="Some description" />
  </el-steps>
    </el-header>

   

    <el-table :ref="multipleTableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="图片信息" width="180">
        <template #default="{ row }">
          <img :src="row.imageUrl" alt="图片" style="width: 100px; height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column property="服务类型（维修/回收）" label="服务类型（维修/回收）" width="180" />
      <el-table-column property="下单时间" label="下单时间" width="180"></el-table-column>
      <el-table-column property="下单用户名" label="下单用户名" width="120"></el-table-column>
      <el-table-column property="物品名称" label="物品名称" width="120"></el-table-column>
      <el-table-column property="约定的服务地点" label="约定的服务地点" width="300"></el-table-column>
      <el-table-column property="订单金额" label="订单金额" width="150"></el-table-column>
      <el-table-column property="订单状态" label="订单状态" width="100"></el-table-column>
    </el-table>

    <div class="spacer"></div> 

    <div class="spacer"></div> 
    <el-row>
  <el-col :span="8">
    <el-countdown title="自动关闭界面剩余时间" :value="value" style="font-size: 20px;" />
  </el-col>
  <el-col :span="8">
    <el-countdown
      title="支付剩余时间"
      format="HH:mm:ss"
      :value="value1"
    />
  </el-col>
</el-row>

  </div>

  <div class="total-amount">
      <span class="amount-label">总金额：</span>
      <span class="amount-value">{{ totalAmount }}元</span>
      <el-button type="primary" @click="goback">返回</el-button>
      <el-button type="primary" @click="handleAppointment">支付</el-button>
    </div>

</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { ElTable, ElCountdown } from 'element-plus';
import logoImage from '@/assets/logo.png';
import dayjs from 'dayjs';
import { repair_info } from '@/api/repairprice_info';

export default {
  name: 'PricePage',
  components: {
    ElTable,
    ElCountdown,
    
  },
  setup() {
    const multipleTableRef = ref(null)
    const multipleSelection = ref([])
    const tableData = ref([]); // Use ref to store table data

    const toggleSelection = (rows) => {
      if (rows) {
        rows.forEach((row) => {
          multipleTableRef.value.toggleRowSelection(row, undefined)
        })
      } else {
        multipleTableRef.value.clearSelection()
      }
    }

    onMounted(async () => {
      //在组件挂载后读取数据
      try {
        const response = await repair_info();
        if (response.data === false) {
          console.error('获取数据失败');
          return;
        }
        const rawData = response.data; // Assuming rawData is an array received from the API
        tableData.value = rawData.map((item) =>({
          imageUrl: logoImage,
          '服务类型（维修/回收）': item.type_name,
          下单时间: item.repairtime,
          下单用户名: item.username,
          物品名称: item.product_name,
          约定的服务地点: item.repairlocation,
          订单金额: `${item.order_amount}元`,
          订单状态: item.order_status,
        }));
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    });
    const handleSelectionChange = (val) => {
      multipleSelection.value = val
    }


    // 计算总金额
    const totalAmount = computed(() => {
      return multipleSelection.value.reduce((sum, item) => {
        const price = parseFloat(item['订单金额'])
        return sum + price
      }, 0)
    })

    const value = ref(Date.now() + 1000 * 60 * 60 * 7)
    const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2)
    const value2 = ref(dayjs().add(1, 'month').startOf('month'))

    function reset() {
      value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2
    }

    return {
      multipleTableRef,
      multipleSelection,
      tableData,
      totalAmount,
      toggleSelection,
      handleSelectionChange,
      value,
      value1,
      value2,
      reset,
    }
  },
  methods: {
    getDataFromServer() {
      repair_info().then((res) => {
        this.data = res.data; // 假设返回的数据为一个数组，直接将数据赋值给data
      }).catch((error) => {
        console.error('获取数据失败:', error);
      });
    },
    mounted() {
      // 接收上一个组件的值，并将其赋给data.product.productId
        this.product.productId = this.$route.params.productId;
        console.log("接收的 productId:", this.$route.params.productId);
      },
    handleAppointment() {
      console.log('点击了')
      this.$router.push({ name: 'paypage' })
    },

    goback() {
    this.$router.push({ name: 'repairpage' });
    }

  },
}
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
</style>
