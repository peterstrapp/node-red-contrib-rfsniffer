var homeduino = require('homeduino');
module.exports = function(RED) {
    function RFSnifferNode(config) {
        RED.nodes.createNode(this,config);
        this.pin = config.pin;
        var node = this;

        this.on('input', function(msg) {
          var Board = homeduino.Board;
          var board = new Board('gpio', {});

          board.on("rf", function(event) {
            msg.payload = event;
            node.send(msg);
          });

          board.connect().then(function() {
            board.rfControlStartReceiving(parseInt(node.pin)).then(function() {
              node.log('Receive enabled on pin: ' + node.pin);
            }).done();
          }).done();
        });
    }
    RED.nodes.registerType("rfsniffer", RFSnifferNode);
}
