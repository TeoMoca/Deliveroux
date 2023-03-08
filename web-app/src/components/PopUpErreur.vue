<template>
  <div v-if="isShown" class="error-popup">
    <div class="error-message">{{ errorMessage }}</div>
    <button @click="closePopup" class="close-button">x</button>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isShown: true,
    };
  },
  methods: {
    closePopup() {
      this.isShown = false;
    },
  },
};
</script>

<style>
.error-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-two);
  color: white;
  padding: 1rem;
  border-radius: 5px;
  z-index: 9999;
}

.error-message {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.close-button {
  position: absolute;
  top: 0.25rem;
  right: 0.0005rem;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
