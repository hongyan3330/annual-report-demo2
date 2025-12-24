<template>
  <div :class="['w-full h-full relative flex flex-col district-manager-bg', themeClass]">
    <!-- 左上角：上一页按钮 -->
    <!-- 音乐按钮已在父组件 index.vue 处理 -->
    <button v-if="page > 0" @click="prev" class="absolute top-[16px] left-[16px] z-50 control-btn-top">
      <LucideIcon name="chevron-left" :size="20" class="text-[#FF7E5F]" />
    </button>
    <button
      @click="close"
      :class="['absolute', 'top-[16px]', page === 0 ? 'left-[16px]' : 'left-[70px]', 'control-btn-top', 'z-50']"
      aria-label="关闭"
    >
      <LucideIcon name="x" :size="20" class="text-[#FF7E5F]" />
    </button>
    <!-- 页面内容容器：flex-1 占据剩余空间 -->
    <div
      class="container flex-1 relative overflow-hidden"
      @touchstart="ts"
      @touchmove="tm"
      @touchend="te"
    >
      <transition name="fade" mode="out-in">
        <!-- Part 1: 引入主题1 -->
        <div v-if="page === 0" key="p1" class="flex flex-col justify-center px-8 relative overflow-hidden">
          <div class="clay-sphere w-48 h-48 bg-[#FFD166] top-[-50px] right-[-50px] animate-float opacity-80"></div>
          <div class="relative z-10 flex flex-col items-center text-center">
            <div class="animate-pop w-full">
              <span
                class="inline-block px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-[#FF7E5F] text-sm font-bold shadow-sm mb-6"
              >
                致敬坚守一线的你！
              </span>
              <h1 class="text-4xl font-black text-gray-800 leading-tight mb-8">
                你的2025
                <br />
                个人年度足迹
                <br />
                已解锁！
              </h1>
            </div>
            <div class="flex items-center justify-center mb-10">
              <div class="w-48 h-48 bg-white flex items-center justify-center clay-card rounded-full animate-float">
                <LucideIcon name="footprints" :size="64" class="text-[#FF7E5F]" />
              </div>
            </div>
            <div class="animate-pop w-full">
              <p class="text-gray-400 text-xs mb-2">点击下方按钮开启</p>
            </div>
          </div>
        </div>

        <!-- Part 2: 引入主题2 -->
        <div v-else-if="page === 1" key="p2" class="flex flex-col justify-center px-6 relative overflow-hidden">
          <div class="clay-sphere w-24 h-24 bg-[#B8E994] top-[10%] left-[-20px] opacity-60 animate-float"></div>
          <div class="relative z-10 w-full">
            <div class="clay-card p-8 text-center animate-pop mb-8">
              <h2 class="text-2xl font-black text-[#FF7E5F] mb-6">告别 2025</h2>
              <p class="text-gray-600 leading-relaxed mb-4">
                硕果与汗水交织
                <br />
                我们以自信再创佳绩
              </p>
              <div class="w-full h-px bg-gray-200 my-4"></div>
              <p class="text-gray-800 font-bold mb-4">
                绘制一幅属于
                <br />
                {{ data['所属部门名称'] }}团队的
                <br />
                “战略行军图”
              </p>
              <p class="text-sm text-gray-500">
                现在，诚邀你一同开启
                <br />
                你与团队的“独家记忆”
              </p>
            </div>
          </div>
        </div>

        <!-- Part 3: 入职 -->
        <div v-else-if="page === 2" key="p3" class="flex flex-col justify-center px-6 relative">
          <div class="animate-pop mb-6 text-center">
            <h2 class="text-3xl font-black text-gray-800">起点</h2>
          </div>
          <div class="clay-card p-8 flex flex-col items-center justify-center text-center animate-pop relative z-10">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-md">
              <LucideIcon name="flag" :size="40" class="text-blue-500" />
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-6">Hi，{{ data['用户名'] }} 经理</h3>
            <div class="bg-[#FFF0E5] p-6 rounded-3xl w-full mb-6 border border-white text-left">
              <p class="text-gray-500 text-sm mb-1">
                还记得
                <span class="font-bold text-[#FF7E5F]">{{ data['入职日期'] }}</span>
                吗？
              </p>
              <p class="text-gray-800 font-bold mb-4">这是你故事的起点</p>
              <p class="text-xs text-gray-500 mb-2">那一天，你开启了在康哲的征程</p>
              <div class="w-full h-px bg-white my-2"></div>
              <div class="mt-2">
                <span class="text-gray-600 text-sm">至今已并肩作战</span>
                <span class="font-black text-3xl text-[#FF7E5F]">{{ data['入职天数'] }}</span>
                <span class="text-gray-500">天</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Part 4: 团队 (DM专属) -->
        <div v-else-if="page === 3" key="p4" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop text-center">
            <h2 class="text-3xl font-black text-gray-800">团队的力量</h2>
          </div>
          <div class="clay-card p-8 text-center animate-pop relative z-10">
            <div class="flex justify-center -space-x-4 mb-6">
              <div class="w-12 h-12 rounded-full bg-red-100 border-2 border-white flex items-center justify-center">👩‍💼</div>
              <div class="w-12 h-12 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">👨‍💼</div>
              <div class="w-12 h-12 rounded-full bg-green-100 border-2 border-white flex items-center justify-center">🧑‍💼</div>
            </div>
            <p class="text-gray-500 text-sm mb-2">2025年 {{ data['所属区域名称'] }}</p>
            <p class="text-xl font-bold text-gray-800 mb-6">
              共有
              <span class="text-4xl font-black text-[#FF7E5F]">{{ data['地区代表数'] }}</span>
              位伙伴
            </p>
            <div class="bg-gray-50 p-4 rounded-2xl">
              <p class="text-sm text-gray-600 leading-relaxed">
                回首这一年
                <br />
                你不是一个人在战斗
                <br />
                而是一群人在赶路
                <br />
                <span class="font-bold text-[#FF7E5F]">星光不负赶路人</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Part 5: 市场开拓 (DM专属) -->
        <div v-else-if="page === 4" key="p5" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">市场开拓</h2>
          </div>
          <div class="clay-card p-6 mb-4 animate-pop">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm text-gray-500">已开发医院总数</span>
              <span class="text-3xl font-black text-gray-800">
                {{ data['已开发医院数'] }}
                <span class="text-xs font-normal">家</span>
              </span>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                <span class="text-xs text-blue-800 font-bold">三级医院</span>
                <span class="text-sm font-black text-blue-600">{{ data['已开发三级医院数'] }} 家</span>
              </div>
              <div class="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                <span class="text-xs text-green-800 font-bold">二级医院</span>
                <span class="text-sm font-black text-green-600">{{ data['已开发二级医院数'] }} 家</span>
              </div>
              <div class="flex justify-between items-center bg-yellow-50 p-2 rounded-lg">
                <span class="text-xs text-yellow-800 font-bold">一级及其他</span>
                <span class="text-sm font-black text-yellow-600">{{ data['已开发一级及其他医院数'] }} 家</span>
              </div>
            </div>
          </div>
          <div class="clay-card p-6 text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-xs text-gray-400 mb-2">
              每一步足迹，都是新领地，
              <br />
              从零到一，从有到优，为增长而战，为未来而拓
            </p>
            <!-- 已开发医院数排名分类 -->
            <p class="text-gray-800 font-bold text-lg leading-relaxed">
              <template v-if="data['已开发医院数排名分类'] === '优'">
                "开拓疆土，市场王者，
                <br />
                剑锋所指，所向披靡"
              </template>
              <template v-else-if="data['已开发医院数排名分类'] === '良'">
                "破局立新，功成有我，
                <br />
                谋于智，成于行"
              </template>
              <template v-else-if="data['已开发医院数排名分类'] === '一般'">
                "蓄势待发，静候佳音，
                <br />
                潜龙在渊，静待腾飞"
              </template>
            </p>
          </div>
          <p class="text-[10px] text-gray-400 mt-2 text-center">
            因取数限制，以上所有开发完成医院数量为1-11月已开发完成医院数量，12月已开发医院审批数据不全，如有差异请忽略
          </p>
        </div>

        <!-- Part 6: 分管 -->
        <div v-else-if="page === 5" key="p6" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <span class="inline-block px-3 py-1 bg-white/60 rounded-full text-xs text-gray-500 font-bold mb-2">2025 · 经营</span>
            <h2 class="text-3xl font-black text-gray-800">分管数据</h2>
          </div>

          <div class="clay-card p-6 mb-6 animate-pop">
            <div class="flex justify-between items-start mb-6">
              <div class="text-center flex-1">
                <p class="text-gray-500 text-xs mb-1">分管医院</p>
                <span class="font-black text-2xl text-gray-800">{{ data['分管医院数'] }}</span>
                <span class="text-xs text-gray-400 ml-1">家</span>
              </div>
              <div class="w-px bg-gray-200 h-10 mx-2 mt-2"></div>
              <div class="text-center flex-1">
                <p class="text-gray-500 text-xs mb-1">锁定客户</p>
                <span class="font-black text-2xl text-gray-800">{{ data['分管客户数'] }}</span>
                <span class="text-xs text-gray-400 ml-1">位</span>
              </div>
            </div>

            <div class="space-y-4 pt-4 border-t border-gray-100">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">触碰总客户数</span>
                <span class="font-bold text-gray-800">{{ data['触碰客户数'] }} 位</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">触碰率</span>
                <span class="font-bold text-[#FF7E5F]">{{ data['客户触碰率'] }}%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">月均触碰</span>
                <span class="font-bold text-gray-800">{{ data['月均触碰客户数'] }} 位</span>
              </div>
            </div>
            <div class="mt-4 bg-[#FFF0E5] p-3 rounded-xl text-center">
              <p class="text-xs text-[#FF7E5F]">
                全国排名第
                <span class="font-black text-lg">{{ data['月均触碰客户数全国排名'] }}</span>
                名
              </p>
              <p class="text-[10px] text-gray-400">超过全国约 {{ data['月均触碰客户数全国排名击败比例'] }}% 的地区</p>
            </div>
          </div>
          <div class="text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-xs text-gray-400">所有成功都不会白费，真正的成功从来不是偶然</p>
          </div>
        </div>

        <!-- Part 7: 客户提级 -->
        <div v-else-if="page === 6" key="p7" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop relative z-10">
            <h2 class="text-3xl font-black text-gray-800">提级 & 新增</h2>
          </div>

          <div class="clay-card p-6 mb-6 animate-pop relative z-10">
            <p class="text-center text-xs text-gray-400 mb-4">2025年 大咖+现有讲者 & 现有讲者</p>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-[#F3F4F6] rounded-2xl p-4 text-center">
                <p class="text-3xl font-black text-gray-700 mb-1">+{{ data['大咖+现有讲者&现有讲者累计提级客户数'] }}</p>
                <span class="text-[10px] text-gray-500 bg-white px-2 py-1 rounded-full shadow-sm">累计提级</span>
              </div>
              <div class="bg-[#FFF0E5] rounded-2xl p-4 text-center">
                <p class="text-3xl font-black text-[#FF7E5F] mb-1">+{{ data['大咖+现有讲者&现有讲者累计新培养客户数'] }}</p>
                <span class="text-[10px] text-[#FF7E5F] bg-white px-2 py-1 rounded-full shadow-sm">累计新培养</span>
              </div>
            </div>
          </div>

          <div class="clay-card p-6 animate-pop relative z-10" style="animation-delay: 0.1s">
            <p class="text-sm text-gray-600 leading-relaxed font-bold text-center">
              "每一通电话，每一次拜访
              <br />
              都让你离目标更近一步"
            </p>
            <div class="text-center mt-2">
              <span class="text-[#FF7E5F] font-black">积跬步，至千里！</span>
            </div>
          </div>
        </div>

        <!-- Part 8: 拜访、协访 (DM专属) -->
        <div v-else-if="page === 7" key="p8" class="flex flex-col justify-center px-6 relative pb-10">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">拜访 & 协访</h2>
          </div>

          <div class="clay-card p-6 mb-4 animate-pop">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">👣</div>
              <span class="font-bold text-gray-800">个人拜访</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div>
                <p class="text-lg font-black">{{ data['拜访次数'] }}</p>
                <p class="text-[10px] text-gray-400">总次数</p>
              </div>
              <div>
                <p class="text-lg font-black">{{ data['拜访客户数'] }}</p>
                <p class="text-[10px] text-gray-400">客户数</p>
              </div>
              <div>
                <p class="text-lg font-black">{{ data['月均拜访客户数'] }}</p>
                <p class="text-[10px] text-gray-400">月均</p>
              </div>
            </div>
          </div>

          <div class="clay-card p-6 mb-4 animate-pop" style="animation-delay: 0.1s">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">🤝</div>
              <span class="font-bold text-gray-800">团队协访</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div>
                <p class="text-lg font-black">{{ data['协访次数'] }}</p>
                <p class="text-[10px] text-gray-400">总次数</p>
              </div>
              <div>
                <p class="text-lg font-black">{{ data['协访客户数'] }}</p>
                <p class="text-[10px] text-gray-400">客户数</p>
              </div>
              <div>
                <p class="text-lg font-black">{{ data['月均协访客户数'] }}</p>
                <p class="text-[10px] text-gray-400">月均</p>
              </div>
            </div>
          </div>

          <div class="bg-white/40 p-4 rounded-2xl text-center animate-pop" style="animation-delay: 0.2s">
            <p class="text-gray-800 font-bold text-sm leading-relaxed">
              <!--拜访排名分类-->
              <template v-if="data['拜访排名分类'] === '优'">"每一步向前走，不畏将来、不念过往"</template>
              <template v-else-if="data['拜访排名分类'] === '良'">
                "前路或许有雾有霜，
                <br />
                但往前走，总能撞见晴朗"
              </template>
              <template v-else-if="data['拜访排名分类'] === '一般'">
                "不是所有坚持都即刻结果，
                <br />
                但有些坚持，能让冻土绽蔷薇"
              </template>
            </p>
          </div>
        </div>

        <!-- Part 9: 会议总场次 -->
        <div v-else-if="page === 8" key="p9" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">学术争鸣</h2>
          </div>
          <div class="clay-card p-8 text-center animate-pop mb-6">
            <div class="w-16 h-16 bg-[#E0E7FF] rounded-full mx-auto mb-4 flex items-center justify-center">
              <LucideIcon name="presentation" :size="32" class="text-[#4F46E5]" />
            </div>
            <p class="text-xs text-gray-500 mb-2">2025年 共开展会议</p>
            <p class="text-5xl font-black text-gray-800 mb-4">
              {{ data['会议总场次'] }}
              <span class="text-base font-normal text-gray-400">场</span>
            </p>
            <p class="text-sm font-bold text-gray-700 mb-4">月岗均 {{ data['会议月均场次'] }} 场</p>
            <div class="flex justify-center gap-2">
              <span class="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                全国排名
                <b>{{ data['会议总场次全国排名'] }}</b>
              </span>
              <span class="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                击败
                <b>{{ data['会议总场次全国排名击败比例'] }}%</b>
              </span>
            </div>
          </div>
          <div class="clay-card p-6 text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-gray-800 font-bold text-lg leading-relaxed">
              <!--拜访排名分类-->
              <template v-if="data['会议总场次排名分类'] === '优'">
                "于高山之巅，方见大河奔涌；
                <br />
                于群峰之上，更觉长风浩荡"
              </template>
              <template v-else-if="data['会议总场次排名分类'] === '良'">
                "半山腰总是挤的，
                <br />
                你得去山顶看看"
              </template>
              <template v-else-if="data['会议总场次排名分类'] === '一般'">
                "知不足而奋进，
                <br />
                望远山而前行"
              </template>
            </p>
          </div>
        </div>

        <!-- Part 10: 会议打卡 -->
        <div v-else-if="page === 9" key="p10" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">足迹·版图</h2>
          </div>
          <div class="clay-card p-6 mb-6 animate-pop">
            <div class="flex items-center gap-3 mb-4">
              <LucideIcon name="map-pin" class="text-[#FF7E5F]" />
              <span class="text-lg font-bold text-gray-800">踏足 {{ data['会议打卡城市数'] }} 个城市</span>
            </div>
            <p class="text-xs text-gray-500 mb-4 pl-9">
              超过全国
              <span class="text-[#FF7E5F] font-bold">{{ data['会议打卡城市排名击败比例'] }}%</span>
              的地区经理
            </p>
            <div class="flex flex-wrap gap-2 pl-9">
              <span
                v-for="c in data['会议打卡城市'].split(',').slice(0, 5)"
                :key="c"
                class="bg-white border border-gray-100 text-gray-600 px-3 py-1 rounded-xl text-xs font-bold shadow-sm"
              >
                {{ c }}
              </span>
            </div>
          </div>
          <div class="bg-white/40 p-6 rounded-3xl text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-gray-600 font-bold text-sm leading-loose">
              有风有雨是常态
              <br />
              风雨兼程是状态
              <br />
              <span class="text-[#FF7E5F]">风雨无阻是心态</span>
            </p>
          </div>
        </div>

        <!-- Part 11: 会议类型 -->
        <div v-else-if="page === 10" key="p11" class="flex flex-col justify-center px-6 relative pb-10">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">会议全景</h2>
          </div>
          <div class="clay-card p-6 mb-6 animate-pop">
            <div class="space-y-3 text-sm text-gray-600">
              <div class="flex justify-between">
                <span>国内会 (线上)</span>
                <span class="font-bold">{{ data['国内会（线上）会议场次'] }} 场</span>
              </div>
              <div class="flex justify-between">
                <span>国内会 (线下)</span>
                <span class="font-bold">{{ data['国内会（线下）会议场次'] }} 场</span>
              </div>
              <div class="flex justify-between">
                <span>小型会 (线上)</span>
                <span class="font-bold">{{ data['小型会议（线上）会议场次'] }} 场</span>
              </div>
              <div class="flex justify-between">
                <span>小型会 (线下)</span>
                <span class="font-bold">{{ data['小型会议（线下）会议场次'] }} 场</span>
              </div>
              <div class="w-full h-px bg-gray-100 my-2"></div>
              <div class="flex justify-between text-[#FF7E5F]">
                <span>会议支持</span>
                <span class="font-bold">{{ data['会议支持会议场次'] }} 场</span>
              </div>
            </div>
          </div>

          <div class="clay-card p-6 animate-pop" style="animation-delay: 0.1s">
            <span class="inline-block bg-[#FFE5D9] text-[#FF7E5F] px-3 py-1 rounded-lg text-xs font-bold mb-3">
              {{ data['会议类型比例分类'] }}
            </span>
            <template v-if="data['会议类型比例分类'] === '线上会议居多'">
              <p class="text-gray-700 font-bold leading-relaxed text-sm">"花会沿路盛开，你以后的路也是"</p>
            </template>
            <template v-else-if="data['会议类型比例分类'] === '线下会议居多'">
              <p class="text-gray-700 font-bold leading-relaxed text-sm">"追风赶月莫停留，平芜尽处是春山"</p>
            </template>
            <template v-else-if="data['会议类型比例分类'] === '线上与线下持平'">"关关难过关关过，长路漫漫亦灿灿"</template>
          </div>
        </div>

        <!-- Part 12: 忙碌月份 -->
        <div v-else-if="page === 11" key="p12" class="flex flex-col justify-center px-6 relative">
          <div class="clay-sphere w-48 h-48 bg-red-100 bottom-[-40px] left-[-40px] animate-float opacity-40"></div>
          <div class="clay-card p-8 text-center animate-pop relative z-10">
            <p class="text-gray-400 text-xs mb-4 uppercase tracking-widest">Busiest Month</p>
            <h2 class="text-6xl font-black text-[#FF7E5F] mb-2">{{ data['会议场次最多的月份'] | formatDate('M') }}月</h2>
            <p class="text-gray-800 font-bold text-lg mb-8">累计召开 {{ data['会议场次最多月份的会议场次'] }} 场会议</p>
            <div class="bg-gray-50 p-4 rounded-2xl">
              <p class="text-sm text-gray-600 font-bold">
                <template v-if="data['会议场次最多月份的会议场次排名分类'] === '优'">
                  "梦想不会发光，
                  <br />
                  但成长终会掷地有声"
                </template>
                <template v-else-if="data['会议场次最多月份的会议场次排名分类'] === '良'">
                  "所有的付出都将有所回报，
                  <br />
                  只不过每颗种子的花期不一样而已"
                </template>
                <template v-else-if="data['会议场次最多月份的会议场次排名分类'] === '一般'">
                  "种一棵树最好的时间是十年前，
                  <br />
                  其次就是现在"
                </template>
              </p>
            </div>
          </div>
        </div>

        <!-- Part 13: 邀请客户 -->
        <div v-else-if="page === 12" key="p13" class="flex flex-col justify-center px-6 relative">
          <div class="text-center animate-pop mb-8 relative z-10">
            <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
              <LucideIcon name="users" :size="32" class="text-blue-500" />
            </div>
            <h2 class="text-3xl font-black text-gray-800">共赴山海</h2>
          </div>
          <div class="clay-card p-8 animate-pop relative z-10">
            <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <span class="text-gray-500 text-sm">邀请客户</span>
              <span class="text-2xl font-black text-gray-800">
                {{ data['邀请参会的客户数'] }}
                <span class="text-xs font-normal text-gray-400">位</span>
              </span>
            </div>
            <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <span class="text-gray-500 text-sm">累计人次</span>
              <span class="text-2xl font-black text-gray-800">{{ data['邀请参会的人次数'] }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-500 text-sm">参与会议</span>
              <span class="text-2xl font-black text-gray-800">
                {{ data['邀请参会的会议数'] }}
                <span class="text-xs font-normal text-gray-400">场</span>
              </span>
            </div>
          </div>
          <div class="mt-8 text-center animate-pop relative z-10" style="animation-delay: 0.1s">
            <p class="text-[#FF7E5F] font-bold text-sm">
              "所有扎根的付出，终会破土成荫
              <br />
              真正的幸运从来都藏在坚持里"
            </p>
          </div>
        </div>

        <!-- Part 14: 奋战100天 (团队) -->
        <div v-else-if="page === 13" key="p14" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">奋战100天</h2>
          </div>
          <div class="bg-[#FF7E5F] rounded-[32px] p-8 mb-6 animate-pop text-center text-white shadow-xl relative overflow-hidden">
            <div class="clay-sphere w-20 h-20 bg-white opacity-20 top-[-10px] left-[-10px]"></div>
            <LucideIcon name="flame" :size="32" class="mx-auto mb-2 relative z-10" />
            <p class="opacity-90 text-sm mb-2 relative z-10">2025年下半年</p>
            <p class="opacity-90 text-xs mb-4 relative z-10">团队查房打卡满100天</p>
            <div class="flex justify-center items-baseline gap-1 relative z-10">
              <span class="text-6xl font-black">{{ data['地区累计查房打卡满100天人数'] }}</span>
              <span class="text-sm opacity-80">位伙伴</span>
            </div>
          </div>
          <div class="clay-card p-6 text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-gray-500 text-xs mb-1">团队共发表帖子</p>
            <p class="text-2xl font-black text-gray-800 mb-4">{{ data['地区发表查房打卡帖子篇数'] }} 篇</p>
            <div class="w-full h-px bg-gray-100 my-4"></div>
            <p class="text-sm text-gray-700 font-bold leading-relaxed">
              "最慢的步伐不是跬步而是徘徊
              <br />
              最快的脚步不是冲刺而是坚持"
            </p>
          </div>
        </div>

        <!-- Part 15: 结尾 -->
        <div v-else-if="page === 14" key="p15" class="flex flex-col justify-center px-8 text-center relative overflow-hidden">
          <div class="clay-sphere w-64 h-64 bg-[#FAD390] top-[-50px] right-[-50px] opacity-40 animate-float"></div>
          <div class="animate-pop relative z-10">
            <h2 class="text-2xl font-bold text-gray-500 mb-2">春生夏长 秋收冬藏</h2>
            <h1 class="text-4xl font-black text-gray-800 mb-8">一年倏忽行至尾声</h1>
            <div class="clay-card p-8">
              <p class="text-gray-700 leading-loose font-medium">
                我们站在时间转角处
                <br />
                回望来路并不平坦
                <br />
                但言此行值得！
              </p>
            </div>
          </div>
        </div>

        <!-- Part 16: 祝语 & 抽签 -->
        <div v-else key="end" class="flex flex-col justify-center px-6 relative end">
          <div class="clay-card flex-1 max-h-[85%] flex flex-col items-center justify-center p-6 text-center animate-pop relative z-10">
            <!-- 抽签前 -->
            <div v-if="!blessing" class="w-full">
              <div
                class="w-24 h-24 bg-gradient-to-tr from-[#FF9A9E] to-[#FECFEF] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg animate-float"
              >
                <LucideIcon name="wand2" :size="40" class="text-white" />
              </div>
              <p class="text-gray-500 mb-4 text-sm font-medium">
                有梦不觉天涯远
                <br />
                沧笙踏歌再向前！
              </p>
              <button @click="getBlessingClick" class="clay-btn px-10 py-4 text-lg w-full flex items-center justify-center gap-2 shadow-xl">
                抽取 2026 灵签
              </button>
            </div>

            <!-- 抽签后 -->
            <div v-else class="w-full animate-bounce-in">
              <div class="mb-8">
                <p class="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">2026 Lucky Keyword</p>
                <div class="bg-[#FFF0E5] py-8 px-4 rounded-[32px] border-2 border-white shadow-sm">
                  <h2 class="text-4xl font-black text-[#FF7E5F] mb-0 whitespace-break-spaces">{{ blessing }}</h2>
                </div>
              </div>

              <p class="text-xs text-gray-400 leading-relaxed mb-8">
                2025年，你辛苦了！
                <br />
                愿你永远忠于自己，
                <br />
                披星戴月奔向理想和所爱，
                <br />
                <span class="font-bold text-gray-600">保持热爱，奔赴下一场山海！</span>
              </p>

              <div class="flex gap-3 w-full">
                <button
                  class="flex-1 py-3 bg-white text-gray-600 rounded-2xl font-bold text-sm shadow-sm border border-gray-200"
                  @click="restart"
                >
                  回看
                </button>
                <button class="flex-1 py-3 clay-btn rounded-2xl text-sm flex items-center justify-center gap-2" @click="share">
                  <LucideIcon name="share-2" :size="14" />
                  分享
                </button>
              </div>
            </div>
          </div>
          <p class="text-[10px] text-gray-400 text-center mt-4 opacity-60">
            此文案仅作为大家回溯2025年工作记录使用，
            <br />
            文案中统计的数据若有偏差请忽略，感谢大家的理解~
          </p>
        </div>
      </transition>
    </div>

    <!-- 2. 底部区域：悬浮胶囊按钮 -->
    <div class="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-2 z-50">
      <!-- 按钮本体 (pointer-events-auto 确保可点击) -->
      <button v-if="page === 0" @click="next" class="nav-capsule-btn pointer-events-auto animate-pop mx-auto">开启年度足迹</button>
      <button v-else-if="page < 15" @click="next" class="nav-capsule-btn pointer-events-auto animate-pop mx-auto">下一页</button>
      <!-- 进度条 -->
      <div class="mt-6 h-1 bg-gray-300/50 rounded-full overflow-hidden w-24 mx-auto">
        <div class="h-full bg-[#FF7E5F] transition-all duration-300" :style="{ width: ((page + 1) / 16) * 100 + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LucideIcon from './components/LucideIcon.vue';
import moment from 'moment';
export default {
  name: 'DistrictManager',
  components: { LucideIcon },
  filters: {
    formatDate(value, format = 'YYYY-MM-DD HH:mm:ss') {
      if (!value) return '';
      return moment(value).format(format);
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    getBlessing: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      page: 0,
      blessing: null,
      sy: 0,
      ey: 0
    };
  },
  computed: {
    // 动态背景类
    themeClass() {
      const p = this.page;
      if (p === 1) return 'theme-part2';
      if (p === 2) return 'theme-road'; // 起点页
      if (p === 3) return 'theme-team'; // 团队的力量
      if (p === 4) return 'theme-part5';
      if ([6, 11].includes(p)) return 'theme-growth';
      if ([5, 7, 13].includes(p)) return 'theme-work';
      if (p === 8) return 'theme-academic';
      if ([9, 10, 12].includes(p)) return 'theme-meeting';
      return 'theme-intro';
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') this.next();
    },
    close() {
      this.$emit('close');
    },
    next() {
      if (this.page === 0) {
        this.$emit('start');
      }
      if (this.page < 15) this.page++;
    },
    prev() {
      if (this.page > 0) this.page--;
    },
    restart() {
      this.page = 0;
    },
    ts(e) {
      this.sy = e.changedTouches[0].clientY;
    },
    tm(e) {
      this.ey = e.changedTouches[0].clientY;
    },
    te() {
      const diff = this.sy - this.ey;
      if (diff > 50) this.next();
      else if (diff < -50) this.prev();
    },
    getBlessingClick() {
      this.blessing = this.getBlessing();
    },
    share() {
      this.$emit('share');
    }
  }
};
</script>

<style scoped lang="scss">
.district-manager-bg {
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: all 0.8s ease;
    z-index: 0;
    opacity: 0.6;
  }
}

/* --- 主题背景配置 --- */
.theme-intro::before {
  background-image: url("@/assets/part1_bg.jpg");
}

.theme-part2::before {
  background-image: url("@/assets/part2_bg.jpg");
}

.theme-road::before {
  background-image: url("@/assets/part3_bg.jpg");
}

.theme-team::before {
  background-image: url("@/assets/Part4_D_bg.jpg");
}

.theme-part5::before {
  background-image: url("@/assets/Part5_D_bg.jpg");
}

.theme-meeting::before {
  background-image: url("@/assets/part1_bg.jpg");
  filter: hue-rotate(160deg) saturate(0.8);
}

.theme-work::before {
  background-image: url("@/assets/part1_bg.jpg");
  filter: hue-rotate(80deg) saturate(0.9);
}

.theme-growth::before {
  background-image: url("@/assets/part1_bg.jpg");
  filter: hue-rotate(-20deg) brightness(1.05);
}

.theme-academic::before {
  background-image: url("@/assets/part1_bg.jpg");
  filter: hue-rotate(190deg) brightness(0.95);
}

.container {
  z-index: 10;
}

.container {
  > div {
    padding-top: 72px;
    padding-bottom: 160px;
    min-height: 100%;
    &.end {
      padding-bottom: 60px !important;
    }
  }
}

/* --- 核心组件：黏土卡片 --- */
.clay-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 32px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 20px 20px 40px rgba(174, 174, 192, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.8),
    inset 4px 4px 8px rgba(255, 255, 255, 0.5), inset -4px -4px 8px rgba(174, 174, 192, 0.05);
}

/* --- 核心组件：黏土按钮 --- */
.clay-btn {
  background: #ff7e5f;
  color: white;
  border: none;
  border-radius: 24px;
  font-weight: 800;
  box-shadow: 8px 8px 16px rgba(255, 126, 95, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.3);
  transition: all 0.1s;
  cursor: pointer;
}

.rounded-full {
  border-radius: 9999px !important;
}

.clay-btn:active {
  transform: scale(0.96);
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* --- 顶部控制按钮 (新增样式) --- */
.control-btn-top {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  /* 圆形，与音乐图标一致 */
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  color: #4b5563;
}

.control-btn-top:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.6);
}

/* --- 底部下一页按钮 (悬浮胶囊) --- */
.nav-capsule-btn {
  background: #ff7e5f;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 50px;
  /* 胶囊形状 */
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  /* 强烈的悬浮阴影 */
  box-shadow: 0 10px 20px rgba(255, 126, 95, 0.3), inset 2px 2px 4px rgba(255, 255, 255, 0.3), inset -2px -2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  width: auto;
  /* 不再是全宽 */
  min-width: 160px;
}

.nav-capsule-btn:active {
  transform: scale(0.95) translateY(2px);
  box-shadow: 0 4px 10px rgba(255, 126, 95, 0.2);
}

/* --- 装饰元素 --- */
.clay-sphere {
  position: absolute;
  border-radius: 50%;
  box-shadow: inset 10px 10px 20px rgba(255, 255, 255, 0.6), inset -10px -10px 20px rgba(0, 0, 0, 0.05), 10px 10px 20px rgba(0, 0, 0, 0.05);
}

/* --- 动画系统 --- */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-pop {
  animation: pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  100% {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  30% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  60% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.animate-bounce-in {
  animation: bounceIn 0.8s both;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-12px);
  }
}

@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
