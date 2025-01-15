import { envs } from "./config/env";
import { AppRouter } from "./presentation/routes/appRouter";
import { Server } from "./presentation/server";




( ()=>{
    main();
})();


function main(){
    const server = new Server({
        port: Number(envs.PORT),
        publicPath: envs.PUBLIC_PATH,
        router: AppRouter.routes,
     });
    server.start();
}