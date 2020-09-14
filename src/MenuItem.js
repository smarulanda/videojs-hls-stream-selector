import videojs from "video.js";

const MenuItem = videojs.getComponent("MenuItem");

export default class extends MenuItem {
  constructor(player, { id, bandwidth }) {
    super(player, {
      label: bandwidth ? `${Math.round(bandwidth / 1000)} kbps` : id,
      selectable: true,
      selected: false,
    });

    this.id = id;
    this.bandwidth = bandwidth;
  }

  handleClick() {
    this.player().hlsStreamSelector().setState({ currentItemId: this.id });
  }
}
