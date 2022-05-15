/* eslint-disable no-console -- Used in debugging only. */

const start = (label: string) => {
  const startLabel = `Start - ${label}`;
  const finishLabel = `Finish - ${label}`;

  console.log(startLabel);
  console.time(finishLabel);
};

const finish = (label: string) => {
  const finishLabel = `Finish - ${label}`;

  console.timeEnd(finishLabel);
};

export const consoleTimer = async <T extends () => Promise<unknown>>(
  label: string,
  fn: T,
): Promise<ReturnType<T>> => {
  try {
    start(label);
    return await fn();
  } finally {
    finish(label);
  }
};

export const consoleTimerSync = <T extends () => unknown>(label: string, fn: T): ReturnType<T> => {
  try {
    start(label);
    return fn() as ReturnType<T>;
  } finally {
    finish(label);
  }
};
/* eslint-enable no-console -- Used in debugging only. */
