<script>
const domain_url = process.env.NODE_ENV === 'production'
    ? 'https://api.safeu.a2os.club/'
    : 'https://testapi.safeu.a2os.club/'
const behavior_domain_url = process.env.NODE_ENV === 'production'
    ? 'https://api.behavior.a2os.club/'
    : 'https://testapi.behavior.a2os.club/'
const version = 'v1/'
const behavior_version = 'v1/'
const api_url = domain_url + version
const behavior_api_url = behavior_domain_url + behavior_version
export default {
    domain_url,
    version,
    api_url,
    behavior_domain_url,
    behavior_api_url,
}
</script>
