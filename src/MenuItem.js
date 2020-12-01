import videojs from "video.js";

const MenuItem = videojs.getComponent("MenuItem");

export default class extends MenuItem {
  constructor(player, { id, bandwidth }) {
    let label = id;

    if (bandwidth) {
      label = parseFloat((bandwidth / 1000000).toFixed(1)) + " mbps";
    }

    super(player, {
      label,
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
