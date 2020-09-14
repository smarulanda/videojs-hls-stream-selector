import videojs from "video.js";
import { version as VERSION } from "../package.json";

import MenuButton from "./MenuButton";

const Plugin = videojs.getPlugin("plugin");

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class HlsStreamSelector extends Plugin {
  /**
   * Create a HlsStreamSelector plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);

    this.options = videojs.mergeOptions(defaults, options);

    this.player.on("loadedmetadata", () => {
      // make sure there is HLS before continuing
      if (this.player.tech({ IWillNotUseThisInPlugins: true }).hls) {
        // add the class to the player
        this.player.addClass("vjs-hls-stream-selector");

        // add the button and menu to the control bar
        this.player.controlBar.addChild(
          new MenuButton(this.player),
          {},
          this.player.controlBar.children().length - 2
        );
      }
    });
  }
}

// Define default values for the plugin's `state` object here.
HlsStreamSelector.defaultState = {};

// Include the version number.
HlsStreamSelector.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin("hlsStreamSelector", HlsStreamSelector);

export default HlsStreamSelector;
