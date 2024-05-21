export function counterGroup() {
  const counters = []; // Array to hold all counters

  return {
    newCounter: function () {
      let n = 0;
      const counterObj = {
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
        getCount: function () {
          return n;
        },
      };
      counters.push(counterObj);
      return counterObj;
    },
    total: function () {
      return counters.reduce((sum, counter) => sum + counter.getCount(), 0);
    },
  };
}
