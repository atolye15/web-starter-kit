import c from 'ansi-colors';

export default class Logger {
  constructor(styles = []) {
    this.styles = styles;
  }

  log(message) {
    const logMessage = this.styles.reduce((accumulator, currentValue) => {
      return c[currentValue](accumulator);
    }, message);

    // eslint-disable-next-line no-console
    console.log(logMessage);
  }
}

class ErrorLogger extends Logger {
  constructor() {
    super(['red']);
  }
}

class TraceLogger extends Logger {
  constructor() {
    super(['dim']);
  }
}

class SuccessLogger extends Logger {
  constructor() {
    super(['green']);
  }
}

const errorLoger = new ErrorLogger();
Object.freeze(errorLoger);

const traceLoger = new TraceLogger();
Object.freeze(traceLoger);

const successLogger = new SuccessLogger();
Object.freeze(successLogger);

export { errorLoger, traceLoger, successLogger };
