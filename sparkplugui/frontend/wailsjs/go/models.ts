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
	export class MQTTTLSCertificates {
	    fqncacrt: string;
	    fqnclientcrt: string;
	    fqnclientkey: string;
	
	    static createFrom(source: any = {}) {
	        return new MQTTTLSCertificates(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.fqncacrt = source["fqncacrt"];
	        this.fqnclientcrt = source["fqnclientcrt"];
	        this.fqnclientkey = source["fqnclientkey"];
	    }
	}
	export class MQTTSetup {
	    host: string;
	    port: string;
	    username: string;
	    password: string;
	    topic: string;
	    certificates: MQTTTLSCertificates;
	
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
	        this.certificates = this.convertValues(source["certificates"], MQTTTLSCertificates);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

