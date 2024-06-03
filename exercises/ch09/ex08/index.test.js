import { AlarmClock } from "./index";

describe("AlarmClock", () => {
  let clock;

  beforeEach(() => {
    clock = new AlarmClock();
  });

  function testTransition(initialState, event, expectedState, expectedAction) {
    clock.setState(initialState);
    const action = event();
    expect(clock.getState()).toBe(expectedState);
    expect(action).toBe(expectedAction);
  }

  test("initial state is normal", () => {
    expect(clock.getState()).toBe("normal");
  });

  describe("normal state", () => {
    test("setAlarm transitions to alarmSet with no action", () => {
      testTransition("normal", () => clock.setAlarm(), "alarmSet", "none");
    });
  });

  describe("alarmSet state", () => {
    test("cancelAlarm transitions to normal with no action", () => {
      testTransition("alarmSet", () => clock.cancelAlarm(), "normal", "none");
    });

    test("reachedToAlarmTime transitions to alarmSounding with soundAlarm action", () => {
      testTransition(
        "alarmSet",
        () => clock.reachedToAlarmTime(),
        "alarmSounding",
        "soundAlarm"
      );
    });
  });

  describe("alarmSounding state", () => {
    test("cancelAlarm transitions to normal with stopAlarm action", () => {
      testTransition(
        "alarmSounding",
        () => clock.cancelAlarm(),
        "normal",
        "stopAlarm"
      );
    });

    test("snooze transitions to snoozing with stopAlarm action", () => {
      testTransition(
        "alarmSounding",
        () => clock.snooze(),
        "snoozing",
        "stopAlarm"
      );
    });
  });

  describe("snoozing state", () => {
    test("cancelAlarm transitions to normal with no action", () => {
      testTransition("snoozing", () => clock.cancelAlarm(), "normal", "none");
    });

    test("elapseSnoozeTime transitions to alarmSounding with soundAlarm action", () => {
      testTransition(
        "snoozing",
        () => clock.elapseSnoozeTime(),
        "alarmSounding",
        "soundAlarm"
      );
    });
  });
});
