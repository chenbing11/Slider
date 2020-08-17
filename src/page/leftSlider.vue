<template>
     <!-- 这是一个移动端的页面 -->
    <div class="leftSlider">
      <div class="mainleftslide" v-for="(item,index) in mydata" :key="item.id+index">
        <Slider :index="1" @deleteItem="deleteItem(item,index)">
          <div>
            {{item.name}}
          </div>
        </Slider>
      </div>
    </div>
</template>

<script>
import Slider from '@/components/leftSliderDelete/index.vue'
export default {
  name: 'leftSlider',
  components: {
    Slider
  },
  data () {
    return {
      mydata: [
        {
          id: 'ertewrre',
          name: '附件昂克赛拉东风路卡',
          value: '1'
        },
        {
          id: 'ertewerte',
          name: '富家大室开发和卡金兰发',
          value: '2'
        }
      ]
    }
  },
  methods: {
    deleteItem (item, index) {
      console.log(item)
      console.log(index)
      // do something
      // eg:  you delete events
    }
  }
}
</script>
<style scoped>

</style>
