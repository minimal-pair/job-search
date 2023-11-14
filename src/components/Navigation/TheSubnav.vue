<template>
  <div class="w-full h-16 border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex items-center h-full px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";

import { useJobsStore, FILTERED_JOBS } from "@/stores/jobs";

export default {
  name: "TheSubnav",
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS]),
    onJobResultsPage() {
      return this.$route.name === "JobResults";
    }
  }
};
</script>
