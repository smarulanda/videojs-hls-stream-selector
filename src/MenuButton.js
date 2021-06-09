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

    // sort bandwidths from high to low, then map the MenuItems
    const items = representations
      .sort((a, b) => b.bandwidth - a.bandwidth)
      .map(({ id, bandwidth }, index) => {
        const options = { id, bandwidth };

        // for 2 or 3 representations show high/(medium)/low, otherwise show bandwidth
        switch (representations.length) {
          case 2:
            options.label = index === 0 ? "High" : "Low";
            break;

          case 3:
            options.label =
              index === 0 ? "High" : index === 1 ? "Medium" : "Low";
            break;

          default:
            options.label =
              parseFloat((bandwidth / 1000000).toFixed(1)) + " mbps";
            break;
        }

        return new MenuItem(this.player(), options);
      });

    // add an "auto" option for streams with 2+ bandwidths
    if (items.length > 1) {
      items.push(
        new MenuItem(this.player(), {
          id: "auto",
          label: "auto",
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
