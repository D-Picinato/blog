import { create } from 'zustand';

interface UseUserProps {
  name: string;
  session?: string;
  setUser: (user: { name: string }) => void;
}

export const useUser = create<UseUserProps>((set) => ({
  name: 'Anônimo',
  session: undefined,
  setUser: (user) => set(user),
  removeUser: () => set({ name: 'Anônimo', session: undefined }),
}));
