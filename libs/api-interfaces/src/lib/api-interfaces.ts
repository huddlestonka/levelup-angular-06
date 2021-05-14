export interface BaseEntity {
  id: string | null;
  title?: string | null;
}

export interface Collector extends BaseEntity {
  firstName: string;
  lastName: string;
  favoriteGenre: string;
  timeCollecting: string;
  comic?: Comic[];
}

export interface Comic extends BaseEntity {
  title: string;
  description: string;
  genre: string;
  year?: string;
  collectorId: string;
}
