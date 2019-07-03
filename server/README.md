# 基于express 的后端服务器，符合RESTful风格

## 目录结构
├─server  
|   ├─.eslintrc.json  
|   ├─.gitignore  
|   ├─api.md  
|   ├─app.js  
|   ├─package.json  
|   ├─views  
|   |   ├─error.ejs    
|   |   └index.ejs    
|   ├─services    
|   |    ├─bookSer.js  
|   |    ├─commentSer.js  
|   |    ├─partitionSer.js  
|   |    ├─secKillSer.js  
|   |    └userSer.js  
|   ├─routes  
|   |   ├─book.js  
|   |   ├─comment.js  
|   |   ├─partition.js  
|   |   ├─secKill.js  
|   |   └user.js  
|   ├─repo  
|   |  ├─bookRepo.js  
|   |  ├─codeRepo.js  
|   |  ├─commentRepo.js  
|   |  ├─partitionRepo.js  
|   |  ├─secKillRepo.js  
|   |  └userRepo.js  
|   ├─public  
|   |   ├─stylesheets  
|   |   |      └style.css  
|   |   ├─javascripts  
|   |   ├─images  
|   ├─models  
|   |   ├─Book.js  
|   |   ├─Code.js  
|   |   ├─Comment.js  
|   |   ├─Partition.js  
|   |   ├─secKillShop.js  
|   |   └User.js  
|   ├─middleware  
|   |     └jwt.js  
|   ├─config  
|   |   └config.js  
|   ├─bin  
|   |  └www  
