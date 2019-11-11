
const mocker = require("../index.js")

var req = {},
    res = {
        send:()=>{
            console.log("done!")
        }
    }
var result = mocker({
    cmd:"Person",
    whiteList:[
        "Person",
    ],
    disabled:false,
    entry:path=>path.resolve(__dirname,"./pb/test.proto"),
    configureType:{
        "int32":mock=>{
            return mock.Random.integer(-2,-1)
        },
        "string":"oleiwa"
    },
    hook:{
        "StModifyGameOpenRankInfoReq":(source,Mock)=>{
            source.code = 0;
        }
    },
    times:2,
    logger:true,
    exposeVar:{
        req,
        res,
    },
    intercept:({req,res},data)=>{
        res.send(data)
    }
})

console.log(result)