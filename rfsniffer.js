var homeduino = require('homeduino');
module.exports = function(RED) {
    function RFSnifferNode(config) {
        RED.nodes.createNode(this,config);
        this.pin = config.pin;
        var node = this;

        var Board = homeduino.Board;
        var board = new Board('gpio', {});

        board.on("rf", function(event) {
          node.send({ payload: event });
        });

        board.connect().then(function() {
          board.rfControlStartReceiving(parseInt(node.pin)).then(function() {
            node.log('Receive enabled on pin: ' + node.pin);
          }).done();
        }).done();
    }
    RED.nodes.registerType("rfsniffer", RFSnifferNode);
}
