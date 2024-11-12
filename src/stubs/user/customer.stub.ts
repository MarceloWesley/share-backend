type UserStubType = {
  id: string;
  email: string;
  name: string;
  remaining_invites: number;
  invite_code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export const UserStub: UserStubType = {
  id: '669543757fcd695893969290',
  email: 'marcelobiriba@mail.com',
  name: 'Marcelo Wesley Biriba Rodrigues',
  remaining_invites: 5,
  invite_code: 'AFGHC8',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: null,
};

export const UserStubWithDeletedAt: UserStubType = {
  id: '669543757fcd695893969290',
  email: 'marcelobiriba@mail.com',
  name: 'Marcelo Wesley Biriba Rodrigues',
  remaining_invites: 5,
  invite_code: 'AFGHC8',
  createdAt: '2024-07-15T15:27:15.700Z',
  updatedAt: '2024-07-15T15:27:15.700Z',
  deletedAt: '2024-07-15T15:27:15.700Z',
};
