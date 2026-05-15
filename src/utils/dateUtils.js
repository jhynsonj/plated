/** Map JS getDay() (0 Sun … 6 Sat) to plan day keys */
const JS_TO_KEY = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export function todayPlanDayKey() {
  return JS_TO_KEY[new Date().getDay()];
}
