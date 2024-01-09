import Hashmap from "./hashmap.js";
const hashMap = new Hashmap();
for (let i = 0; i < 100; i++) {
  hashMap.set("test" + i * 5, i);
  console.log(hashMap.capacity);
}
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());
console.log(hashMap.length());
