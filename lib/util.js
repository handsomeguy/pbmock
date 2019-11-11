const Mock = require("mockjs")
let main = require("./main.js")

module.exports = {
    isFunction:function isFunction(func){
        return typeof func === 'function'
    },
    getStackTop:function getStackTop(stack){
        return stack[stack.length - 1]
    },
    isNormalValue:function isNormalValue(type){
        return [
            "bool",
            "double",
            "float",
            "int32",
            "uint32",
            "int64",
            "uint64",
            "sint32",
            "sint64",
            "fixed32",
            "fixed64",
            "sfixed32",
            "sfixed64",
            "string",
            "bytes",
            // 用户自定义类型
            // "enum", 
            // "message",
            ].includes(type)
    },
    deletePropRandom:function deletePropRandom(originObject,props){
        let reserved = Mock.Random.integer(0,props.length - 1)
            if(props && props instanceof Array){
                props.forEach((prop,index) => {
                if(reserved !== index){
                    delete originObject[prop]
                }
            })
        }
    },
    logger:function logger({
       action,
       message
    }){
        // 控制是否输出日志
        if(main.config.logger){
            console.log(`[pbmock][${action}]:${message}`)
        }
    }
}