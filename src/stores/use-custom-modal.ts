import { create } from 'zustand';

interface UseCustomModalProps {
  content: React.ReactNode;
  createModal: (content: React.ReactNode) => void;
  removeModal: () => void;
}

export const useCustomModal = create<UseCustomModalProps>((set) => ({
  content: undefined,
  createModal: (content) => set({ content }),
  removeModal: () => set({ content: undefined }),
}));
