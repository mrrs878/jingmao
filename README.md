# jingmao
a app based Vue.js
一个简易书城app，app/client基于vue.js，server基于express

## 主要技术栈：Vue.js less axios Express Node.js Mongoose

## 结构目录：
D:\Data\myPro\frontEnd\jingmao
├─.gitignore
├─111.md
├─LICENSE
├─README.md
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
├─client
|   ├─.browserslistrc
|   ├─.editorconfig
|   ├─.eslintrc.js
|   ├─.gitignore
|   ├─.prettierrc
|   ├─babel.config.js
|   ├─package-lock.json
|   ├─package.json
|   ├─postcss.config.js
|   ├─README.md
|   ├─vue.config.js
|   ├─src
|   |  ├─App.vue
|   |  ├─main.js
|   |  ├─views
|   |  |   ├─secKill
|   |  |   |    ├─AddSecKill.vue
|   |  |   |    └SecKill.vue
|   |  |   ├─profile
|   |  |   |    └Profile.vue
|   |  |   ├─order
|   |  |   |   └Order.vue
|   |  |   ├─index
|   |  |   |   ├─Home.vue
|   |  |   |   ├─Index.vue
|   |  |   |   └Signup.vue
|   |  |   ├─comment
|   |  |   |    └Comment.vue
|   |  |   ├─book
|   |  |   |  ├─AddBook.vue
|   |  |   |  ├─Book.vue
|   |  |   |  ├─Detail.vue
|   |  |   |  └EditBook.vue
|   |  ├─store
|   |  |   ├─actions.js
|   |  |   ├─mutation-types.js
|   |  |   ├─mutations.js
|   |  |   ├─state.js
|   |  |   └store.js
|   |  ├─route
|   |  |   ├─bookRouter.js
|   |  |   ├─commentRouter.js
|   |  |   ├─indexRouter.js
|   |  |   ├─router.js
|   |  |   ├─secKillRouter.js
|   |  |   └userRouter.js
|   |  ├─models
|   |  |   ├─Book.js
|   |  |   ├─Comment.js
|   |  |   ├─SecKill.js
|   |  |   └User.js
|   |  ├─components
|   |  |     ├─AddEditBook.vue
|   |  |     ├─AddEditSecKill.vue
|   |  |     ├─IconSvg.vue
|   |  |     └Menu.vue
|   |  ├─assets
|   |  |   ├─logo.png
|   |  |   ├─less
|   |  |   |  ├─app.less
|   |  |   |  ├─mixins.less
|   |  |   |  └param.less
|   |  ├─api
|   |  |  ├─ajax.js
|   |  |  └api.js
|   ├─public
|   |   ├─favicon.ico
|   |   └index.html
├─app
|  ├─.browserslistrc
|  ├─.env.development
|  ├─.env.production
|  ├─.eslintrc.js
|  ├─.gitignore
|  ├─babel.config.js
|  ├─package-lock.json
|  ├─package.json
|  ├─postcss.config.js
|  ├─README.md
|  ├─vue.config.js
|  ├─src
|  |  ├─App.vue
|  |  ├─main.js
|  |  ├─views
|  |  |   ├─search
|  |  |   |   ├─Result.vue
|  |  |   |   └Search.vue
|  |  |   ├─profile
|  |  |   |    ├─About.vue
|  |  |   |    ├─Address.vue
|  |  |   |    ├─ChangeBlance.vue
|  |  |   |    ├─ChangeEmail.vue
|  |  |   |    ├─ChangePwd.vue
|  |  |   |    ├─FgtPwd.vue
|  |  |   |    ├─Login.vue
|  |  |   |    ├─Order.vue
|  |  |   |    ├─Profile.vue
|  |  |   |    ├─Project.vue
|  |  |   |    ├─Reg.vue
|  |  |   |    ├─SecurityCenter.vue
|  |  |   |    └UserInfo.vue
|  |  |   ├─home
|  |  |   |  ├─BuyShop.vue
|  |  |   |  ├─Detail.vue
|  |  |   |  ├─DetailComment.vue
|  |  |   |  ├─DetailShop.vue
|  |  |   |  ├─Home.vue
|  |  |   |  └Partition.vue
|  |  |   ├─cart
|  |  |   |  └Cart.vue
|  |  ├─store
|  |  |   ├─action.js
|  |  |   ├─mutation-type.js
|  |  |   ├─mutation.js
|  |  |   ├─state.js
|  |  |   └store.js
|  |  ├─route
|  |  |   ├─cart.js
|  |  |   ├─home.js
|  |  |   ├─profile.js
|  |  |   ├─router.js
|  |  |   └search.js
|  |  ├─models
|  |  |   ├─Book.js
|  |  |   ├─Partition.js
|  |  |   ├─SecKill.js
|  |  |   └User.js
|  |  ├─components
|  |  |     ├─DetailFooter.vue
|  |  |     ├─IconSvg.vue
|  |  |     └ProfileHeader.vue
|  |  ├─common
|  |  |   ├─less
|  |  |   |  ├─app.less
|  |  |   |  ├─mainTheme.less
|  |  |   |  └mixins.less
|  |  ├─assets
|  |  |   ├─img
|  |  |   |  ├─add.png
|  |  |   |  ├─css3.jpg
|  |  |   |  ├─default_avatar.png
|  |  |   |  ├─flutter.jpg
|  |  |   |  ├─go.png
|  |  |   |  ├─html5.jpg
|  |  |   |  ├─javascript.jpg
|  |  |   |  ├─jm_logo.png
|  |  |   |  ├─jquery.jpg
|  |  |   |  ├─mao_title -1.jpg
|  |  |   |  ├─mao_title.jpg
|  |  |   |  ├─node.jpg
|  |  |   |  ├─nosql.jpg
|  |  |   |  ├─react_vue.jpg
|  |  |   |  ├─redis.jpg
|  |  |   |  ├─search.png
|  |  |   |  ├─select.png
|  |  |   |  ├─sql.jpg
|  |  |   |  ├─tslc-bt.jpg
|  |  |   |  └zyt.png
|  |  ├─api
|  |  |  ├─ajax.js
|  |  |  └api.js
|  ├─public
|  |   ├─favicon.ico
|  |   └index.html
|  ├─dist
|  |  ├─favicon.ico
|  |  ├─index.html
|  |  ├─js
|  |  | ├─app.0e11baf6.js
|  |  | ├─app.0e11baf6.js.map
|  |  | ├─chunk-vendors.6b0180b5.js
|  |  | └chunk-vendors.6b0180b5.js.map
|  |  ├─img
|  |  |  ├─add.82f40d06.png
|  |  |  ├─css3.ce63fc1c.jpg
|  |  |  ├─flutter.a5111fce.jpg
|  |  |  ├─go.d076d918.png
|  |  |  ├─html5.fa28eb2e.jpg
|  |  |  ├─javascript.59dafee1.jpg
|  |  |  ├─jquery.c6330564.jpg
|  |  |  ├─mao_title -1.41a00a7b.jpg
|  |  |  ├─mao_title.dc64a2b6.jpg
|  |  |  ├─node.06023a42.jpg
|  |  |  ├─nosql.083fac78.jpg
|  |  |  ├─react_vue.2e71547b.jpg
|  |  |  ├─search.99b190d3.png
|  |  |  └tslc-bt.7d4e79dc.jpg
|  |  ├─css
|  |  |  ├─app.9e8d7674.css
|  |  |  └chunk-vendors.0fd8f120.css
