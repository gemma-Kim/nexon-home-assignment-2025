export interface RewardEventPublisher {
  publishRewardClaimRequested(payload: {
    userId: string;
    eventId: string;
    rewards: { type: string; value: number }[];
  }): Promise<void>;
}
