const { ref, computed } = require("vue");

let a = ref(1);
let b = ref(2);

let c = computed(() => a.value + b.value);

console.log(c.value);

a.value = 2;

console.log(c.value);
