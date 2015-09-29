module.exports = function(RED) {
    function RFSnifferNode(config) {
        RED.nodes.createNode(this,config);
        this.pin = config.pin;
        var node = this;

        this.on('input', function(msg) {
            var RF = require('rfsensor');
            var rfsensor = new RF();

            rfsensor.on('dataAvailable', function(data) {
                node.log('Data received');
                msg.payload = data;
                node.send(msg);
            })

            rfsensor.on('receiveEnabled', function(pin) {
                node.log('Receive enabled on pin: ' + pin);
            })

            rfsensor.receive(node.pin);
        });
    }
    RED.nodes.registerType("rfsniffer", RFSnifferNode);
}
