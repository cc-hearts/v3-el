interface initData {
  title: string;
}
export const useInit = (data: initData) => {
  if (typeof window === 'object') {
    const { title } = data;
    document.title = title || 'cc-heart'
  }
}
