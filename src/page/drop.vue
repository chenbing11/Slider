<template>
   <div class="helloword">
    <div class="text-event">
      <vue-draggable-resizable
        :w="150"
        :h="150"
        :x="50"
        :y="50"
        :min-width="50"
        :min-height="50"
        :parent="true"
        :grid="[10,10]"
        :draggable="false"
        :handles="['mr']"
        axis="x"
        class-name="dragging1"
        @dragging="onDrag"
        @resizing="onResize"
      >
        <p>
          你好！ 我是一个灵活的组件。 你可以拖我四处，你可以调整我的大小。
          <br />
          X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}
        </p>
      </vue-draggable-resizable>
    </div>

    <!-- 相对于class等于什么的标记拖拽 注意指定 parent -->
    <div class="p-event">
      <vue-draggable-resizable 
      parent=".p-event"
      >
        <p>You can drag me around and resize me as you wish.</p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
export default {
  name: 'drop',
  data () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    onResize (x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag (x, y) {
      this.x = x;
      this.y = y;
    }
  },
  components: {
    VueDraggableResizable
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.helloword {
  overflow: hidden;
}
.text-event {
  float: left;
  height: 500px;
  width: 500px;
  border: 1px solid red;
  position: relative;
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
}
.p-event {
  float: left;
  height: 300px;
  width: 300px;
  border: 1px solid blue;
  position: relative;
  margin-left: 20px;
}

.dragging1 {
  border: 1px solid #000;
  color: #000;
}
</style>
