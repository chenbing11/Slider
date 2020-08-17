<template>
  <div>
    <ul class="box" ref="box">
      <li class="left" ref="left">西瓜</li>
      <li class="resize" ref="resize"></li>
      <li class="mid" ref="mid">备注2</li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted () {
    this.dragControllerDiv()
  },
  methods: {
    dragControllerDiv: function () {
      var resize = document.getElementsByClassName('resize')
      var left = document.getElementsByClassName('left')
      var mid = document.getElementsByClassName('mid')
      var box = document.getElementsByClassName('box')
      // for (let i = 0; i < resize.length; i++) {
      resize[0].onmousedown = function (e) {
        var startX = e.clientX
        resize[0].left = resize[0].offsetLeft
        document.onmousemove = function (e) {
          var endX = e.clientX
          var moveLen = resize[0].left + (endX - startX)
          var maxT = box[0].clientWidth - resize[0].offsetWidth
          if (moveLen < 150) moveLen = 150
          if (moveLen > maxT - 150) moveLen = maxT - 150
          resize[0].style.left = moveLen
          // for (let j = 0; j < left.length; j++) {
          left[0].style.width = moveLen + 'px'
          mid[0].style.width = (box[0].clientWidth - moveLen - 10) + 'px'
          // }
        }
        document.onmouseup = function (evt) {
          document.onmousemove = null
          document.onmouseup = null
          resize[0].releaseCapture && resize[0].releaseCapture()
        }
        resize[0].setCapture && resize[0].setCapture()
        return false
      }
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul,li{
  list-style: none;
  display: block;
  margin:0;
  padding:0;
}
.box{
  width:100%;
  height:400px;
  overflow:hidden;
}
.left{
  width:calc(50% - 10px);
  height:100%;
  background:skyblue;
  float:left;
}

.resize{
  width: 5px;
  height:100%;
  cursor: w-resize;
  float:left;
}

.resize2{
  width:5px;
  height:100%;
  cursor: w-resize;
  float:left;
}

.mid{
  float:left;
  width:50%;
  height:100%;
  background:#f00;
}
</style>
