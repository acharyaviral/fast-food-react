const GEOCODING_API_URL = import.meta.env.VITE_GEOCODING_API_URL;

export async function getAddress({ latitude, longitude }: { latitude: number; longitude: number }) {
  const res = await fetch(
    `${GEOCODING_API_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
