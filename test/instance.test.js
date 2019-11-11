const mocker = require("../lib/main.js")

test('test instance', () => {
    
    
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
            "Person":(source,Mock)=>{
                source.code = 0;
            }
        },
        times:2,
        logger:false,
        exposeVar:{
            req,
            res,
        },
        intercept:({req,res},data)=>{
            res.send(data)
        }
    })
    console.log(result)
    expect(result.name).toBe("oleiwa")
    expect(result.cjcj.length).toBe(2)
    expect(typeof result.money11).toBe("number")
    expect(result.gulakey.length).toBe(2)
    expect(result.gulakey[0]).toEqual({ name: 'oleiwa', key: 'oleiwa' })
    expect(result.myMapTest instanceof Object).toBe(true)
    expect(Object.keys(result.myMapTest).length).toBe(1)

});