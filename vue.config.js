module.exports = {
    devServer: {
        // 配置反向代理
        proxy: {
            '/api': {  // 以/ajax开头的请求
                target: 'http://101.34.45.81:8100/',  // 以/ajax开头的请求，全部代理到https://m.maoyan.com上
                // ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' 
                    }
            },
        }
    }
}