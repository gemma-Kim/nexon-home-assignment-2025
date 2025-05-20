export enum EventStatus {
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED', // 일시 중단
  INACTIVE = 'INACTIVE',
  END = 'END',
  CANCELED = 'CANCELED', // 운영자가 취소
  DELETED = 'DELETED', // 삭제됨 (소프트 삭제용)
}
