export class Item {
  constructor(
    public readonly id: number,
    public title: string,
    public isComplete: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(title: string): Item {
    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    return new Item(0, title.trim(), false, new Date());
  }

  toggle(): void {
    this.isComplete = !this.isComplete;
  }

  rename(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error("Title cannot be empty");
    }
    this.title = title.trim();
  }
}

export type ItemRow = {
  id: number;
  title: string;
  is_complete: number;
  created_at: string;
};
