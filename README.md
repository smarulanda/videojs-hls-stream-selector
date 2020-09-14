# videojs-hls-stream-selector

Adds a selector menu to the VideoJS player for HLS sources

## Installation

```sh
npm install --save videojs-hls-stream-selector
```

## Usage

To include videojs-hls-stream-selector on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-hls-stream-selector.min.js"></script>
<script>
  var player = videojs('my-video');

  player.hlsStreamSelector();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-hls-stream-selector via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-hls-stream-selector');

var player = videojs('my-video');

player.hlsStreamSelector();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-hls-stream-selector'], function(videojs) {
  var player = videojs('my-video');

  player.hlsStreamSelector();
});
```

## License

MIT. Copyright (c) Sebastian Marulanda &lt;smarulanda@gmail.com&gt;


[videojs]: http://videojs.com/
