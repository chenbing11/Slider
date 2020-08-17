<template>
    <div class="searchBar navigate__bar">
        <ul :class="searchBarFixed == true ? 'isFixed' :''">
            <li :class="{active: navIndex===0}" @click="scrollTo(0)">区域</li>
            <li :class="{active: navIndex===1}" @click="scrollTo(1)">国界</li>
            <li :class="{active: navIndex===2}" @click="scrollTo(2)">宇宙</li>
            <li :class="{active: navIndex===3}" @click="scrollTo(3)">银河</li>
             <li :class="{active: navIndex===4}" @click="scrollTo(4)">中国</li>
        </ul>
    </div>
</template>
<script>

export default {
  name: 'navigateToll',
  data () {
    return {
      navIndex: 0,
      searchBarFixed: false
    }
  },
  components: {

  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll, false)
  },
  methods: {
    /**
      * 页面滚动事件监听
    */
    onScroll () {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.home__content_comp div')
      console.log(navContents.length)
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n + 1
        }
      }
      navIndex = navIndex >= navContents.length ? navIndex - 1 : navIndex
      console.log(navIndex)
      this.navIndex = navIndex

      // 组件吸附顶部
      var offsetTop = document.querySelector('.navigate__bar').offsetTop
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    /**
     * 跳转到指定索引的元素
     * @param index
     */
    scrollTo (index) {
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      // const foundEl = document.querySelector(`.home__content_comp div:nth-child(${index + 1})`);
      // const elClientHeight = foundEl.clientHeight;

      const targetOffsetTop = document.querySelector(`.home__content_comp div:nth-child(${index + 1})`).offsetTop - 40
      // 获取当前 offsetTop
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown () {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      function smoothUp () {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          requestAnimationFrame(smoothUp)
        }
      }
    }
  },
  destroy () {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener('scroll', this.onScroll)
  }

}
</script>

<style  lang="less" scoped>
  .searchBar {
      width: 100%;
      .isFixed {
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 999;
      }
      ul {
          height: 40px;
          line-height: 40px;
          display: flex;
          margin:0;
          padding: 0;

          li {
              font-size: 0.8rem;
              flex: 1;
              display: flex;
              justify-items: center;
              justify-content: center;
              align-items: center;
              align-content: center;
              position: relative;
              background-color: #fff;
              &.active {
                  color: #847ec3;
                  background-color: #e2e2e2;
                  &:after {
                      content: " ";
                      position: absolute;
                      height: 1px;
                      width: 30px;
                      bottom: 6px;
                      left:calc(50% - 15px);
                      border-top: 2px #847ec3 solid;
                  }
              }
          }
      }
  }
</style>
