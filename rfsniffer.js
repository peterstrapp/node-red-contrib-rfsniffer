module.exports = function(RED) {
    function RFSnifferNode(config) {
        RED.nodes.createNode(this,config);
        this.pin = config.pin;
        var node = this;

        this.on('input', function(msg) {
            var rcswitch = require('rcswitch');

            if(rcswitch.enableReceive(node.pin)) {
	        node.log('Receive enabled on pin: ' + node.pin);

	        setInterval(function(){
	            if (rcswitch.available()) {
	                node.log('Data received');
	                msg.payload = rcswitch.getReceivedValue();
                        rcswitch.resetAvailable();
	                node.send(msg);
	            }
	        }, 1000);
	    }
        });
    }
    RED.nodes.registerType("rfsniffer", RFSnifferNode);
}
