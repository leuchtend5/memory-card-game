export default function loadingTimeout(setLoading) {
  const timeoutId = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timeoutId);
}
