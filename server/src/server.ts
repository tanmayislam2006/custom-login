
import config from "./config";
import app from "./app";

app.listen(config.port,()=>{
    console.log(`Smart Bill Server Ruining http://localhost:${config.port}`);
})
