declare global {
  interface Liveblocks {
    Presence: {};

    Storage: {};

    UserMeta: {
      id: string;
      info: {
        name: string;
        email: string;
      };
    };

    RoomEvent: {};

    RoomInfo: {};

    ActivitiesData: {};
  }
}

export {};
