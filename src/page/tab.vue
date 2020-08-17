<template>
  <div class="tab">
    <div class="tab-">
      <div class="top-nav navigate__bar" :class="searchBarFixed == true ? 'isFixed' :''">
        <ly-tab-index
          ref = 'topNav'
          :value="navIndex"
          :items = "topNav.items"
          :options = "topNav.options"
          @select = "scrollTo"
          @change ="change"
          >
        </ly-tab-index>
      </div>
    </div>

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
      <div>
          This is six page.
      </div>
      <div>
          This is seven page.
      </div>
      <div>
          This is eight page.
      </div>
      <div>
          This is nigh page.
      </div>
    </div>
  </div>
</template>

<script>
import LyTabIndex from '@/components/top-nav/index'
export default {
  name: 'tab',
  data () {
    return {
      topNav: {
        selectedId: 0,
        items: [],
        options: {
          activeColor: '#58c3d0',
          fixBottom: false,
          lineWidth: 1
        }
      },
      navIndex: 0,
      searchBarFixed: false
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll, false)
    this.init()
  },
  components: {
    LyTabIndex
  },
  // watch: {
  //   navIndex (val) {
  //     this.topNav.selectedId = val
  //   }
  // },

  methods: {
    init () {
      const data = [
        {
          name: '推荐',
          id: 0
        },
        {
          name: '美妆',
          id: 1
        },
        {
          name: '穿搭',
          id: 2
        },
        {
          name: '亲子',
          id: 3
        },
        {
          name: '成长',
          id: 4
        },
        {
          name: '热门',
          id: 5
        },
        {
          name: '一个',
          id: 6
        },
        {
          name: '好的',
          id: 7
        },
        {
          name: '极品',
          id: 8
        }
      ]
      this.topNav.items = data
      this.$refs.topNav.$refs.bottomLine.calcBarPosX()
    },

    change (val) {
      this.navIndex = val
    },
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
    scrollTo (item, index) {
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
<style scoped>
.top-nav{
  /* position: relative; */
  width:100%;
  height:2.1rem;
  margin:0 auto;
  padding-bottom: 0.1rem;
  color:#000;
  border-bottom: 1px solid #eee;
  padding:0 1rem;
  background: #fff;
}
.top-nav .nav-item{
  float: left;
  width:16%;
  height:100%;
  font-size:0.75px;
}

/* 内容区的样式 */
  .home__content_comp {
      background-color: white;
      width: 100%;
  }
  .home__content_comp div {
      width: 100%;
      height: 1000px;
      font-size: 26px;

      background-color: #7ec384;
  }
  .home__content_comp div:nth-child(2n) {
      background-color: #847ec3;
  }

  .isFixed {
    position: fixed;
    /* width: 100%; */
    top: 0;
    left: 0;
    z-index: 999;
  }
</style>
