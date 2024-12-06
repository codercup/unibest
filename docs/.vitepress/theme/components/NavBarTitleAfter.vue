<script setup lang="ts">
import { version } from '../../../../package.json'
</script>

<template>
  <span
    style="
      display: inline-block;
      padding: 0 4px;
      margin-left: 4px;
      font-size: 10px;
      font-weight: 700;
      color: green;
      background-color: azure;
      border-radius: 4px;
    "
  >
    {{ version }}
  </span>
</template>
