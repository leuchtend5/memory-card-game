export default function loadingTimeout(setLoading) {
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 500);

  return () => clearTimeout(timeoutId);
}
