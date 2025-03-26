interface Note {
  id: number;
  createdAt: Date;
  title: string;
  content: string;
}

interface Title {
  id: number;
  title: string;
}

export type { Note, Title };
