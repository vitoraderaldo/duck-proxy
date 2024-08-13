import { ApiProxy } from "@/server/services/proxy/api-proxy-interface";
import { DuckDuckGoProxy } from "@/server/services/proxy/duck-duck-go-proxy"

class ApiProxyFactory {
  static create(): ApiProxy {
    return new DuckDuckGoProxy();
  }
}

export default ApiProxyFactory.create();
