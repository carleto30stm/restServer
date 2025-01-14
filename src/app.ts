import { envs } from "./config/env";
import { Server } from "./presentation/server";




( ()=>{
    main();
})();


function main(){
    const server = new Server({
        port: Number(envs.PORT),
        publicPath: envs.PUBLIC_PATH
     });
    server.start();
}