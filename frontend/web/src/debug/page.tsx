export default function Debug() {
  return (
    <div>
      API_URL: {process.env.NEXT_PUBLIC_API_URL || "undefined"}
    </div>
  );
}
