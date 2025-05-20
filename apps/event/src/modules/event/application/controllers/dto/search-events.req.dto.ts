export class SearchEventsRequestDto {
  id?: string[];
  status?: string[];
  startAt?: Date;
  endAt?: Date;
  page: number = 0;
  limit: number = 10;
}
