import axios from 'axios';
import { Loading, Message } from "element-ui";
import router from './src/router/index';

var loading        //定义loading变量

function startLoading() {
    loading=Loading.service({
        lock:true,
        text:"玩命加载中...",
        background:'rgba(0,0,0,0,7)'
    });
}

function endLoading() {
	//使用Element loading-close 方法
	loading.close();
}
//请求拦截
axios.interceptors.request.use(
    config=>{
        startLoading()
        if(localStorage.eleToken) {
            //设置统一的请求header
            config.headers.Authorization=localStorage.eleToken
        }
        return config
    },
    error=>{
        return Promise.reject("test1 : "+error)
    }
)
//响应拦截
axios.interceptors.response.use(
    response=>{
        endLoading()
        return response
    },
    error=>{
        //错误提醒
        endLoading()
        Message.error(error.response.data)

        //获取错误状态码
        const {status}=error.response
        if(status==401) {
            Message.error('登录失效， 请重新登录')
            //清除token
            localStorage.removeItem('eleToken')
            //跳转登录页面
            router.push("/login")
        }

        return Promise.reject("test2 : " + error);
    }
)

export default axios