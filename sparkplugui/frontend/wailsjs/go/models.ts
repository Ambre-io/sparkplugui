export namespace backend {
	
	export class MQTTClientData {
	    host: string;
	    port: string;
	    username: string;
	    password: string;
	    topic: string;
	
	    static createFrom(source: any = {}) {
	        return new MQTTClientData(source);
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
	export class MQTTPayload {
	    topic: string;
	    message: string;
	    timestamp: number;
	
	    static createFrom(source: any = {}) {
	        return new MQTTPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.topic = source["topic"];
	        this.message = source["message"];
	        this.timestamp = source["timestamp"];
	    }
	}

}

