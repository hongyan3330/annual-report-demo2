<template>
  <div id="music" class="music">
    <button class="music-btn" :class="{ 'is-playing': isPlay }" @click="handleClick">
      <LucideIcon name="music" :size="16" class="text-[#FF7E5F]" />
    </button>
    <audio ref="audioEl" id="audio" loop="loop" preload="auto" src="../assets/audio/kanze.mp3"></audio>
  </div>
</template>

<script>
import LucideIcon from './LucideIcon.vue';

export default {
  name: 'Music',
  components: { LucideIcon },
  data() {
    return {
      isPlay: false
    };
  },
  methods: {
    play() {
      if (this.isPlay) return;
      this.isPlay = true;
      this.$refs.audioEl.play();
    },
    pause() {
      this.isPlay = false;
      this.$refs.audioEl.pause();
    },
    handleClick() {
      if (this.isPlay) {
        this.pause();
      } else {
        this.play();
      }
    }
  }
};
</script>

<style scoped>
.music {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 50;
}

.music-btn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.music-btn:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.music-btn.is-playing {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
