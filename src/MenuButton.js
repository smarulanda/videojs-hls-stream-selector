import videojs from "video.js";

import MenuItem from "./MenuItem";

const MenuButton = videojs.getComponent("MenuButton");

export default class extends MenuButton {
  constructor(player) {
    super(player, { title: "Quality" });

    // set the control text
    this.controlText("Quality");

    // add a class to the button
    this.addClass("vjs-hls-stream-selector-button");

    // add the menu button icon
    this.$(".vjs-icon-placeholder").classList.add("vjs-icon-cog");

    // set the current item to "auto"
    this.setCurrentItem("auto");

    // listen for item selection
    this.player()
      .hlsStreamSelector()
      .on("statechanged", ({ changes }) => {
        if (changes && changes.currentItemId) {
          this.setCurrentItem(changes.currentItemId.to);
        }
      });
  }

  createItems() {
    const representations = this.player()
      .tech({ IWillNotUseThisInPlugins: true })
      .vhs.representations();

    // filter out duplicate bandwidths and create menu items for each representation
    const items = representations
      .filter(
        ({ bandwidth }, index) =>
          representations.findIndex((rep) => rep.bandwidth === bandwidth) ===
          index
      )
      .map(
        ({ id, bandwidth }) =>
          new MenuItem(this.player(), {
            id,
            bandwidth,
          })
      )
      .sort((a, b) => b.bandwidth - a.bandwidth);

    // add an "auto" option for streams with 2+ bandwidths
    if (items.length > 1) {
      items.push(
        new MenuItem(this.player(), {
          id: "auto",
        })
      );
    }

    return items;
  }

  setCurrentItem(id) {
    // select the current item by ID
    this.items.forEach((item) => item.selected(item.id === id));

    // enable/disable the appropriate representations
    this.player()
      .tech({ IWillNotUseThisInPlugins: true })
      .vhs.representations()
      .forEach((rep) => rep.enabled(id === "auto" || rep.id === id));
  }
}
