export const redmineEnums = {
    redmineProjectIds: {
        "iGlucoGooglePlay": 1494,
        "iGlucoAppStore": 1522,
        "myVitalsGooglePlay": 1546,
        "myVitalsAppStore": 1545,
        "FDA": 1523
    },
    issueStatus: {
        "code_optimization": 25,
        "new": 1,
        "processing": 2,
        "closed": 5,
        "reopen": 13,
        "next_version_resolve": 14,
        "repeat": 15,
        "wait_verify": 26,
        "demand_problem": 17,
        "not_reproduced": 18,
        "Invalid": 21,
        "completed": 24,
        "feedback": 22,
        "standby2": 27,
        "standby3": 28,
        "standby4": 29
    },
    issueTags: {
        "致命": 8,
        "严重": 10,
        "一般": 9,
        "建议": 12,
        "测试计划": 16,
        "迭代需求": 13,
        "开发计划": 15,
        "重要事件": 17,
        "建议性需求": 18,
        "遗留问题": 19,
        "回顾": 20
    },
    receiver: {
        "李澄": 0,
        "包磊": 1
    },
    "origin": {
        "美国客服": 0,
        "欧洲客服": 1,
        "外销市场": 2,
        "Apple Store": 3,
        "Google Play": 4,
        "FDA": 5,
        "其他": 6
    },
    "department": {
        "Andon": 0,
        "iHealth 硬件产品室": 1,
        "iHealth 模块开发部": 2,
        "iHealth 公共开发部": 3,
        "iHealth iGluco App": 4,
        "iHealth MyVitals App": 5,
        "iHealth 采集云": 6,
        "iHealth 用户中心": 7,
        "iHealth Web App": 8,
        "iHealth 运维组": 9
    },
    "test_methods": {
        "手动测试": 0,
        "自动化测试": 1
    },
    "bug_classification": {
        "HMI（翻译，表示错误）": 0,
        "与下位机通信（适配血糖仪，识别试纸）": 1,
        "注册，登陆（facebook登陆，找回密码）": 2,
        "测量（扫码、离线数据管理、手动输入）": 3,
        "进度": 4,
        "历史记录（查询，修改）": 5,
        "学习（网站跳转）": 6,
        "设置（设置菜单中内容）": 7,
        "推送": 8,
        "版本升级": 9,
        "网络通信": 10,
        "Flurry": 11,
        "手机健康数据同步": 12
    },
    "layer": {
        "通讯层": 0,
        "app": 1,
        "硬件": 2,
        "云端": 3,
        "蓝牙": 4,
        "SDK": 5
    },
    "orgin": {
        "GooglePlay": "googlePlay",
        "AppStore": "Itunes Connect",
        "FDA": "fda",
        "Zendesk": "zendesk"
    },
    "app": {
        "GlucoSmart": "GlucoSmart",
        "MyVitals": "MyVitals"
    }
}
