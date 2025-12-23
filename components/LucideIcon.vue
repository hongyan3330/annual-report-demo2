<template>
  <span ref="container" class="lucide-icon-container"></span>
</template>

<script>
export default {
  name: 'LucideIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    }
  },
  mounted() {
    this.updateIcon();
  },
  watch: {
    name() {
      this.updateIcon();
    },
    size() {
      this.updateIcon();
    }
  },
  methods: {
    updateIcon() {
      const container = this.$refs.container;
      if (!container || !window.lucide) return;

      // 清空容器
      container.innerHTML = '';

      // 转换 kebab-case (message-circle) -> PascalCase (MessageCircle)
      const iconName = this.name.replace(/(^\w|-\w)/g, m => m.replace('-', '').toUpperCase());
      const iconNode = window.lucide.icons && window.lucide.icons[iconName];
      if (!iconNode || !window.lucide.createElement) return;

      const svg = window.lucide.createElement(iconNode);
      const size = this.size || 24;
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      if (!svg.getAttribute('stroke')) {
        svg.setAttribute('stroke', 'currentColor');
      }

      container.appendChild(svg);
    }
  }
};
</script>

<style scoped>
.lucide-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
