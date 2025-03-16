export abstract class Task {
  abstract execute(): Promise<void>;
}
