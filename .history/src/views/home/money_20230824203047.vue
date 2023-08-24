<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="change">
  <div>
    <el-card>
      <el-form :model="form" label-width="100px">
        <el-form-item label="银行卡号">
          <el-input v-model="form.cardID"></el-input>
        </el-form-item>
        <el-form-item label="银行名称">
          <el-input v-model="form.bank"></el-input>
        </el-form-item>
        <el-form-item label="选择银行卡">
          <el-select v-model="form.selectedCard">
            <el-option
              v-for="card in bankCards"
              :key="card.id"
              :label="card.bank"
              :value="card.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addBankCard">添加银行卡</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-form :model="chargeForm" label-width="100px">
        <el-form-item label="充值金额">
          <el-input v-model="chargeForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="选择银行卡">
          <el-select v-model="chargeForm.selectedCard">
            <el-option
              v-for="card in bankCards"
              :key="card.id"
              :label="card.bank"
              :value="card.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="chargeForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="chargeAccount">充值</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-form :model="withdrawForm" label-width="100px">
        <el-form-item label="提现金额">
          <el-input v-model="withdrawForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="选择银行卡">
          <el-select v-model="withdrawForm.selectedCard">
            <el-option
              v-for="card in bankCards"
              :key="card.id"
              :label="card.bank"
              :value="card.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="withdrawForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="withdrawAccount">提现</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div></div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      form: {
        cardID: '',
        bank: '',
        selectedCard: '', // New property for selected card
      },
      chargeForm: {
        amount: '',
        selectedCard: '', // New property for selected card
        password: '',
      },
      withdrawForm: {
        amount: '',
        selectedCard: '', // New property for selected card
        password: '',
      },
      bankCards: [], // Array of available bank cards
    };
  },
  methods: {
    addBankCard() {
      const url = `http://110.42.220.245:8081/CreditCard/${this.userid}`;
      const data = {
        CardID: this.form.cardID,
        Bank: this.form.bank,
      };

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            this.$message.success('添加银行卡成功');
            // Clear form data
            this.form.cardID = '';
            this.form.bank = '';
          } else {
            this.$message.error('添加银行卡失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('添加银行卡失败');
        });
    },
    chargeAccount() {
      const url = `http://110.42.220.245:8081/Balance/Charge/${this.userid}?num=${this.chargeForm.amount}`;

      axios
        .post(url)
        .then(response => {
          if (response.data.success) {
            this.$message.success('账户充值成功');
            // Clear form data
            this.chargeForm.amount = '';
            this.chargeForm.password = '';
          } else {
            this.$message.error('账户充值失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('账户充值失败');
        });
    },
    withdrawAccount() {
      const url = `http://110.42.220.245:8081/Balance/Withdrawal/${this.userid}?num=${this.withdrawForm.amount}`;

      axios
        .post(url)
        .then(response => {
          if (response.data.success) {
            this.$message.success('账户提现成功');
            // Clear form data
            this.withdrawForm.amount = '';
            this.withdrawForm.password = '';
          } else {
            this.$message.error('账户提现失败');
          }
        })
        .catch(error => {
          console.log(error);
          this.$message.error('账户提现失败');
        });
    },
  },
};
</script>

<style>
.change {
  border: 1px solid #ccc;
  width: 140px;
  /* 设置边框的宽度为 300 像素 */
  margin-top: 0%;
  font-size: 30px;
  color: black;
  position: absolute;
  top: 150px;
  left: 205px;
  padding: 40px;
}
</style>