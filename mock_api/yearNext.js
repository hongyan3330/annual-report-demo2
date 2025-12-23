export const login = (params) => {
    return Promise.resolve({
        success: true,
        value: { token: 'mock_token' }
    });
};

export const getUserFullTimeMaster = () => {
    return Promise.resolve({
        employeeName: '张三',
        departmentName: '康哲医药代表部',
        postName: '医药代表',
        isHead: 'NO',
        openID: 'mock_openid'
    });
};

export const getYearReport = (params) => {
    const mockData = [
        { item_name: '入职日期', item_value: '2021-07-19' },
        { item_name: '分管医院数', item_value: 12 },
        { item_name: '分管客户数', item_value: 85 },
        { item_name: '触碰客户数', item_value: 78 },
        { item_name: '客户触碰率', item_value: 91.7 },
        { item_name: '月均触碰客户数', item_value: 15 },
        { item_name: '月均触碰客户数全国排名', item_value: 168 },
        { item_name: '月均触碰客户数全国排名击败比例', item_value: 85 },
        { item_name: '大咖+现有讲者&现有讲者累计提级客户数', item_value: 5 },
        { item_name: '大咖+现有讲者&现有讲者累计新培养客户数', item_value: 3 },
        { item_name: '拜访次数', item_value: 1250 },
        { item_name: '拜访客户数', item_value: 90 },
        { item_name: '拜访重点客户数', item_value: 45 },
        { item_name: '早访次数', item_value: 120 },
        { item_name: '夜访次数', item_value: 85 },
        { item_name: '拜访排名分类', item_value: '优' },
        { item_name: '最早早访时间', item_value: '2025-07-08 06:20:00' },
        { item_name: '最晚夜访时间', item_value: '2025-11-03 23:50:00' },
        { item_name: '会议总场次', item_value: 156 },
        { item_name: '会议总场次全国排名', item_value: 120 },
        { item_name: '会议总场次全国排名击败比例', item_value: 92 },
        { item_name: '会议总场次排名分类', item_value: '优' },
        { item_name: '会议打卡城市数', item_value: 5 },
        { item_name: '会议打卡城市排名击败比例', item_value: 88 },
        { item_name: '会议打卡城市', item_value: '上海市,北京市,广州市,深圳市,杭州市' },
        { item_name: '国内会（线上）会议场次', item_value: 45 },
        { item_name: '国内会（线下）会议场次', item_value: 32 },
        { item_name: '小型会（线上）会议场次', item_value: 28 },
        { item_name: '小型会议（线下）会议场次', item_value: 51 },
        { item_name: '会议支持会议场次', item_value: 10 },
        { item_name: '会议类型比例分类', item_value: '线下会议居多' },
        { item_name: '会议场次最多的月份', item_value: '2025-07-01' },
        { item_name: '会议场次最多月份的会议场次', item_value: 25 },
        { item_name: '会议场次最多月份的会议场次排名分类', item_value: '优' },
        { item_name: '邀请参会的客户数', item_value: 128 },
        { item_name: '邀请参会的人次数', item_value: 856 },
        { item_name: '邀请参会的会议数', item_value: 42 },
        { item_name: '任职资格累计提升次数', item_value: 1 },
        { item_name: '任职提升累计提升等级', item_value: 1 },
        { item_name: '任职提升累计提升档位', item_value: 2 },
        { item_name: '发帖数', item_value: 15 },
        { item_name: '收获点赞数', item_value: 128 },
        { item_name: '获得积分数', item_value: 560 },
        { item_name: '查房打卡天数', item_value: 105 },
        { item_name: '查房打卡发表帖子数', item_value: 12 }
    ];
    return Promise.resolve(mockData);
};
