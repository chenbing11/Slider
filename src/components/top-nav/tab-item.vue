<template>
  <a
    class="ly-tab-item"
    :style="$parent.value === id ? activeStyle : {}"
    :class="{'isCurrent':$parent.value === id}"
    @click="onItemClicked">
    <div class="ly-tab-item-icon" v-if="$parent.fixBottom">
      <slot name="icon"></slot>
    </div>
    <div class="ly-tab-item-label">
      <slot></slot>
    </div>
  </a>
</template>

<script>
export default {
  name: 'LyTabItem',
  computed: {
    activeStyle () {
      return {
        color: this.$parent.activeColor
      }
    }
  },
  created () {
    setInterval(() => {
      console.log('parentvalue=' + this.$parent.value)
    }, 1000)
  },
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1
    }
  },
  methods: {
    onItemClicked () {
      this.$parent.$emit('input', this.id)
    }
  }
}
</script>

<style>
.ly-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
}
.isCurrent{
  transition: font-size ease 0.5s;
  transform: scale(1.15);
}
.ly-tab-item-icon {
  margin: 0 auto 5px;
}

</style>
