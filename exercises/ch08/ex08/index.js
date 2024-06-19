export function counterGroup() {
  const counters = [];

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
    average: function () {
      if (counters.length === 0) {
        throw new TypeError("No counters available");
      }
      return this.total() / counters.length;
    },
    variance: function () {
      if (counters.length < 2) {
        throw new TypeError(
          "At least two counters are required to calculate variance"
        );
      }
      const avg = this.average();
      const varianceSum = counters.reduce((sum, counter) => {
        const diff = counter.getCount() - avg;
        return sum + diff * diff;
      }, 0);
      return varianceSum / (counters.length - 1);
    },
  };
}
