<script>
const domain_url = process.env.VUE_APP_CURRENTMODE === 'production'
    ? 'https://api.safeu.a2os.club/'
    : process.env.VUE_APP_CURRENTMODE === 'staging'
    ? 'https://testapi.safeu.a2os.club/'
    : 'http://114.115.169.206:9000/'
const behavior_domain_url = process.env.VUE_APP_CURRENTMODE === 'production'
    ? 'https://api.behavior.a2os.club/'
    : process.env.VUE_APP_CURRENTMODE === 'staging'
    ? 'https://testapi.behavior.a2os.club/'
    : 'http://114.115.169.206:9005'
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
const api_url = domain_url + version
const behavior_api_url = behavior_domain_url + behavior_version
export default {
    domain_url,
    version,
    api_url,
    behavior_domain_url,
    behavior_api_url,
    error_code,
}
</script>
