<template>
  <Tab
    ref="bottomLine"
    v-model="selectedId"
    v-bind="options"
    @input="handleItemChanged">
    <TabItem
      v-for="(item, index) in items"
      :key="index"
      >
      <span
        v-if="options.fixBottom && item.icon"
        slot="icon">
        <i :class="item.icon"></i>
      </span>
      <span style="font-weight:550">{{ item.name }}</span>
    </TabItem>
  </Tab>
</template>

<script>
import Tab from './tab'
import TabItem from './tab-item'

export default {
  name: 'LyTabIndex',
  components: {
    Tab,
    TabItem
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      // selectedId: this.value
    }
  },
  created () {
    // this.selectedId = this.value
    // alert(this.selectedId)
  },
  computed: {
    labelKey () {
      return this.options.labelKey || 'label'
    },
    selectedId: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
        // this.selectedId = val
      }
    }
  },
  methods: {
    handleItemChanged (index) {
      this.$emit('select', this.items[index], index)
    }
  }
}
</script>

<style>

</style>
