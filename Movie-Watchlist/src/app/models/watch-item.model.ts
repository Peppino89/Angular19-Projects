export default interface WatchItem {
  id: number;
  title: string;
  genre: string;
  type: 'movie'|'series';
  status: 'planned'|'watching'|'watched';
  rating: number;
  createdAt: Date;
}
