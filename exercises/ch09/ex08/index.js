// 目覚まし時計クラス
export class AlarmClock {
  constructor() {
    this.state = "normal";
  }

  // 任意の状態を設定する(テスト用)
  setState(state) {
    this.state = state;
  }

  // 任意の状態を取得する(テスト用)
  getState() {
    return this.state;
  }

  setAlarm() {
    switch (this.state) {
      case "normal":
        this.state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  cancelAlarm() {
    switch (this.state) {
      case "alarmSet":
        this.state = "normal";
        return "none";
      case "alarmSounding":
        this.state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  reachedToAlarmTime() {
    switch (this.state) {
      case "alarmSet":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  snooze() {
    switch (this.state) {
      case "alarmSounding":
        this.state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  elapseSnoozeTime() {
    switch (this.state) {
      case "snoozing":
        this.state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
