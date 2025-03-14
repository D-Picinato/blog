import { create } from 'zustand';

interface useCustomModalStoreStoreProps {
  content: React.ReactNode;
  createModal: (content: React.ReactNode) => void;
  removeModal: () => void;
}

export const useCustomModalStore = create<useCustomModalStoreStoreProps>((set) => ({
  content: undefined,
  createModal: (content) => set({ content }),
  removeModal: () => set({ content: undefined }),
}));
