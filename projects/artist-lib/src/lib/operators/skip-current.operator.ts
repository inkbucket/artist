import { Observable } from 'rxjs';

export const skipCurrent = <T>(key: string) => (source: Observable<T[]>) =>
  new Observable<T[]>(subscriber => {
    source.subscribe({
      next(value: any) {
        if (value.emitFrom !== key) {
          subscriber.next(value);
        }
      },
      error(err) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      }
    });
  });
