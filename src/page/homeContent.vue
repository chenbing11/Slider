<template>
  <div>
    <naigate-tool></naigate-tool>
    <!-- 内容区域 -->
    <div class="home__content_comp">
      <div>
          This is first page.
      </div>
      <div>
          This is second page.
      </div>
      <div>
          This is third page.
      </div>
      <div>
          This is fourth page.
      </div>
      <div>
          This is fiveth page.
      </div>
    </div>
  </div>
</template>

<script>
import NaigateTool from './navigateTool'

export default {
  name: 'homeContent',
  components: {
    NaigateTool
  }

}
</script>

<style scoped>
    /* 内容区的样式 */
    .home__content_comp {
        background-color: white;
        width: 100%;
    }
    .home__content_comp div {
        width: 100%;
        height: 600px;
        font-size: 26px;

        background-color: #7ec384;
    }
    .home__content_comp div:nth-child(2n) {
        background-color: #847ec3;
    }

</style>
