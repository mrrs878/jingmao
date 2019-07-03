# jingmao
a app based Vue.js
一个简易书城app，app/client基于vue.js，server基于express

## 主要技术栈：Vue.js less axios Express Node.js Mongoose

## 结构目录
├─ app
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ src
│  │  ├─ api
│  │  │  ├─ ajax.js
│  │  │  └─ api.js
│  │  ├─ assets
│  │  │  └─ img
│  │  │     ├─ add.png
│  │  │     ├─ css3.jpg
│  │  │     ├─ flutter.jpg
│  │  │     ├─ go.png
│  │  │     ├─ html5.jpg
│  │  │     ├─ javascript.jpg
│  │  │     ├─ jm_logo.png
│  │  │     ├─ jquery.jpg
│  │  │     ├─ mao_title -1.jpg
│  │  │     ├─ mao_title.jpg
│  │  │     ├─ node.jpg
│  │  │     ├─ nosql.jpg
│  │  │     ├─ react_vue.jpg
│  │  │     ├─ redis.jpg
│  │  │     ├─ search.png
│  │  │     ├─ select.png
│  │  │     ├─ sql.jpg
│  │  │     ├─ tslc-bt.jpg
│  │  │     └─ zyt.png
│  │  ├─ common
│  │  │  └─ less
│  │  │     ├─ app.less
│  │  │     ├─ mainTheme.less
│  │  │     └─ mixins.less
│  │  ├─ components
│  │  │  ├─ DetailFooter.vue
│  │  │  ├─ IconSvg.vue
│  │  │  └─ ProfileHeader.vue
│  │  ├─ models
│  │  │  ├─ Book.js
│  │  │  ├─ Partition.js
│  │  │  ├─ SecKill.js
│  │  │  └─ User.js
│  │  ├─ route
│  │  │  ├─ cart.js
│  │  │  ├─ home.js
│  │  │  ├─ profile.js
│  │  │  ├─ router.js
│  │  │  └─ search.js
│  │  ├─ store
│  │  │  ├─ action.js
│  │  │  ├─ mutation-type.js
│  │  │  ├─ mutation.js
│  │  │  ├─ state.js
│  │  │  └─ store.js
│  │  ├─ views
│  │  │  ├─ cart
│  │  │  │  └─ Cart.vue
│  │  │  ├─ home
│  │  │  │  ├─ BuyShop.vue
│  │  │  │  ├─ Detail.vue
│  │  │  │  ├─ DetailComment.vue
│  │  │  │  ├─ DetailShop.vue
│  │  │  │  ├─ Home.vue
│  │  │  │  └─ Partition.vue
│  │  │  ├─ profile
│  │  │  │  ├─ About.vue
│  │  │  │  ├─ Address.vue
│  │  │  │  ├─ ChangeBlance.vue
│  │  │  │  ├─ ChangeEmail.vue
│  │  │  │  ├─ ChangePwd.vue
│  │  │  │  ├─ FgtPwd.vue
│  │  │  │  ├─ Login.vue
│  │  │  │  ├─ Order.vue
│  │  │  │  ├─ Profile.vue
│  │  │  │  ├─ Project.vue
│  │  │  │  ├─ Reg.vue
│  │  │  │  ├─ SecurityCenter.vue
│  │  │  │  └─ UserInfo.vue
│  │  │  └─ search
│  │  │     ├─ Result.vue
│  │  │     └─ Search.vue
│  │  ├─ App.vue
│  │  └─ main.js
│  ├─ .browserslistrc
│  ├─ .env.development
│  ├─ .env.production
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ README.md
│  ├─ babel.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  └─ vue.config.js



├─ client
│  ├─ public
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ src
│  │  ├─ api
│  │  │  ├─ ajax.js
│  │  │  └─ api.js
│  │  ├─ assets
│  │  │  ├─ less
│  │  │  │  ├─ app.less
│  │  │  │  ├─ mixins.less
│  │  │  │  └─ param.less
│  │  │  └─ logo.png
│  │  ├─ components
│  │  │  ├─ AddEditBook.vue
│  │  │  ├─ AddEditSecKill.vue
│  │  │  ├─ IconSvg.vue
│  │  │  └─ Menu.vue
│  │  ├─ models
│  │  │  ├─ Book.js
│  │  │  ├─ Comment.js
│  │  │  ├─ SecKill.js
│  │  │  └─ User.js
│  │  ├─ route
│  │  │  ├─ bookRouter.js
│  │  │  ├─ commentRouter.js
│  │  │  ├─ indexRouter.js
│  │  │  ├─ router.js
│  │  │  ├─ secKillRouter.js
│  │  │  └─ userRouter.js
│  │  ├─ store
│  │  │  ├─ actions.js
│  │  │  ├─ mutation-types.js
│  │  │  ├─ mutations.js
│  │  │  ├─ state.js
│  │  │  └─ store.js
│  │  ├─ views
│  │  │  ├─ book
│  │  │  │  ├─ AddBook.vue
│  │  │  │  ├─ Book.vue
│  │  │  │  ├─ Detail.vue
│  │  │  │  └─ EditBook.vue
│  │  │  ├─ comment
│  │  │  │  └─ Comment.vue
│  │  │  ├─ index
│  │  │  │  ├─ Home.vue
│  │  │  │  ├─ Index.vue
│  │  │  │  └─ Signup.vue
│  │  │  ├─ order
│  │  │  │  └─ Order.vue
│  │  │  ├─ profile
│  │  │  │  └─ Profile.vue
│  │  │  └─ secKill
│  │  │     ├─ AddSecKill.vue
│  │  │     └─ SecKill.vue
│  │  ├─ App.vue
│  │  └─ main.js
│  ├─ .browserslistrc
│  ├─ .editorconfig
│  ├─ .eslintrc.js
│  ├─ .gitignore
│  ├─ .prettierrc
│  ├─ README.md
│  ├─ babel.config.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  └─ vue.config.js



├─ server
│  ├─ bin
│  │  └─ www
│  ├─ config
│  │  └─ config.js
│  ├─ middleware
│  │  └─ jwt.js
│  ├─ models
│  │  ├─ Book.js
│  │  ├─ Code.js
│  │  ├─ Comment.js
│  │  ├─ Partition.js
│  │  ├─ User.js
│  │  └─ secKillShop.js
│  ├─ public
│  │  └─ stylesheets
│  │     └─ style.css
│  ├─ repo
│  │  ├─ bookRepo.js
│  │  ├─ codeRepo.js
│  │  ├─ commentRepo.js
│  │  ├─ partitionRepo.js
│  │  ├─ secKillRepo.js
│  │  └─ userRepo.js
│  ├─ routes
│  │  ├─ book.js
│  │  ├─ comment.js
│  │  ├─ partition.js
│  │  ├─ secKill.js
│  │  └─ user.js
│  ├─ services
│  │  ├─ bookSer.js
│  │  ├─ commentSer.js
│  │  ├─ partitionSer.js
│  │  ├─ secKillSer.js
│  │  └─ userSer.js
│  ├─ views
│  │  ├─ error.ejs
│  │  └─ index.ejs
│  ├─ .eslintrc.json
│  ├─ .gitignore
│  ├─ api.md
│  ├─ app.js
│  └─ package.json
├─ .gitignore
├─ LICENSE
└─ README.md