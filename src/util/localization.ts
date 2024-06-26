export function displayText(original: string, replacements: Record<string, string> = {}): string {
  const translations: Readonly<Record<string, Record<string, string>>> = Object.freeze({
    CN: {
      "Automatic Arousal Expressions (Replaces Vanilla)": "自动欲望表情 (替换原版)",
      "Activity Expressions": "活动表示",
      "Alternate Arousal (Replaces Vanilla, requires hybrid/locked arousal meter)":
        "另一种欲望 (替换原版, 需要混合或锁定欲望条)",
      "Alternative speech stutter": "另一种言语不清",
      "Extended wardrobe slots (96)": "扩展衣柜保存槽 (96个)",
      "Replace wardrobe list with character previews": "使用角色预览替换衣柜保存列表",
      "Clear Drawing Cache Hourly": "每小时清除绘图缓存",
      "Instant messenger": "即时通讯",
      "Chat Links and Embeds": "聊天链接和嵌入",
      "Use Ctrl+Enter to OOC": "使用Ctrl+Enter进行OOC发言",
      "Use italics for input when whispering": "悄悄话使用斜体字",
      "Improve colors for readability": "改善颜色以提高可读性",
      "Show friend presence notifications": "显示好友在线通知",
      "Understand All Gagged and when Deafened": "在被堵住嘴和被堵住耳朵时可以听懂所有发言",
      "Reveal Lockpicking Order Based on Skill": "根据技能显示撬锁/开锁顺序",
      "Allow layering menus while bound": "允许在捆绑时用分层菜单",
      "Limited gag anti-cheat: cloth-gag equivalent garbling": "有限的堵嘴反作弊: 和布堵嘴相同的乱码",
      "Full gag anti-cheat: use equipped gags to determine garbling": "完整的堵嘴反作弊: 使用当前装备的堵嘴来确定乱码",
      "Extra gag anti-cheat: even more garbling for the most extreme gags":
        "扩展的堵嘴反作弊: 对于使用最极端的堵嘴更加混乱",
      "Require glasses to see": "需要眼镜才能看清",
      "Automatic Relogin on Disconnect": "断线后自动重连",
      "Show gag cheat and anti-cheat options in chat": "在聊天室里显示堵嘴作弊和反作弊选项",
      "Automatically ghost+blocklist unnaturally new users": "自动对不自然的用户无视并添加黑名单",
      "Confirm leaving the game": "离开游戏前需要确认",
      "Discreet mode (disable drawing)": "谨慎模式 (禁用绘图)",
      "Make automatic progress while struggling": "在挣扎时自动增加进度",
      "Allow leashing without wearing a leashable item (requires leasher to have WCE too)":
        "允许在不佩戴牵引绳的情况下也可以进行牵引（需要牵引者也安装有WCE）",
      "Enable buttplug.io (requires refresh)": "启用buttplug.io（需要刷新网页)",
      "This page allows configuration of the synchronization of bluetooth connected toys.":
        "此页面允许配置将BC震动器状态同步到蓝牙连接的玩具",
      "Save & browse seen profiles (requires refresh)": "保存并浏览已知的个人资料 (需要刷新)",
      "Chat & Social": "聊天 & 社交",
      "Activities & Arousal": "活动 & 欲望",
      "Appearance & Wardrobe": "外观 & 衣柜",
      "Immersion & Anti-Cheat": "沉浸体验 & 反作弊",
      Performance: "表现",
      Misc: "杂项",
      Cheats: "作弊",
      ah: "啊",
      aah: "啊❤",
      mnm: "唔姆",
      nn: "嗯啊",
      mnh: "嗯哈",
      mngh: "唔啊",
      haa: "哈啊",
      nng: "嗯嗯❤",
      mnng: "唔啊❤",
      "FBC Developer": "FBC 开发者",
      "WCE Developer": "WCE 开发者",
      Incompatibility: "不兼容",
      "Show recent WCE changelog": "显示最近的WCE更新日志",
      "Include binds?": "包括束缚？",
      "Include locks?": "包括锁？",
      "Include height, body type, hair, etc?": "包括身高，体型，头发等？",
      "Copy the looks string below": "复制下面的外观字符串",
      "Paste your looks here": "在这里粘贴你的外观",
      "No looks string provided": "没有提供外观字符串",
      "Applied looks": "应用外观",
      "Could not parse looks": "无法解析外观",
      "[membernumber] [message]: beep someone": "[用户编号] [消息]: 发送beep",
      "Wholesome Club Extensions (WCE) Settings": "Wholesome Club Extensions (WCE)设置",
      "Join Discord": "加入Discord",
      License: "授权",
      Information: "信息",
      "Still connecting or connection failed...": "正在连接或连接失败...",
      Scan: "搜索",
      "Device Name": "设备名称",
      "Synchronized Slot": "同步栏位",
      "Click on a setting to see its description": "点击设置以查看其描述",
      "WCE Settings": "WCE设置",
      "Saved Logins (WCE)": "已保存的登录 (WCE)",
      "Save (WCE)": "保存 (WCE)",
      "Reconnected!": "重新连接！",
      ERROR: "错误",
      "Reset all expressions": "重置所有表情",
      "['list' or name of emote]: run an animation": "['list' 或 表情名称]: 运行一个动画",
      "['list' or list of poses]: set your pose": "['list' 或 姿势列表]: 设置你的姿势",
      "Load without body parts": "加载时不包括身体部位",
      "Exclude body parts": "排除身体部位",
      Gagging: "堵嘴",
      "Antigarble anti-cheat strength": "反堵嘴反作弊强度",
      "Understand: Yes": "理解: 是",
      "Understand gagspeak: No": "理解堵嘴说话: 否",
      "Understand gagspeak: Yes": "理解堵嘴说话: 是",
      "Having recovered your glasses you can see again!": "找回了你的眼镜，你可以看见了！",
      "Having lost your glasses your eyesight is impaired!": "失去了你的眼镜，你的视力受损了！",
      "([WCE] Force them to become a Club Slave.)": "([WCE] 强制他们成为俱乐部奴隶。)",
      "(She will become a Club Slave for the next hour.)": "(她将成为俱乐部奴隶，持续一个小时。)",
      "Search for a friend": "搜索好友",
      "Sending beeps is currently restricted by BCX rules": "发送beep目前受到BCX规则的限制",
      Online: "在线",
      Offline: "离线",
      "Instant Messenger (Disabled by BCX)": "即时通讯器 (被BCX禁用)",
      "Instant Messenger": "即时通讯器",
      "WCE Changelog": "WCE更新日志",
      "Trust this session": "信任此会话",
      "(embed)": "(嵌入)",
      "(This origin is trusted by authors of WCE)": "(此来源已被WCE作者信任)",
      "Deny for session": "拒绝此会话",
      "Allow for session": "允许此会话",
      OnlineChat: "在线聊天",
      "Scans for connected buttplug.io toys": "扫描已连接的buttplug.io玩具",
      "buttplug.io is not connected": "buttplug.io未连接",
      "Scanning stopped": "扫描停止",
      "Scanning for toys": "扫描玩具",
      "Last seen: ": "最后在线: ",
      "No profile found": "未找到个人资料",
      Open: "打开",
      "Saved Profiles": "已保存的个人资料",
      "Personal notes (only you can read these):": "个人笔记 (只有你可以读到):",
      "[WCE] Notes": "[WCE] 笔记",
      "Toggle Editing Mode": "切换编辑模式",
      "Paste the craft here": "在这里粘贴制作物品",
      "Copy the craft here": "在这里复制制作物品",
      Import: "导入",
      Export: "导出",
      "Description:": "描述:",
      "Animation Engine": "动画引擎",
      "Show numeric arousal meter": "显示欲望条数值",
      "Show friends going offline too": "显示朋友离线通知",
      "Show friend presence notifications in chat, when possible": "在聊天室里显示好友在线通知",
      "Show sent messages while waiting for server": "在等待服务器时显示已发送的消息",
      "Show whisper button on chat messages (requires refresh)": "在聊天消息上显示悄悄话按钮 （需要刷新网页)",
      "Rich online profile": "丰富的在线个人资料",
      "Allow IMs to bypass BCX beep restrictions": "允许即时通讯绕过BCX beep限制",
      "Hide the hidden items icon": "不显示隐藏的物品图标",
      "Enable anti-cheat": "启用反作弊",
      "Blacklist detected cheaters automatically": "自动将检测到的作弊者加入黑名单",
      "Enable uwall anti-cheat": "启用uwall反作弊",
      "Prompt before loading content from a 3rd party domain": "在加载第三方域名的内容前提示",
      "Share Addons": "分享插件设置",
      "Buttplug Devices": "Buttplug设备",
    },
  });

  let text = translations[TranslationLanguage]?.[original] ?? original;
  for (const [key, val] of Object.entries(replacements)) {
    while (text.includes(key)) {
      text = text.replace(key, val);
    }
  }
  return text;
}
