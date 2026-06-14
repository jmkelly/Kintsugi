export class Piece {
  constructor(
    public readonly id: number,
    public title: string,
    public restored: boolean,
    public readonly createdAt: Date,
  ) {}

  static describe(title: string): Piece {
    if (!title || title.trim().length === 0) {
      throw new Error("A piece must have a name");
    }
    return new Piece(0, title.trim(), false, new Date());
  }

  toggle(): void {
    this.restored = !this.restored;
  }

  rename(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error("A piece must have a name");
    }
    this.title = title.trim();
  }
}

export type PieceRow = {
  id: number;
  title: string;
  restored: number;
  created_at: string;
};
