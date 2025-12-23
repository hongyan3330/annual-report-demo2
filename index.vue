<template>
  <div
    class="flex items-center justify-center min-h-screen bg-[#E5E5E5]"
    style="
      font-family: 'Nunito', 'Quicksand', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overscroll-behavior: none;
      user-select: none;
    "
  >
    <!-- 手机容器 -->
    <div class="w-full max-w-[390px] h-[100vh] sm:h-[844px] bg-theme sm:rounded-[40px] shadow-2xl overflow-hidden relative sm:border-[12px] border-white ring-1 ring-gray-200">
      <!-- 音乐控制 -->
      <Music ref="music" />
      <!-- 页面加载中 -->
      <div v-if="loading" class="loading-wrapper">
        <div class="loading-spinner">
          <LucideIcon name="loader-2" :size="32" />
        </div>
        <p class="loading-text">足迹生成中...</p>
      </div>
      <!-- 主内容区组件 -->
      <div v-else class="content-wrapper">
        <DistrictManager
          v-if="isHead"
          :data="detail"
          :getBlessing="getBlessing"
          @start="musicPlay"
          @close="closePage"
          @share="handleShare"
        />
        <MedicalRep v-else :data="detail" :getBlessing="getBlessing" @start="musicPlay" @close="closePage" @share="handleShare" />
      </div>
    </div>
  </div>
</template>

<script>
import { getYearReport, login, getUserFullTimeMaster } from '@api/yearNext.js';
import { parseURLParams } from '@utils/utils.js';
import { Dialog } from 'vant';
import moment from 'moment';
import store from './config/store';
import MedicalRep from './MedicalRep.vue';
import DistrictManager from './DistrictManager.vue';
import LucideIcon from './components/LucideIcon.vue';
import Music from './components/music.vue';

const isDaChenBrowser = () => true;
const DaChenBridge = window.DaChenBridge;

export default {
  name: 'Year2025Container',
  components: { MedicalRep, DistrictManager, LucideIcon, Music },
  data() {
    return {
      loading: true,
      user: null, // 用户信息
      detail: {}, // 详情
      yearKeyWord: [
        '有钱有闲',
        '升职加薪',
        '存款翻番',
        '早日脱单',
        '买车买房',
        '健康暴富',
        '项目必成',
        '事事顺心',
        '大展宏图',
        '再创佳绩',
        '奖金满满',
        '身体棒棒\n钱包胖胖',
        '练出马甲线',
        '脱贫就好',
        '睡觉睡到',
        '自然醒',
        '数钱数\n到手抽筋',
        '业绩长虹',
        '身体健康',
        '头发不再掉\n颜值往上飙',
        '早睡早起',
        '去一次\n上海迪士尼',
        '完成一次\n徒步旅行',
        '去听一\n场演唱会',
        '开上法拉利',
        '平安顺遂',
        '好事发生',
        '厨艺更\n上一层楼',
        '读完十\n本好书籍',
        '自驾旅游一次',
        '人生不愁\n富得流油',
        '失眠消退\n告别修仙',
        '体检报告\n一切良好',
        '满面笑容\n乳腺畅通',
        '百事可乐',
        '锦鲤附体',
        '平步青云',
        '得偿所愿',
        '一帆风顺',
        '狗壮家旺',
        '猫肥家润'
      ] // 关键词
    };
  },
  computed: {
    // 地区经理
    isHead() {
      if (this.user) {
        // 是否部门负责人 [ YES:是, NO:否 ] || 职位 == 地区经理
        return this.user.isHead === 'YES' || this.user.postName === '地区经理';
      } else {
        return false;
      }
    }
  },
  created() {
    // 监听进入后台
    window.addEventListener('visibilitychange', this.musicPause);
    window.addEventListener('pagehide', this.musicPause);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('visibilitychange', this.musicPause);
      window.removeEventListener('pagehide', this.musicPause);
    });
  },
  mounted() {
    // 测试数据
    if (this.$isMock) {
      this.initData({
        openID: '57d86e4bf509e2eaf44f7b88', // 测试 医药代表
        serialUDID: '4BA0FC536A952A6CD78806128C3C2FA2',
        // openID: '57d86e4bf509e2eaf44f7b82', // 测试 地区经理
        // serialUDID: '817A8B3E-E1E9-42FF-8E0A-B0BD80729F53',
        userName: '测试'
      });
      return;
    }
    // 检查是否在药企圈中访问
    if (!isDaChenBrowser()) {
      Dialog.alert({
        message: '请在药企圈中访问'
      });
      return false;
    }
    // 计算请求次数（最大次数设置）
    let attempts = 0;
    const maxNum = 5;
    let timer = null;
    const fetchUser = () => {
      // 获取身份验证
      DaChenBridge.getIdentity({}, ({ data }) => {
        console.log('this.user: ', data);
        if (data) {
          this.initData(data);
          timer = null;
          clearTimeout(timer);
        } else {
          // 没有获取到身份的情况下，增加重试次数
          attempts++;
          if (timer) {
            clearTimeout(timer);
          }
          if (attempts <= maxNum) {
            timer = setTimeout(fetchUser, 1000);
          } else {
            console.error('User data not fetched after 10 attempts.');
          }
        }
      });
    };
    fetchUser();
  },
  beforeDestroy() {
    console.log('beforeDestroy');
    store.removeToken();
    this.musicPause();
  },
  methods: {
    // 初始化数据
    async initData(data) {
      try {
        // 判断是否是分享进入的，分享进入的直接获取分享人的openid
        let { shareId } = parseURLParams(window.location.href);
        let openID = shareId || data.openID;
        // 自动登录
        let token = await this.autoLogin({
          secretkey: 'cms_app',
          openId: openID,
          serialUDID: data.serialUDID,
          tenantId: '1' // 默认康哲租户
        });
        // 设置token
        store.setToken(token);
        // 获取主职位信息
        this.user = (await this.getUserInfo()) || {};
        this.user.openID = openID;
        // 获取报告
        await this.getYearReport();
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    // 根据openId自动登录
    async autoLogin(params) {
      return new Promise((resolve, reject) => {
        login(params)
          .then(res => {
            if (res.success) {
              resolve(res.value.token);
            } else {
              this.$toast('openId登录失败');
              reject(new Error('openId登录失败'));
            }
          })
          .catch(reject);
      });
    },
    // 获取当前员工全职主职位
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserFullTimeMaster().then(resolve).catch(reject);
      });
    },
    // 获取报告数据
    async getYearReport() {
      try {
        let data = await getYearReport({
          year: 2025
        });
        if (!data || !data.length) {
          // 只显示第一页
          return this.$toast('您的年度足迹未生成');
        }
        data = this.formatData(data); // 格式化数据
        for (let key in data) {
          this.$set(this.detail, key, data[key]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    // 格式化数据，所有的逻辑都在这里进行重新格式化，子组件只负责展示
    formatData(data) {
      data = data.reduce((obj, item) => {
        obj[item.item_name] = item.item_value;
        return obj;
      }, {});
      const citys = data['会议打卡城市'];
      // 去掉“市”字
      if (citys) {
        data['会议打卡城市'] = citys.replaceAll('市', '');
      }
      // 设置用户名
      const { employeeName, departmentName } = this.user;
      data['用户名'] = employeeName;
      data['所属部门名称'] = departmentName;
      // 重新计算入职天数（利用当前日期 - 入职日期）
      data['入职天数'] = moment().diff(moment(data['入职日期'], 'YYYY-MM-DD'), 'days');
      return data;
    },
    // 播放音乐
    musicPlay() {
      const music = this.$refs.music;
      music && music.play();
    },
    // 暂停
    musicPause() {
      const music = this.$refs.music;
      music && music.pause();
    },
    // 获取祝福语
    getBlessing() {
      return this.yearKeyWord[Math.floor(Math.random() * this.yearKeyWord.length)];
    },
    // 关闭页面
    closePage() {
      DaChenBridge.callClose();
    },
    // 分享
    handleShare() {
      let openID = this.user.openID;
      const newURL = new URL(window.location.href);
      newURL.searchParams.set('shareId', openID);
      let params = {
        title: `康哲2025年账单`,
        columnCode: 'community_column_annual_footprint', // 栏目code
        sourceContent: `${newURL.href} （点击网页链接查看）`, //正文
        postContent: `来源康哲2025工作账单`, // 默认发帖内容（可缺省）
        imageUrl: `${window.location.origin}/banner_2025.png`,
        style: '3', // UI样式，1-无图、2-小图、3-大图，默认无图（可缺省）
        bizId: openID, //业务来源Id，方便业务对接（可缺省）
        bizUnique: '2', // 业务Id是否需要唯一，1-需要唯一，2-可以重复，（可缺省，即需要唯一）
        appId: '2025bill', //应用Id
        forwardDirectly: '2', //是否直接转发到社区，1-直接转发、2-需要用户编辑内容后再转发
        gotoCommunity: '1' //分享后是否进入社区，1-不进入社区、2-进入社区，默认不进入（可缺省）
      };
      console.log('params', params);
      DaChenBridge.forwardToCommunity(params, result => {
        console.log('result', result);
      });
    }
  }
};
</script>

<style scoped>
.bg-peach-theme {
  background: linear-gradient(135deg, #fff6e9 0%, #ffe8d6 100%);
}

.bg-theme {
  background-color: #fff6e9;
}

.loading-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.loading-spinner {
  width: 64px;
  height: 64px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff7e5f;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #8b4513;
  font-weight: bold;
}

.content-wrapper {
  position: absolute;
  inset: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
