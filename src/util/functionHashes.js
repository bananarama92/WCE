/**
 * @param {string} gameVersion
 */
export const expectedHashes = (gameVersion) => {
  switch (gameVersion.toLowerCase()) {
    default:
      return /** @type {const} */ ({
        ActivityChatRoomArousalSync: "BFF3DED7",
        ActivitySetArousal: "3AE28123",
        ActivitySetArousalTimer: "1342AFE2",
        ActivityTimerProgress: "6CD388A7",
        AppearanceClick: "B6E6C8CE", // Screens/Character/Appearance/Appearance.js (2.5.2024)
        AppearanceLoad: "4360C485",
        AppearanceRun: "BDC2AC93", // Screens/Character/Appearance/Appearance.js (2.5.2024)
        CharacterAppearanceWardrobeLoad: "A5B63A03",
        CharacterBuildDialog: "85F79C6E",
        CharacterCompressWardrobe: "2A05ECD1",
        CharacterDecompressWardrobe: "327FADA4",
        CharacterDelete: "57AA5D48",
        CharacterGetCurrent: "69F45A41",
        CharacterLoadCanvas: "EAB81BC4",
        CharacterLoadOnline: "B1BCD3B1",
        CharacterNickname: "A794EFF5",
        CharacterRefresh: "301DA9CF",
        CharacterReleaseTotal: "BB9C6989",
        CharacterSetCurrent: "F46573D8",
        CharacterSetFacialExpression: "EC032BEE", // Scripts/Character.js (6.5.2024)
        CharacterSetActivePose: "566A14D7",
        ChatAdminRoomCustomizationClick: "9D859B28",
        ChatAdminRoomCustomizationProcess: "AF01C65A",
        ChatRoomAppendChat: "998F2F98",
        ChatRoomCharacterUpdate: "DE2DC592",
        ChatRoomCharacterViewDraw: "CA108410", // Screens/Online/ChatRoom/ChatRoomCharacterView.js (19.4.2024 )
        ChatRoomCharacterViewIsActive: "CD8066FA",
        ChatRoomClearAllElements: "D67A7839",
        ChatRoomClick: "F57069BB", // 747C51C4 antiGarble
        ChatRoomCurrentTime: "A462DD3A",
        ChatRoomDrawCharacterStatusIcons: "198C8657",
        ChatRoomHTMLEntities: "0A7ADB1D",
        ChatRoomKeyDown: "CBE6830E",
        ChatRoomListManipulation: "75D28A8B",
        ChatRoomMapViewCharacterIsVisible: "286C447D",
        ChatRoomMapViewCharacterOnWhisperRange: "B0D08E96",
        ChatRoomMapViewIsActive: "D181020D",
        ChatRoomMenuBuild: "F76AEFC3",
        ChatRoomMenuClick: "B1F7EBFB", // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMenuDraw: "83275135", // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomMessage: "BBD61334", // EA9F35DE ToDo
        ChatRoomMessageDisplay: "37B5D4F2", // 7B98A629 ToDo
        ChatRoomRegisterMessageHandler: "C432923A",
        ChatRoomResize: "653445D7", // F01AFCBA antiGarble
        ChatRoomRun: "9E0D7899", // 975B8ABD antiGarble
        ChatRoomSendChat: "C4C0688E", // 21606D2F ToDo
        ChatRoomSendChatMessage: "4F3BDB61", // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomSendWhisper: "2D2E4F8E", // Screens/Online/ChatRoom/ChatRoom.js (6.5.2024)
        ChatRoomStart: "9B822A9A",
        CommandExecute: "803D6C70", // C5477FA1 ToDo
        CommonClick: "1F6DF7CB",
        CommonColorIsValid: "390A2CE4",
        CommonSetScreen: "E10E2148",
        CraftingClick: "9169F897", // Screens/Room/Crafting/Crafting.js
        CraftingConvertSelectedToItem: "48270B42",
        CraftingRun: "51577F65", // Screens/Room/Crafting/Crafting.js
        DialogDrawItemMenu: "FCE556C2",
        DialogLeave: "C37553DC",
        DialogMenuButtonBuild: "E69567D2", // Scripts/Dialog.js (2.5.2024)
        DialogMenuButtonClick: "C1F5E0AF", // Scripts/Dialog.js (2.5.2024)
        DrawArousalMeter: "BB0755AF",
        DrawArousalThermometer: "7ED6D822",
        DrawBackNextButton: "9AF4BA37", // 7263249E ToDo
        DrawButton: "B747DF6E",
        DrawCharacter: "B175AF5E",
        DrawCheckbox: "00FD87EB",
        DrawImageEx: "E01BE7E7",
        DrawImageResize: "D205975A",
        DrawItemPreview: "6A7A1E2A",
        DrawProcess: "9776CBC2",
        DrawText: "C1BF0F50",
        DrawTextFit: "F9A1B11E",
        ElementCreateTextArea: "AA4AEDE7",
        ElementIsScrolledToEnd: "1CC4FE11",
        ElementScrollToEnd: "1AC45575",
        ElementValue: "4F26C62F",
        FriendListShowBeep: "6C0449BB",
        GameRun: "337CB358", // Scripts/Game.js
        GLDrawResetCanvas: "81214642",
        InformationSheetRun: "060A6DBA", // Screens/Character/InformationSheet/InformationSheet.js
        InterfaceTextGet: "66603471", // Scripts/Text.js (2.5.2024)
        InventoryGet: "E666F671",
        LoginClick: "ADA7E2B7", // Screens/Character/Login/Login.js
        LoginRun: "D1DB7A8A", // Screens/Character/Login/Login.js
        LoginSetSubmitted: "C88F4A8E",
        LoginStatusReset: "18619F02",
        MouseIn: "CA8B839E",
        NotificationDrawFavicon: "AB88656B",
        NotificationRaise: "E8F29646",
        NotificationTitleUpdate: "0E92F3ED",
        OnlineGameAllowChange: "3779F42C",
        OnlineProfileClick: "521146DF",
        OnlineProfileExit: "1C673DC8",
        OnlineProfileLoad: "BE8B009B",
        OnlineProfileRun: "7F57EF9A",
        PoseSetActive: "22C02050",
        PreferenceInitPlayer: "F6DF1324", // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenArousalClick: "D8DCBBB5", // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenArousalRun: "96A6157B", // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenRestrictionClick: "EDC419A0", // Screens/Character/Preference/Preference.js (6.5.2024)
        PreferenceSubscreenRestrictionRun: "54908E55", // Screens/Character/Preference/Preference.js (6.5.2024)
        RelogRun: "10AF5A60",
        RelogExit: "2DFB2DAD",
        ServerAccountBeep: "48D0BA71", // Scripts/Server.js 
        ServerAppearanceBundle: "4D069622",
        ServerAppearanceLoadFromBundle: "946537FD",
        ServerClickBeep: "3E6277BE",
        ServerConnect: "845E50A6",
        ServerDisconnect: "198FF7E7",
        ServerInit: "B6CEF7F1",
        ServerOpenFriendList: "FA8D3CDE",
        ServerPlayerExtensionSettingsSync: "1776666B",
        ServerSend: "ABE74E75",
        ServerSendQueueProcess: "BD4277AC",
        SkillGetWithRatio: "3EB4BC45",
        SpeechGarble: "9D669F73", // 44AA51A4 anitGarble
        SpeechGarbleByGagLevel: "F7555009", // 1D24B031 anitGarble
        SpeechGetTotalGagLevel: "5F4F6D45", // CE6ABFD1 anitGarble
        StruggleDexterityProcess: "7E19ADA9", // D185D348 ToDo
        StruggleFlexibilityCheck: "727CE05B",
        StruggleFlexibilityProcess: "278D7285", // 1A0B96EF ToDo
        StruggleLockPickDraw: "2F1F603B", // C04E2FBB ToDo
        StruggleMinigameHandleExpression: "1B3ABF55",
        StruggleMinigameStop: "FB05E8A9",
        StruggleStrengthProcess: "D20CF698", // B1A1457D ToDo
        TextGet: "4DDE5794",
        TextLoad: "0D535190",
        TimerInventoryRemove: "1FA771FB",
        TimerProcess: "BFB7FFE2",
        TitleExit: "F13F533C",
        ValidationSanitizeProperties: "659F5965",
        WardrobeClick: "33405B1D",
        WardrobeExit: "12D14AE4",
        WardrobeFastLoad: "AAB9F25B",
        WardrobeFastSave: "D1E906FD",
        WardrobeFixLength: "CA3334C6",
        WardrobeLoad: "C343A4C7",
        WardrobeRun: "633B3570",
      });
  }
};
