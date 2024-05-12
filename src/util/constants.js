export const FBC_VERSION = "6.2";
export const settingsVersion = 62;
export const SUPPORTED_GAME_VERSIONS = ["R104"];

export const fbcChangelog = `${FBC_VERSION} next
- add button to manual clear and reload the drawing cache of all characters in a chat room

6.1
- improved r103 compatibility
- removed fps limits/counter (now natively in base game in graphic preferences, page 2)
- make anti garble bypass (in restrictions preferences) availa ble on all difficulty levels

6.0
- forked the project by Kitty Stella (129178)
- restored features removed in 5.9 (this fork is based on 5.8)
- made it load seperate from FUSAM again (still requires FUSAM for it's API though)
- updated for r103
- fix rich profile sticking on the screen after disconnect
`;

export const DISCORD_INVITE_URL = "https://discord.gg/SHJMjEh9VH";
export const WEBSITE_URL = "https://github.com/KittenApps/WCE";

export const BCE_COLOR_ADJUSTMENTS_CLASS_NAME = "bce-colors";
export const BCE_LICENSE = "https://github.com/KittenApps/WCE/blob/main/LICENSE";
export const BCE_MAX_AROUSAL = 99.6;
export const BCE_MSG = "BCEMsg";
export const DARK_INPUT_CLASS = "bce-dark-input";
export const DEFAULT_WARDROBE_SIZE = 24;
export const EXPANDED_WARDROBE_SIZE = 96;
export const HIDDEN = "Hidden";
export const MESSAGE_TYPES = Object.freeze({
  Activity: "Activity",
  ArousalSync: "ArousalSync",
  Hello: "Hello",
});
export const WHISPER_CLASS = "bce-whisper-input";

// ICONS
export const ICONS = Object.freeze({
  LOGO: "data:image/png;base64,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",
  WHISPER:
    "data:image/png;base64,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",
});