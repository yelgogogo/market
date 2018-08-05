<template>
  <div class="mail-box">
    <mt-header fixed title="我的消息">
      <div slot="left" class="left-btn" @click="goto('/sell')">
        <i class="iconfont icon-left"></i>
      </div>
    </mt-header>
    <div class="mail-box-item" v-for="mail in mails" :key="mail._id" @click="goto(mail.link)" :class="{ active: select[mail._id] }">
      <div class="mail-title">{{TRANS_STATUS[mail.status]}} {{mail.text}}</div>
      <div class="mail-content"><span>物品账号: </span><span>{{mail.account.IACC}} </span>
      </div>
      <div class="mail-content"><span>密码: </span><span>{{mail.account.IPSW}} </span>
      </div>
      <div class="mail-content"><span>收钱账号: </span><span>{{mail.account.GACC}} </span>
      </div>
      <div class="mail-content"><span>密码: </span><span>{{mail.account.GPSW}} </span>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api'
import {TRANS_STATUS} from '@/utils/enum'
export default {
  name: 'mail',
  // props: ['filter'],
  components: {
  },
  data () {
    return {
      category: undefined,
      select: {},
      mails: [],
      TRANS_STATUS: TRANS_STATUS,
      options: [
        {
          label: '精品赏析',
          img: 'HARMER',
          link: '/type?type=AUCTION'
        },
        {
          label: '快捷寄售',
          img: 'JEWELRY',
          link: '/sell'
        }
      ]
    }
  },
  computed: {
  },
  created () {
    this.getMail()
    // console.log(this.card)
  },
  methods: {
    goto (url) {
      this.$router.push(url)
    },
    getMail () {
      api.get(`/mails`, {}).then(res => {
        if (res.status === 200 && res.data) {
          this.mails = res.data
          console.log('mailCount', res.data)
        }
      }).catch(err => {
        console.log(err)
        // this.$store.dispatch('setLoadingState', false)
      })
    }
  }
}
</script>
<style scoped>
.mail-title {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  text-align: left;
}
.mail-content {
  width: 50%;
  box-sizing: border-box;
  padding: 10px;
  text-align: left;
}
.mail-box {
 
  background-color: black;
  color:#b26400;
  box-sizing: border-box;
  padding: 10px;
}
.mail-box-item {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: #5a5a5a 6px solid;
}

.link-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
}
.link-bar-item {
  width: 50%;
  box-sizing: border-box;
}

.link-bar-item-img {
}
.link-bar-item-txt {
  color: #b26400;
}
</style>
