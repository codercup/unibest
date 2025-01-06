<script setup lang="ts">
import { version } from '../../../../package.json'
</script>

<template>
  <span
    style="
      display: inline-block;
      padding: 0px 8px;
      margin-left: 4px;
      font-size: 10px;
      font-weight: 700;
      color: var(--vp-button-brand-text);
      background-color: var(--vp-button-brand-bg);
      border-radius: 16px;
    "
  >
    {{ version }}
  </span>
</template>
