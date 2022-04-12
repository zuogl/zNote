---
title: 小程序通过公众号进行消息推送

---


微信公众号服务号（服务号），微信公众号订阅号（就是我们平常说的公众号），微信公众号开发者平台，微信小程序这些的账号都是独立的不能共用

 

微信开放平台开发者资质认证审核费用为300元，认证有效期一年，认证服务号一年300元审核费。认证有效期一年，有效期最后两个月可申请年审即可续期


认证之后的订阅号和服务号的区别很大了，比如说网页获取用户信息（识别用户）、模板消息（给用户发通知，模版消息推送次数无限制）、获取地理位置（LBS服务）、微信支付（在线交易），这些订阅号都是不支持的


#### 1. 订阅号和服务号的区别
订阅号主要面向个人用户，不能认证，没有微信支付和高级接口，在用户微信的消息面板中，和其他订阅号挤在一个叫“订阅号消息”的聊天窗口中，也有公司使用订阅号专门用来发表文章（可以一天发一篇群发）；

服务号面向企业主体，可以微信认证（300元），开通微信支付和使用高级接口，在用户微信的消息面板中，独占一个聊天窗口，可以一周发一篇群发，一个月4次；

建议能申请服务号的，尽量申请服务号，省的以后想改时后悔（因为类型不能直接升级或修改）。

官方介绍请[点击](https://developers.weixin.qq.com/community/develop/doc/00004810ee45e8cd323afdf7356009)

 

小程序openid：小程序用户的唯一id

公众号openid：公众号用户的唯一id

unionid：同一用户，对同一个微信开放平台下的不同应用，unionid是相同的

1.将小程序与公众号绑定（绑定后才可获取unionid）

- 登录[微信公众平台](https://mp.weixin.qq.com/)(注意选择对应的服务号)-小程序-管理小程序-添加
- 管理员扫码确认
- 输入需要绑定的小程序appID，查找小程序并发送绑定邀请
- 小程序管理员接收邀请
- 绑定完成



2.接入微信公众平台开发，也就是给服务号配置一下开发者服务器。当有用户关注/取消服务号时，微信服务器会推送关注/取消的事件给我们的服务器。[官方文档](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)

3.获取公众号用户列表，即所有用户的公众号openid


4.通过公众号openid获取用户的unionid

5.推送服务号消息

https://www.jianshu.com/p/47064ea08807

1.获取access_token

https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

 

2.获取模板列表

 

http请求方式：GET

https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=ACCESS_TOKEN

 

 

3.发送模板消息

发送模板消息也比较简单,选择一个模板发送给指定的用户(open_id)

http请求方式: POST

https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN

请求信息都在body中

 

1. 测试