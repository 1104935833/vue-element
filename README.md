# vuehr

> 前端

## Build Setup

``` bash
# 第一步安装依赖
npm install

# 本地开发的时候
npm run dev

# 本地开发完打包部署
npm run build:prod
```
## Nginx的配置
## Nginx Config 

```nginx.config
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       8083;
        server_name  localhost;
        location /{
            root   html;
            index index.html  index.htm;
        }
        location ^~ /data/access {
		rewrite ^/data/access/(.*)$ /$1 break;
		add_header	Content-Type	"application/octet-stream;charset=utf-8";
		add_header	Content-Disposition	"attachment;  filename*=utf-8'zh_cn'$arg_n";
		root  /Users/bondgg/Public/file/upOradd/;
	}
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
    server {
        listen       8888;
       #listen       somename:8080;
        server_name  localhost;
	    root	/Users/bondgg/文稿/teach-vue/dist;#vue项目的打包后的dist路径
        location / {
            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
            index  index.html index.htm;
        }
	    对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
        #因此需要rewrite到index.html中，然后交给路由在处理请求资源
        location @router {
            rewrite ^.*$ /index.html last;
        }
    }
    include servers/*;
}
```
# 配置完启动nginx就行了




## 后端部署
mvn clean package #此命令去打包
#打包完默认路径是在项目的target文件夹下有个[项目名].jar的文件
#Linux/mac下
nohup java -jar [jar包] &
#关闭后台运行的jar
ps -ef | grep [jar包] #找到端口号
kill -9 [端口号]
