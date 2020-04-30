<script>
const api_domain_url = process.env.VUE_APP_CURRENTMODE === 'production'
    ? 'your_production_api_url'
    : process.env.VUE_APP_CURRENTMODE === 'staging'
    ? 'your_staging_api_url'
    : 'your_local_api_url'
const behavior_api_domain_url = process.env.VUE_APP_CURRENTMODE === 'production'
    ? 'your_production_behavior_api_url'
    : process.env.VUE_APP_CURRENTMODE === 'staging'
    ? 'your_staging_api_url'
    : 'your_local_api_url'
const domain_url = process.env.VUE_APP_CURRENTMODE === 'production'
    ? 'your_production_domain_url'
    : process.env.VUE_APP_CURRENTMODE === 'staging'
    ? 'your_staging_domain_url'
    : 'localhost:8080/'
const version = 'v1/'
const behavior_version = 'v1/'
const error_code = {
    10001: '系统错误',
    10002: '服务暂停',
    10003: '参数错误',
    10004: '参数非法',
    10005: '缺少参数',
    10006: '资源不存在',
    10007: 'CSRF 认证失败',
    10008: '服务处于维护模式，无法提供服务',
    20000: '通用应用错误',
    20201: '无法找到 Token',
    20301: '请求头缺少 Token',
    20302: 'Token 已被使用',
    20303: 'Token 已过期',
    20304: 'Token 不合法',
    20305: '无法获取下载链接',
    20306: '提取码无法对应 auth',
    20307: '提取码重复',
    20501: '密码错误'
}
const api_url = api_domain_url + version
const behavior_api_url = behavior_api_domain_url + behavior_version
export default {
    api_domain_url,
    version,
    api_url,
    behavior_api_domain_url,
    behavior_api_url,
    error_code,
    domain_url,
}
</script>
