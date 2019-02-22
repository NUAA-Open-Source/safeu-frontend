<template>
    <div class="terms-container">
        <div class="terms">
            <h1 style="align-self: center">SafeU 云U盘的使用条款</h1>
            <p>欢迎使用 SafeU 云U盘，本项目由南京航空航天大学 A2OS 团队开发并供南航内部乃至全体人类使用，旨在给大家提供更加便捷的文件传输服务，推广云存储、淘汰旧时代的U盘等媒介，并将文件隐私泄露、靠U盘传播的病毒扼杀在摇篮之中。</p>
            <h2>我们提供的服务</h2>
            <p>我们为大家提供免费且便捷的文件上传、暂存、下载服务。要使用我们的任意服务，您必须连接互联网，并在我们的网站内完成操作。</p>
            <ol>
                <li>文件上传服务。您可以通过本产品内的“上传”功能，将您本地的文件上传至本站。单次最多上传 20 个文件，总大小不超过 50M。</li>
                <li>文件暂存服务。根据您的设定，您上传的文件将在本站暂存 4-24 小时。</li>
                <li>文件下载服务。根据您的个人设定，您可以通过自动生成或个人指定的提取码在本站进行下载，或者通过扫码获取链接完成下载。您可以根据自己的需求选择下载次数。如果您设置了文件加密，则必须输入正确的密码才能下载。</li>
                <li>达到以下条件，您上传的文件将被本站彻底删除。
                    <ol>
                        <li>达到您设定的文件暂存时间。</li>
                        <li>达到您设定的最大下载次数。</li>
                    </ol>
                </li>
            </ol>
            <h2>隐私政策</h2>
            <p>详见本站首页的“隐私政策”链接。</p>
            <h2>免责声明</h2>
            <ol>
                <li>我们尽力做到最好，但是不能保证万无一失，如果遇到天灾人祸等不可抗力，您暂存的文件可能在规定时间或下载次数以内，就无法进行下载。故请务必保留您重要文件的备份。</li>
                <li>在内测/公测期间，本产品可能存在或多或少的故障，某些故障可能影响您的使用。遇到问题，请使用本站的反馈功能与我们取得联系。</li>
                <li>一旦达到文件删除条件，您的文件将无法找回。故请务必选择您需要的文件留存时间、文件下载次数，并留意是否达到条件。</li>
                <li>鉴于网络服务的特殊性，用户同意 SafeU 服务有权随时变更、中断或终止部分或全部的网络服务。如变更、中断或终止的网络服务，SafeU 将在24小时前在网站首页公示。</li>
            </ol>
        </div>
    </div >
</template>

<script>
export default {
    name: "terms",
}
</script>

<style>
.terms-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
@media (max-width: 700px) {
    .terms {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (min-width: 700px) {
    .terms {
        width: 680px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}
.terms-container ol {
    padding-left: 1em;
}
</style>
