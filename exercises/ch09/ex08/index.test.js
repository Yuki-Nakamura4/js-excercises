import { AlarmClock } from "./index";

describe("AlarmClockの遷移のテスト", () => {
  let alarmClock;

  beforeEach(() => {
    alarmClock = new AlarmClock();
  });

  test("通常 => アラームセット", () => {
    expect(alarmClock.setAlarm()).toBe("none");
    expect(alarmClock.getState()).toBe("alarmSet");
  });

  test("アラームセット => 通常", () => {
    alarmClock.setState("alarmSet");
    expect(alarmClock.cancelAlarm()).toBe("none");
    expect(alarmClock.getState()).toBe("normal");
  });

  test("アラームセット => アラーム鳴動", () => {
    alarmClock.setState("alarmSet");
    expect(alarmClock.reachedToAlarmTime()).toBe("soundAlarm");
    expect(alarmClock.getState()).toBe("alarmSounding");
  });

  test("アラーム鳴動 => スヌーズ", () => {
    alarmClock.setState("alarmSounding");
    expect(alarmClock.snooze()).toBe("stopAlarm");
    expect(alarmClock.getState()).toBe("snoozing");
  });

  test("スヌーズ => アラーム鳴動", () => {
    alarmClock.setState("snoozing");
    expect(alarmClock.elapseSnoozeTime()).toBe("soundAlarm");
    expect(alarmClock.getState()).toBe("alarmSounding");
  });

  test("アラーム鳴動 => 通常", () => {
    alarmClock.setState("alarmSounding");
    expect(alarmClock.cancelAlarm()).toBe("stopAlarm");
    expect(alarmClock.getState()).toBe("normal");
  });

  test("スヌーズ => 通常", () => {
    alarmClock.setState("snoozing");
    expect(alarmClock.cancelAlarm()).toBe("none");
    expect(alarmClock.getState()).toBe("normal");
  });
});
