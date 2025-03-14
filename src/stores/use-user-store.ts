import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserType } from '@/@types/user';

interface UseUserStoreProps {
  user?: UserType;
  setUser: (user: UserType) => void;
  removeUser: () => void;
}

export const useUserStore = create<UseUserStoreProps>()(
  persist(
    (set) => ({
      user: undefined,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: undefined }),
    }),
    { name: 'user' }
  )
);
