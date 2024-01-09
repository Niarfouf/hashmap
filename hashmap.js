import LinkedList from "./linkedList.js";

export default class Hashmap {
  constructor() {
    this.buckets = new Array(16).fill().map((e) => new LinkedList());
    this.capacity = 16;
    this.loadFactor = 0.75;
  }
  hashStringToNumber(string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }
    hashCode = hashCode % this.capacity;
    return hashCode;
  }
  set(key, value) {
    const index = this.hashStringToNumber(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.buckets[index];
    bucket.updateAddNode(key, value);
    if (this.checkLoadFactor()) {
      this.createAndFillNewHashmap();
    }
  }
  get(key) {
    const index = this.hashStringToNumber(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.buckets[index];
    let value = bucket.findNode(key);
    return value;
  }
  has(key) {
    const index = this.hashStringToNumber(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.buckets[index];
    if (bucket.findNode(key)) {
      return true;
    } else {
      return false;
    }
  }
  remove(key) {
    const index = this.hashStringToNumber(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    const bucket = this.buckets[index];
    bucket.remove(key);
  }
  length() {
    let size = 0;
    this.buckets.forEach((bucket) => {
      if (!bucket.headNodeEmpty()) {
        size += bucket.size();
      }
    });
    return size;
  }
  clear() {
    this.buckets = new Array(16).fill().map((e) => new LinkedList());
    this.capacity = 16;
  }
  keys() {
    return this.buckets.reduce((keys, bucket) => {
      bucket.toArray().forEach((keyValue) => {
        keys.push(keyValue[0]);
      });
      return keys;
    }, []);
  }
  values() {
    return this.buckets.reduce((values, bucket) => {
      bucket.toArray().forEach((keyValue) => {
        values.push(keyValue[1]);
      });
      return values;
    }, []);
  }
  entries() {
    return this.buckets.reduce((entries, bucket) => {
      bucket.toArray().forEach((keyValue) => {
        entries.push(keyValue);
      });
      return entries;
    }, []);
  }
  createAndFillNewHashmap() {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity).fill().map((e) => new LinkedList());
    oldBuckets.forEach((oldBucket) => {
      let oldKeysValues = oldBucket.toArray();
      oldKeysValues.forEach((keyValue) => this.set(...keyValue));
    });
  }
  checkLoadFactor() {
    const numberOfFilledBuckets = this.buckets.reduce(
      (filledBuckets, bucket) => {
        if (!bucket.headNodeEmpty()) {
          return (filledBuckets += 1);
        }
        return filledBuckets;
      },
      0
    );
    const actualLoadFactor = numberOfFilledBuckets / this.capacity;
    if (actualLoadFactor >= this.loadFactor) {
      return true;
    }
    return false;
  }
}
