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

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useJobsStore } from "@/stores/jobs";

const route = useRoute();

const onJobResultsPage = computed(() => route.name === "JobResults");

const jobsStore = useJobsStore();
const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
</script>

<script>
// import { mapState } from "pinia";

// import { useJobsStore, FILTERED_JOBS } from "@/stores/jobs";

// export default {
//   name: "TheSubnav",
//   computed: {
//     ...mapState(useJobsStore, [FILTERED_JOBS]),
//     onJobResultsPage() {
//       return this.$route.name === "JobResults";
//     }
//   }
// };
</script>
