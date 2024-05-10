import { DEFAULT_WARDROBE_SIZE, EXPANDED_WARDROBE_SIZE, sendHello, BCE_MAX_AROUSAL, BCE_COLOR_ADJUSTMENTS_CLASS_NAME, 
  loadExtendedWardrobe, removeCustomEffect, enableLeashing, disableLeashing, toySyncState, fbcBeepNotify,
  DISCORD_INVITE_URL, beepChangelog, settingsVersion } from '..';
import { debug, logInfo, logWarn, logError } from './logger';
import { waitFor, isString, parseJSON, isNonNullObject, objEntries } from './util';

/**
 * @type {Record<keyof defaultSettings, string | boolean> & {version: number}}
 */
// @ts-ignore -- this is fully initialized in loadSettings
export let fbcSettings = {};
let postSettingsHasRun = false;

export const defaultSettings = /** @type {const} */ ({
  animationEngine: {
    label: "Animation Engine",
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue && Player.ArousalSettings) {
        // Disable conflicting settings
        Player.ArousalSettings.AffectExpression = false;
      }
      if (!newValue) {
        fbcSettings.expressions = false;
        fbcSettings.activityExpressions = false;
      }
      debug("animationEngine", newValue);
    },
    value: false,
    category: "activities",
    description: "Enables the animation engine. This will replace the game's expression and pose system.",
  },
  expressions: {
    label: "Automatic Arousal Expressions (Replaces Vanilla)",
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        fbcSettings.animationEngine = true;
        defaultSettings.animationEngine.sideEffects(true);
      }
      debug("expressions", newValue);
    },
    value: false,
    category: "activities",
    description: "Automatically express arousal when performing an activity.",
  },
  activityExpressions: {
    label: "Activity Expressions",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        fbcSettings.animationEngine = true;
        defaultSettings.animationEngine.sideEffects(true);
      }
      debug("activityExpressions", newValue);
    },
    category: "activities",
    description: "Automatically express reactions to certain activities.",
  },
  alternateArousal: {
    label: "Alternate Arousal (Replaces Vanilla, requires hybrid/locked arousal meter)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      sendHello();
      Player.BCEArousal = !!newValue;
      Player.BCEArousalProgress = Math.min(BCE_MAX_AROUSAL, Player.ArousalSettings?.Progress ?? 0);
      debug("alternateArousal", newValue);
    },
    category: "activities",
    description: "More intense activities will affect arousal faster.",
  },
  stutters: {
    label: "Alternative speech stutter",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("stutters", newValue);
    },
    category: "activities",
    description: "More stuttering at high arousal, moans between words with vibrators.",
  },
  numericArousalMeter: {
    label: "Show numeric arousal meter",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("numericArousalMeter", newValue);
    },
    category: "activities",
    description: "Shows the numeric value of arousal meters when expanded.",
  },
  allowLayeringOthers: {
    label: "Enable layering menus on other players",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("allowLayeringOthers", newValue);
    },
    category: "appearance",
    description: "Let's you edit the layering on items of other players.",
  },
  copyColor: {
    label: "Enable option to copy color to all item's of the same type",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("copyColor", newValue);
    },
    category: "appearance",
    description: "Enable option to copy color to all item's of the same type.",
  },
  extendedWardrobe: {
    label: "Extended wardrobe slots (96)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("extendedWardrobe", newValue);
      if (newValue) {
        if (Player.Wardrobe) {
          WardrobeSize = EXPANDED_WARDROBE_SIZE;
          loadExtendedWardrobe(Player.Wardrobe);
          // Call compress wardrobe to save existing outfits, if another addon has extended the wardrobe
          CharacterCompressWardrobe(Player.Wardrobe);
        } else {
          logWarn("Player.Wardrobe not found, skipping wardrobe extension");
        }
      } else {
        // Restore original size
        WardrobeSize = DEFAULT_WARDROBE_SIZE;
        WardrobeFixLength();
        CharacterAppearanceWardrobeOffset = 0;
      }
    },
    category: "appearance",
    description: "Increase the amount of wardrobe slots to save more outfits.",
  },
  privateWardrobe: {
    label: "Replace wardrobe list with character previews",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("privateWardrobe", newValue);
    },
    category: "appearance",
    description: "Allows you to preview all saved outfits at a glance, no more having to remember names.",
  },
  automateCacheClear: {
    label: "Clear Drawing Cache Hourly",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("automateCacheClear", newValue);
    },
    category: "performance",
    description:
      "Automatically clears the drawing cache every hour, preventing memory usage from growing out of control during long play sessions.",
  },
  manualCacheClear: {
    label: "Adds a clear / reload drawing cache button",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("manualCacheClear", newValue);
    },
    category: "performance",
    description:
      "Adds a button to the chat room menu to clear and reload the drawing cache of all characters, helping to fix buged / non-loaded assets.",
  },
  instantMessenger: {
    label: "Instant messenger",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("instantMessenger", newValue);
    },
    category: "chat",
    description:
      "Allows you to send messages to other players without having to open the friends list, with enhancements.",
  },
  augmentChat: {
    label: "Chat Links and Embeds",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("augmentChat", newValue);
    },
    category: "chat",
    description: "Adds clickable links and image embeds from trusted domains only (e.g. imgur) to chat messages.",
  },
  ctrlEnterOoc: {
    label: "Use Ctrl+Enter to OOC",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("ctrlEnterOoc", newValue);
    },
    category: "chat",
    description: "Allows you to use Ctrl+Enter to send OOC messages.",
  },
  whisperInput: {
    label: "Use italics for input when whispering",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("whisperInput", newValue);
    },
    category: "chat",
    description: "Changes the input field to italics when you're in whisper mode to make it more obvious.",
  },
  chatColors: {
    label: "Improve colors for readability",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        document.body.classList.add(BCE_COLOR_ADJUSTMENTS_CLASS_NAME);
      } else {
        document.body.classList.remove(BCE_COLOR_ADJUSTMENTS_CLASS_NAME);
      }
      debug("chatColors", newValue);
    },
    category: "chat",
    description:
      "Improves contrast between the colors used for chat messages to comply with web accessibility standards.",
  },
  friendPresenceNotifications: {
    label: "Show friend presence notifications",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("friendPresenceNotifications", newValue);
    },
    category: "chat",
    description: "Enables friend presence tracking and shows a notification when a friend logs in.",
  },
  friendOfflineNotifications: {
    label: "Show friends going offline too",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("friendOfflineNotifications", newValue);
    },
    category: "chat",
    description: "Shows a notification when a friend logs out. (Requires friend presence)",
  },
  friendNotificationsInChat: {
    label: "Show friend presence notifications in chat, when possible",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("friendNotificationsInChat", newValue);
    },
    category: "chat",
    description: "Shows friend presence notifications in chat, when possible. (Requires friend presence)",
  },
  pastProfiles: {
    label: "Save & browse seen profiles (requires refresh)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("pastProfiles", newValue);
    },
    category: "chat",
    description:
      "Saves the profiles for everyone you've seen and allows you to browse them using /profiles in chatrooms.",
  },
  pendingMessages: {
    label: "Show sent messages while waiting for server",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("showSentMessages", newValue);
    },
    category: "chat",
    description:
      "Shows messages you've sent while waiting for the server to respond, confirming you have sent the message and the server is just being slow.",
  },
  whisperButton: {
    label: "Show whisper button on chat messages",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("whisperButton", newValue);
    },
    category: "chat",
    description: "Adds a whisper button to chat messages, allowing you to whisper to the sender more conveniently.",
  },
  richOnlineProfile: {
    label: "Rich online profile",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("richOnlineProfile", newValue);
    },
    category: "chat",
    description: "Changes the online profile to support clickable links and embedded images.",
  },
  gagspeak: {
    label: "Understand All Gagged and when Deafened",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("gagspeak", newValue);
    },
    category: "cheats",
    description:
      "Bypasses gagged effect on others and deafen effect on yourself. You'll still be unable to understand others if they use FBC's gag anti-cheat.",
  },
  lockpick: {
    label: "Reveal Lockpicking Order Based on Skill",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("lockpick", newValue);
    },
    category: "cheats",
    description:
      "Randomly reveals the order of some of the pins with higher lockpicking skill revealing more pins on average. Picking can still be impossible like other forms of struggling.",
  },
  allowLayeringWhileBound: {
    label: "Allow layering menus while bound",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("allowLayeringWhileBound", newValue);
    },
    category: "cheats",
    description: "Allows you to open menus while bound, even if they're disabled in the settings.",
  },
  autoStruggle: {
    label: "Make automatic progress while struggling",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("autoStruggle", newValue);
    },
    category: "cheats",
    description:
      "All three forms of struggling will be completed automatically in a realistic amount of time, if the restraint is possible to struggle out of.",
  },
  allowIMBypassBCX: {
    label: "Allow IMs to bypass BCX beep restrictions",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("allowIMBypassBCX", newValue);
    },
    category: "cheats",
    description: "This setting is temporary until BCX supports a focus mode rule.",
  },
  toySync: {
    label: "Enable buttplug.io (requires refresh)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("toySync", newValue);
    },
    category: "buttplug",
    description:
      "Allows the game to control your real vibrators. For a list of supported vibrators see https://buttplug.io",
  },
  antiAntiGarble: {
    label: "Limited gag anti-cheat: cloth-gag equivalent garbling",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        fbcSettings.antiAntiGarbleStrong = false;
        fbcSettings.antiAntiGarbleExtra = false;
      }
      debug("antiAntiGarble", newValue);
      sendHello();
    },
    category: "immersion",
    description:
      "Slur your speech a little bit while gagged forcing others, even those cheating, to have some trouble understanding you.",
  },
  antiAntiGarbleStrong: {
    label: "Full gag anti-cheat: use equipped gags to determine garbling",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        fbcSettings.antiAntiGarble = false;
        fbcSettings.antiAntiGarbleExtra = false;
      }
      debug("antiAntiGarbleStrong", newValue);
      sendHello();
    },
    category: "immersion",
    description:
      "Use equipped gags' full effect to prevent others from understanding you fully, even those that are cheating.",
  },
  antiAntiGarbleExtra: {
    label: "Extra gag anti-cheat: even more garbling for the most extreme gags",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        fbcSettings.antiAntiGarble = false;
        fbcSettings.antiAntiGarbleStrong = false;
      }
      debug("antiAntiGarbleExtra", newValue);
      sendHello();
    },
    category: "immersion",
    description:
      "Use equipped gags' full effect to prevent others from understanding you fully, even those that are cheating. This option adds another level of gagging for the most extreme predicaments, preventing you from making much sound at all.",
  },
  blindWithoutGlasses: {
    label: "Require glasses to see",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (!newValue) {
        removeCustomEffect("BlurLight");
      }
      debug("blindWithoutGlasses", newValue);
    },
    category: "immersion",
    description: "You will be partially blinded while not wearing glasses.",
  },
  leashAlways: {
    label: "Allow leashing without wearing a leashable item (requires leasher to have FBC too)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("leashAlways", newValue);
      if (newValue) {
        enableLeashing();
      } else {
        disableLeashing();
      }
    },
    category: "immersion",
    description:
      "Allows you to be leashed between rooms even when you are not wearing an item that counts as a leash to allow roleplaying being carried in arms.",
  },
  hideHiddenItemsIcon: {
    label: "Hide the hidden items icon",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("hideHiddenItemsIcon", newValue);
    },
    category: "immersion",
    description:
      "You can choose to hide items (not on extreme difficulty). The game shows an icon on players that have hidden items. This option hides that icon.",
  },
  itemAntiCheat: {
    label: "Enable anti-cheat",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("itemAntiCheat", newValue);
    },
    category: "immersion",
    description:
      "Prevents certain console cheats from impacting your character. Whitelisted actors are exempt from this.",
  },
  antiCheatBlackList: {
    label: "Blacklist detected cheaters automatically",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("antiCheatBlackList", newValue);
    },
    category: "immersion",
    description: "Automatically blacklist detected cheaters. Whitelisted actors are exempt from this.",
  },
  uwall: {
    label: "Enable uwall anti-cheat",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("uwall", newValue);
      if (Player?.OnlineSharedSettings && typeof newValue === "boolean") {
        Player.OnlineSharedSettings.Uwall = newValue;
        ServerAccountUpdate.QueueData({
          OnlineSharedSettings: Player.OnlineSharedSettings,
        });
      } else {
        logWarn("Player.OnlineSharedSettings not found, skipping uwall");
      }
    },
    category: "immersion",
    description: "Prevents certain other addon cheats from impacting your character.",
  },
  relogin: {
    label: "Automatic Relogin on Disconnect",
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("relogin", newValue);
    },
    value: true,
    category: "misc",
    description:
      "Automatically re-enter your password after you disconnect from the game. For convenience or AFK. Requires the password for the current account to have been saved in the login screen. Passwords are saved in your browser's local storage in plain text.",
  },
  showQuickAntiGarble: {
    label: "Show gag cheat and anti-cheat options in chat",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      if (newValue) {
        // ToDo: update for r104
        ChatRoomChatInputRect = ChatRoomChatInputRect[3] == 82 ? [1356, 950, 700, 82] : [1005, 908, 695, 90];
        // ChatRoomChatInputRect = [1005, 908, 695, 90];
      } else {
        // Default from club
        ChatRoomChatInputRect = ChatRoomChatInputRect[3] == 82 ? [1456, 950, 900, 82] : [1005, 908, 895, 90];
        // ChatRoomChatInputRect = [1005, 908, 895, 90];
      }
      debug("showQuickAntiGarble", newValue);
    },
    category: "misc",
    description: "Adds a quick switch for the two options next to the chat input area.",
  },
  ghostNewUsers: {
    label: "Automatically ghost+blocklist unnaturally new users",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("ghostNewUsers", newValue);
    },
    category: "misc",
    description:
      "Automatically ghost+blocklist unnaturally new users. This is useful for preventing malicious bots, but is not recommended to be enabled normally.",
  },
  confirmLeave: {
    label: "Confirm leaving the game",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("confirmLeave", newValue);
    },
    category: "misc",
    description:
      "When you leave the game, you will be prompted to confirm your decision. This is useful for preventing accidentally closing the tab, but will cause you to reconnect.",
  },
  discreetMode: {
    label: "Discreet mode (disable drawing)",
    value: false,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("discreetMode", newValue);
      if (newValue) {
        /** @type {HTMLLinkElement} */
        (document.getElementById("favicon")).href =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oFFAADATTAuQQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAEklEQVQ4y2NgGAWjYBSMAggAAAQQAAGFP6pyAAAAAElFTkSuQmCC";
        document.title = "OnlineChat";
      }
    },
    category: "misc",
    description: "Disables drawing on the screen. This is useful for preventing accidental drawing.",
  },
  customContentDomainCheck: {
    label: "Prompt before loading content from a 3rd party domain",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("customContentDomainCheck", newValue);
    },
    category: "misc",
    description: "Show a confirmation prompt before allowing content from a 3rd party domain to be loaded.",
  },
  shareAddons: {
    label: "Share Addons",
    value: true,
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("shareAddons", newValue);
    },
    category: "misc",
    description:
      "Share a list of your installed addons with other FBC users in the room, visible via /versions chat command.",
  },
  buttplugDevices: {
    label: "Buttplug Devices",
    value: "",
    /**
     * @param {unknown} newValue
     */
    sideEffects: (newValue) => {
      debug("buttplugDevices", newValue);
      // Don't handle empty string
      if (newValue === "") {
        return;
      }
      try {
        if (!isString(newValue)) {
          throw new Error("expected string for buttplugDevices");
        }
        const devices = /** @type {FBCToySetting[]} */ (parseJSON(newValue));
        if (!Array.isArray(devices)) {
          throw new Error("expected array for devices");
        }
        for (const device of devices) {
          toySyncState.deviceSettings.set(device.Name, device);
        }
      } catch (ex) {
        logError(ex);
      }
    },
    category: "hidden",
    description: "",
  },
});

export function settingsLoaded() {
  return postSettingsHasRun;
}

const bceSettingKey = () => `bce.settings.${Player?.AccountName}`;

/**
 * @type {() => Promise<typeof fbcSettings>}
 */
export const bceLoadSettings = async () => {
  await waitFor(() => !!Player?.AccountName);
  const key = bceSettingKey();
  debug("loading settings");
  if (Object.keys(fbcSettings).length === 0) {
    let settings = /** @type {typeof fbcSettings | null} */ (parseJSON(localStorage.getItem(key)));
    const onlineSettings = /** @type {typeof fbcSettings | null} */ (
      parseJSON(
        LZString.decompressFromBase64(
          // eslint-disable-next-line deprecation/deprecation
          Player.ExtensionSettings.FBC || (Player.OnlineSettings?.BCE ?? "")
        ) || null
      )
    );
    if (!onlineSettings) {
      logWarn("No online settings found");
      debug("onlineSettings", Player.OnlineSettings);
      debug("extensionSettings", Player.ExtensionSettings);
    }
    // eslint-disable-next-line deprecation/deprecation
    if (Player.OnlineSettings?.BCE) {
      // eslint-disable-next-line deprecation/deprecation
      Player.ExtensionSettings.FBC = Player.OnlineSettings.BCE;
      ServerPlayerExtensionSettingsSync("FBC");
      logInfo("Migrated online settings to extension settings");
      // eslint-disable-next-line deprecation/deprecation
      delete Player.OnlineSettings.BCE;
    }
    const localVersion = settings?.version || 0;
    if (onlineSettings && onlineSettings.version >= localVersion) {
      logInfo("using online settings");
      settings = onlineSettings;
    }
    if (!isNonNullObject(settings)) {
      debug("no settings", key);
      fbcBeepNotify(
        "Welcome to FBC",
        `Welcome to For Better Club v${window.FBC_VERSION}! As this is your first time using FBC on this account, you may want to check out the settings page for some options to customize your experience. You can find it in the game preferences. Enjoy! In case of problems, you can contact us via Discord at ${DISCORD_INVITE_URL}`
      );
      // @ts-expect-error -- this is fully populated in the loop below
      settings = {};
    }

    if (!isNonNullObject(settings)) {
      throw new Error("failed to initialize settings");
    }

    for (const [setting] of objEntries(defaultSettings)) {
      if (!(setting in settings)) {
        if (setting === "activityExpressions" && "expressions" in settings) {
          settings[setting] = settings.expressions;
          continue;
        }
        settings[setting] = defaultSettings[setting].value;
      }
    }
    if (typeof settings.version === "undefined" || settings.version < settingsVersion) {
      beepChangelog();
    }
    settings.version = settingsVersion;
    fbcSettings = settings;
    return settings;
  }
  return fbcSettings;
};

export const bceSaveSettings = () => {
  debug("saving settings");
  if (toySyncState.deviceSettings.size > 0) {
    fbcSettings.buttplugDevices = JSON.stringify(Array.from(toySyncState.deviceSettings.values()));
  }
  localStorage.setItem(bceSettingKey(), JSON.stringify(fbcSettings));
  Player.ExtensionSettings.FBC = LZString.compressToBase64(JSON.stringify(fbcSettings));
  ServerPlayerExtensionSettingsSync("FBC");
  debug("saved settings", fbcSettings);
};

/**
 * @param {string} key
 * @returns {key is keyof typeof defaultSettings}
 */
export function isDefaultSettingKey(key) {
  return key in defaultSettings;
}

export function postSettings() {
  debug("handling settings side effects");
  for (const [k, v] of objEntries(fbcSettings)) {
    if (k === "version") {
      continue;
    }
    if (!isDefaultSettingKey(k)) {
      logWarn("Deleting unknown setting", k);
      delete fbcSettings[k];
      continue;
    }
    defaultSettings[k].sideEffects(v);
  }
  bceSaveSettings();

  postSettingsHasRun = true;
}

window.fbcSettingValue = (key) => {
  if (isDefaultSettingKey(key)) {
    return fbcSettings[key];
  }
  return false;
};