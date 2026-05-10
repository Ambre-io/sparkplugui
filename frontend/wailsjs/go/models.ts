export namespace core {
	
	export class ConnectResult {
	    ok: boolean;
	    errorCode: string;
	
	    static createFrom(source: any = {}) {
	        return new ConnectResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.ok = source["ok"];
	        this.errorCode = source["errorCode"];
	    }
	}
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
	    protocol: string;
	    wspath: string;
	    topic: string;
	    username: string;
	    password: string;
	    cacrt: string;
	    clientcrt: string;
	    clientkey: string;
	
	    static createFrom(source: any = {}) {
	        return new MQTTSetup(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.host = source["host"];
	        this.port = source["port"];
	        this.protocol = source["protocol"];
	        this.wspath = source["wspath"];
	        this.topic = source["topic"];
	        this.username = source["username"];
	        this.password = source["password"];
	        this.cacrt = source["cacrt"];
	        this.clientcrt = source["clientcrt"];
	        this.clientkey = source["clientkey"];
	    }
	}

}

