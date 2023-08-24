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
      <el-table-column type="selection" width="55" />
      <el-table-column label="图片信息" width="180">
        <template #default="{ row }">
          <img :src="row.imageUrl" alt="图片" style="width: 100px; height: 100px;" />
        </template>
      </el-table-column>
      <el-table-column property="服务类型（维修/回收）" label="服务类型（维修/回收）" width="180" />
      
      <el-table-column property="下单时间" label="下单时间" width="180"></el-table-column>
      <el-table-column property="设备品牌" label="设备品牌" width="120"></el-table-column>
      <el-table-column property="设备型号" label="设备型号" width="120"></el-table-column>
      <el-table-column property="回收地点" label="回收地点" width="300"></el-table-column>

      <el-table-column property="预期价格" label="预期价格" width="150"></el-table-column>

     
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
    <span class="amount-label">预估回收价：</span>
    <span class="amount-value">{{ this.form.expectedprice }}元</span>
    <el-button type="primary" @click="goback">返回</el-button>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </div>
</template>

<script>
import { ref} from 'vue';
import { ElTable, ElSteps, ElCountdown } from 'element-plus';
import { createRecycleOrder, recycle_info } from "@/api/recycleprice_info.js";
import dayjs from 'dayjs';

export default {
  name: 'PricePage',
  components: {
    ElTable,
    ElSteps,
    ElCountdown,
  },
  data() {
    return {
      multipleTableRef: ref(null),
      tableData: ref([]),
      value: Date.now() + 1000 * 60 * 60 * 7,
      value1: Date.now() + 1000 * 60 * 60 * 24 * 2,
      value2: dayjs().add(1, 'month').startOf('month'),
    };
  },
  created() {
    const passedData = this.$route.query.data;
    console.log("接受的数据", passedData);
    if (passedData) {
      const parsedData = JSON.parse(passedData);
      this.form = parsedData.form;
      
      this.uploadedImages = parsedData.uploadedImages;
      this.productId=parsedData.productId;
      // 添加传递的信息到表格数据中
      console.log(parsedData.form.recycle_locatio)
      this.tableData.push({
        form: parsedData.form,
        '服务类型（维修/回收）': '回收',
        设备品牌: parsedData.form.deviceName,
        设备型号:parsedData.form.device_type,
        回收地点:parsedData.form.recycle_location,
        下单时间: dayjs().format('YYYY-MM-DD HH:mm:ss'), 
        预期价格:parsedData.form.expectedprice, 
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
      try {
        const createdata = {
          Device_Cate:"phone",
          Device_Type:"iPhone6",
          ExpectedPrice:100,
          Recycle_Location:"home",
          Recycle_Time:"2023-08-10T15:25:00"
        };

        const createResponse = await createRecycleOrder(createdata);
        
        if (createResponse.data.success) {
          console.log('回收订单创建成功:', createResponse.data);
          this.$router.push({ name: 'paypage' });
          const getOrderResponse = await recycle_info({ id: this.userId }); 

          console.log('获取回收订单信息:', getOrderResponse.data);

          // 在此处您可以进行订单创建成功后的后续操作，例如跳转到订单详情页等
        } else {
          console.error('回收订单创建失败:', createResponse.data);
        }
      } catch (error) {
        console.error('Error creating order:', error);
      }
    },
    async goback() {
      try {
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
</style>
