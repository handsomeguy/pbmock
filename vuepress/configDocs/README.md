---
sidebar: auto
---
## pbmock

### 以前的痛点
1、联调开发阻塞，前端只能自己手写假数据

2、长短文本、空数据等测试不全面

3、需求周期结束后，其他人接受，发现再无数据，没有测试号？测试号没数据？debug痛苦，还要找后台配置假数据。

### pbmock所做的工作
1、解析pb协议，自动生成mock数据

2、支持pb协议多种字段类型，嵌套message、enum等，基本覆盖所有语法。（暂不支持extend）

3、丰富的配置项，允许用户对响应数据做额外配置


### Getting started
```
tnpm install @tencent/pbmock --save-dev
```

### Usage
quick start:
```

const mocker = require("pbmock")
var data = mocker({
    cmd:"GetUserDataReq",
    entry:path=>path.resolve(__dirname,"./pb/admin.proto"),
}) 

// return data 

```

### Options

#### cmd ： string
pb文件中需要查找的命令字，如果你需要动态mock命令字的话，可以这样使用：
```
mocker({
    cmd:`${request.query.path}Rsp`,
    ...
})
```

#### entry ： string | function
指定入口pb文件，允许提供字符串或函数，若为字符串请提供绝对路径。

#### disabled ： boolean
是否禁用mocker

#### whiteList ： Array\<string\>
命令字白名单，默认无配置，则所有传入的命令字都会mock，不做过滤。
若需要配置，请配置需要mock的命令字，以字符串数组的形式传入。
```
mocker({
    whiteList:[
        'getDataRsp',
        'getDataRsp',
        'getDataRsp',
    ],
    ...
})
```

#### times : number
若pb文件中存在返回数组的情况，可通过times设置数组项数，此配置针对全局。

#### logger : boolean
是否输出日志，

#### configureType : Object \< key: dataType , value: any | function \>
针对数据类型进行定制，mocker内默认对int、float、string等类型有相应的mock数据配置，但是这不一定满足你的需求，例如你想返回的int数据是介于0-1000的，你期待的string长度不超过50等，可以单独配置。
若value配置为函数形式，默认注入Mock对象，用于辅助用户生成随机数据，更多用法可翻阅mockjs文档。
```
mocker({
    configureType:{
        "int32":mock=>{
            return mock.Random.integer(0,100)
        },
        "string":"oleiwa"
    },
    ...
})
```
注：dataType为pb文件中所定义的普通类型值，包括："bool","double","float","int32",
"uint32","int64","uint64","sint32","sint64","fixed32",
"fixed64","sfixed32","sfixed64","string","bytes"。

#### hook ：Object \< key: cmd , value : function \>
如果configureType仍然不能满足你的需求，mocker还暴露了hook配置，用于对每个单独的命令字做单独配置。
key为对应的命令字，value为相应的钩子函数，函数中将暴露两个参数，第一个参数为mocker生成的data，第二个参数为Mock对象，辅助配置。
例如响应的请求固定code为0，表示成功，你可以配置如下：
```
hook:{
    "StModifyGameOpenRankInfoRsp":(source,Mock)=>{
        source.code = 0;
    }
},
```


#### exposeVar : Object
可传入一个需要暴露给mocker的对象，并结合intercept使用，截断请求。

#### intercept ： function
后置钩子函数，可用于响应请求。配置后，将在mock data完成后调用。传入的第一参数为用户配置的exposeVar参数，第二个参数为mock后的data，可在该函数中响应请求。
```
mocker({
    exposeVar:{
        req,
        res,
    },
    intercept:({req,res},data)=>{
        res.send(data)
    }
    ...
})
```
