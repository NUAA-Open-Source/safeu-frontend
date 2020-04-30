<template>
  <div class="about-container">
    <div class="about">
      <h1 style="align-self: center;">关于 SafeU 云U盘</h1>
      <h2>简介</h2>
      <p>
        这里是 SafeU 云U盘，一款好用、快捷、安全的文件分享服务。<br />
        我们为文件的便捷、安全传输而来。<br />
        虽然还处于起步阶段，但是我们仍然提供了非常安全及高效的文件传输服务，简单来说：我们可以完胜并取代
        90% 的 U 盘应用场景。我们使用国际标准的 TLS
        技术，使您的文件在传输时经过严格加密。在下载时，只有知道文件提取码及其密钥（如果您设置了密钥）的人才能获取此文件。同时，您可以设置文件过期时间以及最大下载次数以保证文件的安全性。更多的是，您的一切活动都是匿名的，完全不必担心隐私问题。<br />
      </p>
      <h2>开发组成员</h2>
      <ul>
        <li><a href="https://github.com/Triple-Z">@TripleZ</a></li>
        <li><a href="https://github.com/arcosx">@arcosx</a></li>
        <li><a href="https://github.com/RayZhao1998">@ninjiacoder</a></li>
        <li><a href="https://github.com/Villivateur">@vvzero</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
};
</script>

<style>
.about-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@media (max-width: 700px) {
  .about {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (min-width: 700px) {
  .about {
    width: 680px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
.about-container ol {
  padding-left: 1em;
}

.about-container ul {
  padding-left: 1em;
}
</style>
