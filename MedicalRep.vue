<template>
  <div :class="['w-full h-full relative flex flex-col medical-rep-bg', themeClass]">
    <!-- 1. 左上角：上一页按钮 -->
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
              <p class="text-gray-500 text-sm mb-2">回望来时路</p>
              <p class="text-xl font-bold text-gray-800 mb-6">我们已走过千山万水</p>
              <div class="w-full h-px bg-gray-200 my-6"></div>
              <p class="text-gray-500 text-sm mb-2">展望新征程</p>
              <p class="text-xl font-bold text-gray-800 mb-6">曙光跃动在地平线上</p>
              <p class="mt-4 font-black text-[#FF7E5F] text-2xl">长空浩荡，未来已来！</p>
            </div>
          </div>
        </div>

        <!-- Part 3: 入职 -->
        <div v-else-if="page === 2" key="p3" class="flex flex-col justify-center px-6 relative">
          <div class="animate-pop mb-6 text-center">
            <h2 class="text-3xl font-black text-gray-800">相遇</h2>
          </div>
          <div class="clay-card p-8 flex flex-col items-center justify-center text-center animate-pop relative z-10">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-md">
              <LucideIcon name="calendar-heart" :size="40" class="text-blue-500" />
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">你好呀，{{ data['用户名'] }}</h3>
            <div class="bg-[#FFF0E5] p-6 rounded-3xl w-full mb-6 border border-white text-left">
              <p class="text-gray-500 text-sm mb-1">
                还记得
                <span class="font-bold text-[#FF7E5F]">{{ data['入职日期'] }}</span>
                吗？
              </p>
              <p class="text-gray-800 font-bold mb-4">那是你与康哲的第一次相遇</p>
              <div class="w-full h-px bg-white my-3"></div>
              <p class="text-gray-600 text-sm">今天，我们已经共同走过了</p>
              <div class="mt-2">
                <span class="font-black text-5xl text-[#FF7E5F]">{{ data['入职天数'] }}</span>
                <span class="text-gray-500">天</span>
              </div>
            </div>
            <p class="text-gray-400 text-sm italic">"走着走着，回忆渐浓......"</p>
          </div>
        </div>

        <!-- Part 4: 分管 -->
        <div v-else-if="page === 3" key="p4" class="flex flex-col justify-center px-6 relative pb-10">
          <div class="mb-6 animate-pop">
            <span class="inline-block px-3 py-1 bg-white/60 rounded-full text-xs text-gray-500 font-bold mb-2">2025 · 耕耘</span>
            <h2 class="text-3xl font-black text-gray-800">分管版图</h2>
          </div>

          <div class="clay-card p-6 mb-6 animate-pop">
            <div class="flex justify-between items-start mb-6">
              <div class="text-center flex-1">
                <p class="text-gray-500 text-xs mb-1">分管医院</p>
                <span class="font-black text-3xl text-gray-800">{{ data['分管医院数'] }}</span>
                <span class="text-xs text-gray-400 ml-1">家</span>
              </div>
              <div class="w-px bg-gray-200 h-10 mx-2 mt-2"></div>
              <div class="text-center flex-1">
                <p class="text-gray-500 text-xs mb-1">分管客户</p>
                <span class="font-black text-3xl text-gray-800">{{ data['分管客户数'] }}</span>
                <span class="text-xs text-gray-400 ml-1">位</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="bg-white/50 p-4 rounded-2xl">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-sm text-gray-600 font-bold">触碰总客户数</span>
                  <span class="font-black text-xl text-[#FF7E5F]">
                    {{ data['触碰客户数'] }}
                    <span class="text-sm font-normal text-gray-500">位</span>
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-xs text-gray-400">触碰率</span>
                  <span class="text-xs font-bold text-[#FF7E5F]">{{ data['客户触碰率'] }}%</span>
                </div>
              </div>

              <div class="text-xs text-gray-500 space-y-2 pt-2 px-2">
                <div class="flex justify-between">
                  <span>月均触碰 (实际业务月)</span>
                  <span class="font-bold text-gray-700">{{ data['月均触碰客户数'] }} 位</span>
                </div>
                <div class="flex justify-between">
                  <span>全国排名</span>
                  <span class="font-bold text-[#FF7E5F]">第 {{ data['月均触碰客户数全国排名'] }} 名</span>
                </div>
                <div class="w-full h-px bg-gray-100 my-2"></div>
                <p class="text-center text-gray-400">
                  超过了全国约
                  <span class="font-bold text-[#FF7E5F]">{{ data['月均触碰客户数全国排名击败比例'] }}%</span>
                  的医药代表
                </p>
              </div>
            </div>
          </div>

          <div class="bg-white/40 p-4 rounded-2xl text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-gray-600 text-xs italic">"你的努力或许悄无声息，但成长终会掷地有声"</p>
          </div>
        </div>

        <!-- Part 5: 客户提级 -->
        <div v-else-if="page === 4" key="p5" class="flex flex-col justify-center px-6 relative">
          <div class="clay-sphere w-32 h-32 bg-purple-100 top-[-20px] right-[-20px] animate-float opacity-50"></div>
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
            <p class="text-sm text-gray-600 leading-relaxed mb-4 font-bold">"你的微笑和坚持，是70%的行动量+30%的方法！"</p>
            <div class="text-right">
              <span class="inline-block bg-[#FF7E5F] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                先动起来，再完美！
              </span>
            </div>
          </div>
        </div>

        <!-- Part 6: 拜访 -->
        <div v-else-if="page === 5" key="p6" class="flex flex-col justify-center px-6 relative pb-10">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">拜访时光</h2>
          </div>

          <div class="clay-card p-6 mb-6 animate-pop">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">🏃</div>
              <div>
                <p class="text-4xl font-black text-gray-800">{{ data['拜访次数'] }}</p>
                <p class="text-xs text-gray-400">总拜访次数</p>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-sm text-gray-600">拜访客户</span>
                <span class="font-bold text-gray-800">{{ data['拜访客户数'] }} 位</span>
              </div>
              <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                <span class="text-sm text-gray-600">重点客户</span>
                <span class="font-bold text-gray-800">{{ data['拜访重点客户数'] }} 位</span>
              </div>
              <div class="flex justify-between items-center pt-1">
                <span class="text-xs text-gray-400">早访 / 夜访</span>
                <span class="font-bold text-[#FF7E5F]">{{ data['早访次数'] }} / {{ data['夜访次数'] }} 次</span>
              </div>
            </div>
          </div>

          <div class="clay-card p-6 text-center animate-pop" style="animation-delay: 0.1s">
            <div class="mb-2">
              <span class="inline-block px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs font-bold tracking-wider">
                评级：{{ data['拜访排名分类'] }}
              </span>
            </div>
            <p class="text-gray-800 font-bold text-lg leading-relaxed">
              <!--拜访排名分类-->
              <template v-if="data['拜访排名分类'] === '优'">"星光不问赶路人，时光不负奋斗者"</template>
              <template v-else-if="data['拜访排名分类'] === '良'">"夜色难免黑凉，前行必有曙光"</template>
              <template v-else-if="data['拜访排名分类'] === '一般'">
                "凡事要趁早，
                <br />
                没有那么多来日方长"
              </template>
            </p>
          </div>
        </div>

        <!-- Part 7: 特早访 -->
        <div v-else-if="page === 6" key="p7" class="flex flex-col justify-center px-6 relative">
          <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#FFFBEB] to-transparent pointer-events-none"></div>
          <div class="relative z-10 animate-pop">
            <div class="clay-card p-2 inline-flex items-center gap-2 mb-6">
              <span class="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span class="text-xs font-bold text-gray-500">特早访记录</span>
            </div>
            <h2 class="text-6xl font-black text-gray-800 mb-2">
              {{ data['最早早访时间'] | formatDate('HH:mm') }}
            </h2>
            <p class="text-xl text-gray-400 mb-8">{{ data['最早早访时间'] | formatDate('M-D') }}</p>

            <div class="clay-card p-8">
              <p class="text-gray-600 leading-8">
                你进行了今年最早的一次拜访。
                <br />
                <span class="text-[#FF7E5F] font-bold">晨光会落在努力的人身上。</span>
                <br />
                别慌，慢慢来
                <br />
                你想要的，岁月会慢慢给。
              </p>
            </div>
          </div>
        </div>

        <!-- Part 8: 特晚访 -->
        <div v-else-if="page === 7" key="p8" class="flex flex-col justify-center px-6 relative">
          <!-- 移除冗余的深色背景，改用半透明遮罩 -->
          <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-0"></div>
          <div class="absolute top-10 right-10 w-20 h-20 bg-yellow-100 rounded-full blur-[40px] opacity-30 z-0"></div>

          <div class="relative z-10 animate-pop">
            <div class="bg-white/10 backdrop-blur-md p-2 rounded-full inline-flex items-center gap-2 mb-6 border border-white/20">
              <span class="w-2 h-2 bg-yellow-200 rounded-full"></span>
              <span class="text-xs font-bold text-white/80 pr-2">特晚访记录</span>
            </div>
            <h2 class="text-6xl font-black text-white mb-2">
              {{ data['最晚夜访时间'] | formatDate('HH:mm') }}
            </h2>
            <p class="text-xl text-gray-400 mb-8">{{ data['最晚夜访时间'] | formatDate('M-D') }}</p>

            <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-[32px] p-8 shadow-2xl">
              <p class="text-gray-200 leading-8">
                你进行了今年最晚的一次拜访。
                <br />
                <span class="text-white font-bold">向着月亮出发，</span>
                <br />
                即使不能到达，
                <br />
                也能站在群星之中。
              </p>
            </div>
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
            <p class="text-xs text-gray-500 mb-2">2025年 主负责会议</p>
            <p class="text-5xl font-black text-gray-800 mb-4">
              {{ data['会议总场次'] }}
              <span class="text-base font-normal text-gray-400">场</span>
            </p>
            <div class="flex justify-center gap-2">
              <span class="px-3 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                排名
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
                "海到无边天作岸，
                <br />
                山登绝顶我为峰"
              </template>
              <template v-else-if="data['会议总场次排名分类'] === '良'">
                "人生万事需自为，
                <br />
                跬步江山即寥廓"
              </template>
              <template v-else-if="data['会议总场次排名分类'] === '一般'">
                "倘若穷途末路，
                <br />
                那便势如破竹"
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
              的医药代表
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
              山高路远，止不住行者征程
              <br />
              <span class="text-[#FF7E5F]">春秋几变，篆刻鲲鹏轨迹</span>
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
                <span class="font-bold">{{ data['小型会（线上）会议场次'] }} 场</span>
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
              <p class="text-gray-700 font-bold leading-relaxed text-sm">"花自向阳开，人终往前走"</p>
            </template>
            <template v-else-if="data['会议类型比例分类'] === '线下会议居多'">
              <p class="text-gray-700 font-bold leading-relaxed text-sm">"没有一朵花，生来就是花。种子要历经风雨，才换来绽放的美丽"</p>
            </template>
            <template v-else-if="data['会议类型比例分类'] === '线上与线下持平'">"不必等待风暴过去，要学会在雨中跳舞"</template>
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
                  "披星戴月走过的路，
                  <br />
                  最终将会繁华满地"
                </template>
                <template v-else-if="data['会议场次最多月份的会议场次排名分类'] === '良'">
                  "世上没有白费的努力，
                  <br />
                  也没有碰巧的成功"
                </template>
                <template v-else-if="data['会议场次最多月份的会议场次排名分类'] === '一般'">
                  "海压竹枝低复举，
                  <br />
                  风吹山角晦还明"
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
            <p class="text-[#FF7E5F] font-bold text-sm">"进取点点星铺路，步履稳踏自成功"</p>
          </div>
        </div>

        <!-- Part 14: 任职资格 -->
        <div v-else-if="page === 13" key="p14" class="flex flex-col justify-center px-6 relative">
          <div class="clay-sphere w-32 h-32 bg-yellow-100 top-20 right-[-20px] animate-float opacity-50"></div>
          <div class="clay-card p-8 text-center animate-pop relative z-10">
            <div class="w-20 h-20 bg-[#FFF9C4] rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
              <LucideIcon name="medal" :size="40" class="text-[#FBC02D]" />
            </div>

            <template v-if="data['任职资格累计提升次数'] > 0">
              <h2 class="text-2xl font-black text-gray-800 mb-2">任职资格提升</h2>
              <p class="text-6xl font-black text-[#FF7E5F] mb-6">
                {{ data['任职资格累计提升次数'] }}
                <span class="text-base text-gray-400 font-normal">次</span>
              </p>
              <div class="flex justify-center gap-3 mb-6">
                <span class="px-4 py-2 bg-[#DCFCE7] text-[#15803D] rounded-xl text-xs font-bold shadow-sm">
                  等级 +{{ data['任职提升累计提升等级'] }}
                </span>
                <span class="px-4 py-2 bg-[#DCFCE7] text-[#15803D] rounded-xl text-xs font-bold shadow-sm">
                  档位 +{{ data['任职提升累计提升档位'] }}
                </span>
              </div>
              <p class="text-sm text-gray-500 italic">"若生来就是太阳，便无需为照耀万物而致歉"</p>
            </template>

            <template v-else>
              <h2 class="text-2xl font-black text-gray-800 mb-4">沉淀的一年</h2>
              <p class="text-gray-600 leading-relaxed mb-6">
                2025年
                <br />
                你没有任职资格的提升
              </p>
              <p class="text-sm text-gray-500 leading-relaxed">
                "慢也好，步子小也好
                <br />
                是在往前走就好"
              </p>
            </template>
          </div>
        </div>

        <!-- Part 15: 查房 -->
        <div v-else-if="page === 14" key="p15" class="flex flex-col justify-center px-6 relative">
          <div class="mb-6 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">奋战100天</h2>
          </div>
          <div class="bg-[#FF7E5F] rounded-[32px] p-8 mb-6 animate-pop text-center text-white shadow-xl relative overflow-hidden">
            <div class="clay-sphere w-20 h-20 bg-white opacity-20 top-[-10px] left-[-10px]"></div>
            <LucideIcon name="flame" :size="32" class="mx-auto mb-2 relative z-10" />
            <p class="opacity-90 text-sm mb-4 relative z-10">2025年下半年查房打卡</p>
            <div class="flex justify-center items-baseline gap-1 relative z-10">
              <span class="text-6xl font-black">{{ data['查房打卡天数'] }}</span>
              <span class="text-sm opacity-80">天</span>
            </div>
          </div>
          <div class="clay-card p-6 text-center animate-pop" style="animation-delay: 0.1s">
            <p class="text-gray-500 text-xs mb-1">发表帖子</p>
            <p class="text-2xl font-black text-gray-800 mb-4">{{ data['查房打卡发表帖子数'] }} 篇</p>
            <div class="w-full h-px bg-gray-100 my-4"></div>
            <p class="text-sm text-gray-700 font-bold leading-relaxed whitespace-break-spaces">
              {{ data['查房打卡天数'] >= 100 ? '"把行动交给现在，把结果交给时间"' : '"不要让胆怯掩盖了光芒，\n更不要让懒惰浪费了青春"' }}
            </p>
          </div>
        </div>

        <!-- Part 16: 社区活跃 -->
        <div v-else-if="page === 15" key="p16" class="flex flex-col justify-center px-6 relative">
          <div class="mb-8 animate-pop">
            <h2 class="text-3xl font-black text-gray-800">药企圈社区</h2>
          </div>
          <div v-if="data['发帖数'] > 0" class="grid grid-cols-2 gap-4 animate-pop">
            <div class="clay-card p-4 flex flex-col items-center justify-center h-32">
              <LucideIcon name="message-square" class="text-blue-400 mb-2" />
              <span class="text-2xl font-bold text-gray-800">{{ data['发帖数'] }}</span>
              <span class="text-xs text-gray-400">发布帖子</span>
            </div>
            <div class="clay-card p-4 flex flex-col items-center justify-center h-32">
              <LucideIcon name="thumbs-up" class="text-red-400 mb-2" />
              <span class="text-2xl font-bold text-gray-800">{{ data['收获点赞数'] }}</span>
              <span class="text-xs text-gray-400">获赞</span>
            </div>
            <div class="clay-card p-6 col-span-2 flex items-center justify-between px-8">
              <div>
                <span class="text-xs text-gray-400 block mb-1">获得积分</span>
                <span class="text-3xl font-bold text-gray-800">{{ data['获得积分数'] }}</span>
              </div>
              <LucideIcon name="gem" class="text-yellow-400" :size="40" />
            </div>
            <div class="col-span-2 mt-4 text-center">
              <p class="text-gray-500 text-sm font-bold">"人生没有白走的路，每一步都算数"</p>
            </div>
          </div>
          <div v-else class="clay-card p-8 text-center animate-pop flex flex-col justify-center min-h-[300px]">
            <p class="text-gray-600 leading-relaxed mb-6">
              2025年
              <br />
              你没有在药企圈进行互动发帖
            </p>
            <p class="text-[#FF7E5F] font-bold text-lg leading-relaxed">
              "允许自己的小世界存在
              <br />
              也别忘了打开门，让光进来"
            </p>
          </div>
        </div>

        <!-- Part 17: 结尾 -->
        <div v-else-if="page === 16" key="p17" class="flex flex-col justify-center px-8 text-center relative overflow-hidden">
          <div class="clay-sphere w-64 h-64 bg-[#FAD390] top-[-50px] right-[-50px] opacity-40 animate-float"></div>
          <div class="animate-pop relative z-10">
            <h2 class="text-2xl font-bold text-gray-500 mb-2">启一年复始</h2>
            <h1 class="text-5xl font-black text-gray-800 mb-10">待四序更新</h1>
            <div class="clay-card p-8">
              <p class="text-gray-700 leading-loose font-medium">
                今夜烟火向星辰
                <br />
                祝我们所愿皆成真
                <br />
                所求皆如愿
                <br />
                所行皆坦途！
              </p>
            </div>
          </div>
        </div>

        <!-- Part 18: 祝语 & 抽签 -->
        <div v-else key="end" class="flex flex-col justify-center px-6 relative end">
          <div class="clay-card flex-1 max-h-[85%] flex flex-col items-center justify-center p-6 text-center animate-pop relative z-10">
            <!-- 抽签前 -->
            <div v-if="!blessing" class="w-full">
              <div
                class="w-24 h-24 bg-gradient-to-tr from-[#FF9A9E] to-[#FECFEF] rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg animate-float"
              >
                <LucideIcon name="wand2" :size="40" class="text-white" />
              </div>
              <p class="text-gray-500 mb-8 text-sm font-medium">点击开启你的2026好运</p>
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
                2026就此启航
                <br />
                年岁初始，好事正酿
                <br />
                <span class="font-bold text-gray-600">愿新年胜旧年，欢愉且胜意</span>
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
      <button v-else-if="page < 17" @click="next" class="nav-capsule-btn pointer-events-auto animate-pop mx-auto">下一页</button>
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
  name: 'MedicalRep',
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
    // 未早访
    notEarlyVisit() {
      return !this.data['最早早访时间'];
    },
    // 未晚访
    notLateVisit() {
      return !this.data['最晚夜访时间'];
    },
    // 动态背景类
    themeClass() {
      const p = this.page;
      if ([0, 1, 16, 17].includes(p)) return 'theme-intro';
      if (p === 2) return 'theme-meeting';
      if ([3, 5, 6, 15].includes(p)) return 'theme-work';
      if ([4, 13, 14].includes(p)) return 'theme-growth';
      if ([8, 9, 10, 11, 12].includes(p)) return 'theme-academic';
      if (p === 7) return 'theme-night';
      return '';
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
      if (this.page < 17) this.page++;
      if (this.page === 6 && this.notEarlyVisit) this.page++;
      if (this.page === 7 && this.notLateVisit) this.page++;
    },
    prev() {
      if (this.page > 0) this.page--;
      if (this.page === 7 && this.notLateVisit) this.page--;
      if (this.page === 6 && this.notEarlyVisit) this.page--;
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
.medical-rep-bg {
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
  }
}

/* --- 主题背景配置 --- */
.theme-intro::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
}

.theme-meeting::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
  filter: hue-rotate(160deg) saturate(0.8);
}

.theme-work::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
  filter: hue-rotate(80deg) saturate(0.9);
}

.theme-growth::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
  filter: hue-rotate(-20deg) brightness(1.05);
}

.theme-academic::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
  filter: hue-rotate(190deg) brightness(0.95);
}

.theme-night::before {
  background-image: url("@/assets/medical_rep_bg.jpg");
  filter: brightness(0.4) hue-rotate(210deg) saturate(0.6);
}

.theme-night::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
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

.rounded-full {
  border-radius: 9999px !important;
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

.clay-btn:active {
  transform: scale(0.96);
  box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.1);
}

/* --- 顶部/底部控制按钮 (新增样式) --- */
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
