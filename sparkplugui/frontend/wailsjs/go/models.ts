export namespace core {
	
	export class MQTTMessage {
	    topic: string;
	    payload: string;
	    timestamp: number;
	
	    static createFrom(source: any = {}) {
	        return new MQTTMessage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.topic = source["topic"];
	        this.payload = source["payload"];
	        this.timestamp = source["timestamp"];
	    }
	}
	export class MQTTSetup {
	    host: string;
	    port: string;
	    username: string;
	    password: string;
	    topic: string;
	
	    static createFrom(source: any = {}) {
	        return new MQTTSetup(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.host = source["host"];
	        this.port = source["port"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.topic = source["topic"];
	    }
	}

}

