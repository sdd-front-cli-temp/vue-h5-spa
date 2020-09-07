<template>
  <div class="nu-list">
    <slot name="header"></slot>
    <div class="nu-list-content"
         :style="{ height: [`calc(100vh - ${headerTop}px)`, `calc(var(--vh, 1vh) * 100 - ${headerTop}px)`] }"
    >
      <md-scroll-view
        ref="scrollView"
        auto-reflow
        :scrolling-x="false"
        :bouncing="false">
        <slot name="content"></slot>
      </md-scroll-view>
    </div>
  </div>
</template>
<script>
import { on, off } from '@/components/utils/dom';

export default {
  name: 'nuList',
  mounted() {
    this.init();
  },
  data() {
    return {
      hasHeader: false,
      headerTop: 0
    };
  },
  methods: {
    init() {
      on(window, 'scroll', this.handle);
      on(window, 'resize', this.handle);
      this.$nextTick(this.handle);
    },
    handle() {
      const element = this.$el.querySelector('.nu-list-content');
      if (!element) return;
      const rect = element.getBoundingClientRect();
      this.headerTop = Math.floor(rect.top || 0);
    }
  },
  computed: {
    // listContentClass() {
    //   return this.
    // }
  },
  beforeDestroy() {
    off(window, 'scroll', this.handle);
    off(window, 'resize', this.handle);
  }
};
</script>
<style lang="stylus">
  .nu-list
    position: relative;
    .nu-list-content
      position: relative;
</style>
