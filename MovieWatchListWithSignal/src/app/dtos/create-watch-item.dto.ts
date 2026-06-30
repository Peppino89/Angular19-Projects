export default interface CreateWatchItemDto {

  title:string,
  genre:string,
  type:'movie'|'series',
  status:'planned'|'watching'|'watched',
  rating:number;

}
