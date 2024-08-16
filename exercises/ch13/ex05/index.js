export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Promiseチェーンで書き換える
export function g1() {
  return wait(1000)
    .then(() => {
      console.log("A");
      return wait(2000);
    })
    .then(() => {
      console.log("B");
      return wait(3000);
    })
    .then(() => {
      console.log("C");
    });
}

// wait関数はPromiseを返すので、Promiseコンストラクタを使わなくてよい
export function g2() {
  return wait(1000)
    .then(() => console.log("A"))
    .then(() => wait(2000))
    .then(() => console.log("B"))
    .then(() => wait(3000))
    .then(() => console.log("C"));
}

export function g3() {
  function fetchUser() {
    return Promise.resolve({ id: 42, name: "John" });
  }
  function fetchUserFriends() {
    return Promise.resolve([
      { name: "Sam", id: 100 },
      { name: "Bob", id: 1 },
    ]);
  }

  // Promiseチェーンで非同期処理の結果を直接次の処理に渡せる
  return fetchUser().then((user) =>
    fetchUserFriends(user).then((friends) => {
      console.log(`${user.name} has ${friends.length} friends!`);
    })
  );
}

export function g4() {
  function someFunction() {
    return 42;
  }

  // Promise.resolveで関数をPromise化する
  return Promise.resolve(someFunction());
}
