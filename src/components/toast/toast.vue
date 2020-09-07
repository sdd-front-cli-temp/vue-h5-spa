<template>
  <div class="md-toast-nine" :class="[position]">
    <md-popup
      :value="visible"
      @show="$_onShow"
      @hide="$_onHide"
      :hasMask="hasMask"
      :maskClosable="false"
    >
      <div class="md-toast-content-nine" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="md-toast-content-nine" v-else>
        <div v-if="icon" class="icon-wrap">
          <i :class="['qcb-icon', icon]" v-if="!iconSvg" />
          <md-icon v-else :name="icon" size="lg" :svg="iconSvg"/>
        </div>
        <div class="md-toast-text-nine" v-if="content" v-text="content"></div>
      </div>
    </md-popup>
  </div>
</template>

<script>
export default {
  name: 'md-toast',

  props: {
    icon: {
      type: String,
      default: ''
    },
    iconSvg: {
      type: Boolean,
      default: false
    },
    content: {
      type: [String, Number],
      default: ''
    },
    duration: {
      type: Number,
      default: 0
    },
    position: {
      // top, left, bottom
      type: String,
      default: 'center'
    },
    hasMask: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: false
    };
  },

  beforeDestroy() {
    if (this.$_timer) {
      clearTimeout(this.$_timer);
    }
  },

  methods: {
    $_onShow() {
      this.$emit('show');
    },
    $_onHide() {
      this.$emit('hide');
    },
    fire() {
      if (this.$_timer) {
        clearTimeout(this.$_timer);
      }
      if (this.visible && this.duration) {
        this.$_timer = setTimeout(() => {
          this.hide();
        }, this.duration);
      }
    },
    show() {
      this.visible = true;
      this.fire();
    },
    hide() {
      this.visible = false;
    }
  }
};

</script>

<style lang="stylus">
.md-toast-nine
  .md-popup
    z-index 1700
  .md-icon
    flex-shrink 0
    color #fff;
  .md-icon + .md-toast-text
    margin-left 0px
  .md-popup
    .md-popup-box
      width 540px
      display flex
      justify-content center
    .md-popup-mask
      background transparent
  &.bottom
    .md-popup .md-popup-box
      position absolute
      bottom 50px
      left 50%
      transform translateX(-50%)
  &.top
    .md-popup .md-popup-box
      position absolute
      top 50px
      left 50%
      transform translateX(-50%)

  .md-toast-content-nine
    display inline-flex
    flex-direction column;
    align-items center
    max-width 100%
    padding 12px 17px
    border-radius 6px
    font-size 14px
    text-align left
    color #fff
    background-color rgba(00, 00, 00, .6)
    box-sizing border-box
    overflow hidden
    .md-icon
      font-size 32px;width 32px;height 32px;
    .icon-wrap
      margin-bottom 10px;
    .qcb-icon
      font-size 32px;

  .md-toast-text-nine
    font-size 14px;
    font-weight 400;
    color #fff;
    text-align center;
    white-space nowrap
    text-overflow: ellipsis
    overflow hidden
</style>
