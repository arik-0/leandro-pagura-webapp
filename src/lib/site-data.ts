import { useEffect, useState } from "react";

export type GalleryItemType = "image" | "video" | "audio";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  title: string;
  description?: string;
  url: string; // Image URL, YouTube URL, or Spotify/audio link
  thumbnail?: string;
  category: string;
  order: number;
}

export interface ShowItem {
  id: string;
  date: string;
  title: string;
  venue: string;
  ticketUrl?: string;
  soldOut?: boolean;
  order: number;
}

const GALLERY_STORAGE_KEY = "lp_site_gallery_v4";
const SHOWS_STORAGE_KEY = "lp_site_shows_v4";
const ADMIN_AUTH_KEY = "lp_admin_session_v1";

// Extract YouTube ID helper
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Initial items categorized by Música, Videos y Fotos (incluyendo temas de EY)
export const INITIAL_GALLERY: GalleryItem[] = [
  // --- MÚSICA ---
  {
    id: "mus-1",
    type: "audio",
    title: "EY — 3,3 (Every Year)",
    description: "Composición original con métricas irregulares y fusión eléctrica contemporánea.",
    url: "https://www.youtube.com/watch?v=hLCUGWqtJjk",
    thumbnail: "https://img.youtube.com/vi/hLCUGWqtJjk/hqdefault.jpg",
    category: "EY",
    order: 1,
  },
  {
    id: "mus-2",
    type: "audio",
    title: "EY (Every Year Cuarteto) — Shuffle",
    description: "Grabación en vivo en Auditorio Kraft (Buenos Aires) junto a Santiago Pagura, Matías Galasso y Ezequiel Ghilardi.",
    url: "https://www.youtube.com/watch?v=gBA12UG1Q7A",
    thumbnail: "https://img.youtube.com/vi/gBA12UG1Q7A/hqdefault.jpg",
    category: "EY",
    order: 2,
  },
  {
    id: "mus-3",
    type: "audio",
    title: "Leandro Pagura — Catálogo en Spotify",
    description: "Discografía oficial, singles solistas, grabaciones y colaboraciones en streaming.",
    url: "https://open.spotify.com/artist/0Mfv0jLx7lR1vpip9uQJcs",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    category: "Spotify",
    order: 3,
  },
  {
    id: "mus-4",
    type: "audio",
    title: "Pupupalec (Versión de Estudio)",
    description: "Exploración de timbres analógicos, groove denso y técnica avanzada de bajo eléctrico.",
    url: "https://www.youtube.com/watch?v=jacoVUQzEDg",
    thumbnail: "https://img.youtube.com/vi/jacoVUQzEDg/hqdefault.jpg",
    category: "Estudio",
    order: 4,
  },

  // --- VIDEOS ---
  {
    id: "yt-1",
    type: "video",
    title: "Leandro Pagura Cuarteto - Jet Lag in Hulum (Live Session)",
    description:
      "Sesión en vivo con el cuarteto presentando repertorio original de jazz fusión y funk grabado en directo.",
    url: "https://www.youtube.com/watch?v=jZKTvZNJuPo",
    thumbnail: "https://img.youtube.com/vi/jZKTvZNJuPo/hqdefault.jpg",
    category: "En vivo",
    order: 5,
  },
  {
    id: "yt-2",
    type: "video",
    title: "EY - 3,3 (Live Session)",
    description: "Santiago Pagura (Guitarra), Leandro Pagura (Bajo), Matías Galasso (Teclados), Ezequiel Ghilardi (Batería).",
    url: "https://www.youtube.com/watch?v=hLCUGWqtJjk",
    thumbnail: "https://img.youtube.com/vi/hLCUGWqtJjk/hqdefault.jpg",
    category: "EY",
    order: 6,
  },
  {
    id: "yt-3",
    type: "video",
    title: "EY (Every Year) - Shuffle (En Vivo)",
    description: "Presentación en Auditorio Kraft con sonido directo de consola.",
    url: "https://www.youtube.com/watch?v=gBA12UG1Q7A",
    thumbnail: "https://img.youtube.com/vi/gBA12UG1Q7A/hqdefault.jpg",
    category: "En vivo",
    order: 7,
  },
  {
    id: "yt-4",
    type: "video",
    title: "Leandro Pagura - Pupupalec (Live)",
    description:
      "Interpretación en directo donde se despliega la dinámica e improvisación característica del ensamble.",
    url: "https://www.youtube.com/watch?v=VGt4YSqmOvs",
    thumbnail: "https://img.youtube.com/vi/VGt4YSqmOvs/hqdefault.jpg",
    category: "En vivo",
    order: 8,
  },

  // --- FOTOS ---
  {
    id: "img-1",
    type: "image",
    title: "Leandro Pagura Cuarteto — Foto Oficial",
    description: "Retrato oficial del ensamble junto a destacados músicos de la escena.",
    url: "/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg",
    category: "Cuarteto",
    order: 9,
  },
  {
    id: "img-2",
    type: "image",
    title: "Retrato de Prensa Oficial",
    description: "Fotografía de prensa para festivales internacionales y prensa especializada.",
    url: "/leandro-prensa.jpg",
    category: "Prensa",
    order: 10,
  },
  {
    id: "img-3",
    type: "image",
    title: "En vivo — Escenario & Bajo",
    description: "Captura de show en directo, potencia rítmica y respuesta dinámica.",
    url: "/f3004a62-a83f-4ae8-b5ce-8ddb57b56c0c-copied-media~2.jpg",
    category: "En vivo",
    order: 11,
  },
  {
    id: "img-4",
    type: "image",
    title: "Retrato de Estudio con Bajo SWAN",
    description: "Sesión fotográfica con el bajo signature Swan Alpha Classic.",
    url: "/2b7b07a6-4f30-4bfe-9bd6-e1f77cde3a62-copied-media~2.jpg",
    category: "Estudio",
    order: 12,
  },
];

export const INITIAL_SHOWS: ShowItem[] = [
  {
    id: "show-rosario-oct31",
    date: "31 OCT",
    title: "Leandro Pagura Cuarteto",
    venue: "Capitán Rosario — Mendoza 930",
    ticketUrl: "https://damemiticket.com/evento/leandro-pagura-cuarteto",
    soldOut: false,
    order: 1,
  },
];

// --- GALLERY CRUD ---
export function getStoredGallery(): GalleryItem[] {
  if (typeof window === "undefined") return INITIAL_GALLERY;
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY));
      return INITIAL_GALLERY;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading gallery from localStorage:", e);
    return INITIAL_GALLERY;
  }
}

export function saveGalleryItem(item: Omit<GalleryItem, "id"> & { id?: string }): GalleryItem {
  const current = getStoredGallery();
  let updated: GalleryItem[];
  let savedItem: GalleryItem;

  // If video, auto set thumbnail if not set
  let thumbnail = item.thumbnail;
  if (item.type === "video" && !thumbnail) {
    const ytId = extractYouTubeId(item.url);
    if (ytId) {
      thumbnail = getYouTubeThumbnail(ytId);
    }
  }

  if (item.id) {
    savedItem = { ...(item as GalleryItem), thumbnail };
    updated = current.map((it) => (it.id === item.id ? savedItem : it));
  } else {
    savedItem = {
      ...item,
      id: "item-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      thumbnail,
      order: current.length + 1,
    };
    updated = [savedItem, ...current];
  }

  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("lp_gallery_updated", { detail: updated }));
  } catch (e) {
    console.error("Error saving gallery item:", e);
  }
  return savedItem;
}

export function deleteGalleryItem(id: string): void {
  const current = getStoredGallery();
  const updated = current.filter((it) => it.id !== id);
  try {
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("lp_gallery_updated", { detail: updated }));
  } catch (e) {
    console.error("Error deleting gallery item:", e);
  }
}

export function resetGalleryToDefault(): GalleryItem[] {
  localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(INITIAL_GALLERY));
  window.dispatchEvent(new CustomEvent("lp_gallery_updated", { detail: INITIAL_GALLERY }));
  return INITIAL_GALLERY;
}

// --- SHOWS CRUD ---
export function getStoredShows(): ShowItem[] {
  if (typeof window === "undefined") return INITIAL_SHOWS;
  try {
    const raw = localStorage.getItem(SHOWS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(INITIAL_SHOWS));
      return INITIAL_SHOWS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading shows from localStorage:", e);
    return INITIAL_SHOWS;
  }
}

export function saveShowItem(show: Omit<ShowItem, "id"> & { id?: string }): ShowItem {
  const current = getStoredShows();
  let updated: ShowItem[];
  let savedShow: ShowItem;

  if (show.id) {
    savedShow = show as ShowItem;
    updated = current.map((s) => (s.id === show.id ? savedShow : s));
  } else {
    savedShow = {
      ...show,
      id: "show-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      order: current.length + 1,
    };
    updated = [...current, savedShow];
  }

  try {
    localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("lp_shows_updated", { detail: updated }));
  } catch (e) {
    console.error("Error saving show item:", e);
  }
  return savedShow;
}

export function deleteShowItem(id: string): void {
  const current = getStoredShows();
  const updated = current.filter((s) => s.id !== id);
  try {
    localStorage.setItem(SHOWS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("lp_shows_updated", { detail: updated }));
  } catch (e) {
    console.error("Error deleting show:", e);
  }
}

// --- REACT HOOKS ---
export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  useEffect(() => {
    setGallery(getStoredGallery());
    const onUpdate = (e: Event) => {
      const custom = e as CustomEvent<GalleryItem[]>;
      setGallery(custom.detail || getStoredGallery());
    };
    window.addEventListener("lp_gallery_updated", onUpdate);
    window.addEventListener("storage", () => setGallery(getStoredGallery()));
    return () => {
      window.removeEventListener("lp_gallery_updated", onUpdate);
    };
  }, []);

  return gallery;
}

export function useShows() {
  const [shows, setShows] = useState<ShowItem[]>(INITIAL_SHOWS);

  useEffect(() => {
    setShows(getStoredShows());
    const onUpdate = (e: Event) => {
      const custom = e as CustomEvent<ShowItem[]>;
      setShows(custom.detail || getStoredShows());
    };
    window.addEventListener("lp_shows_updated", onUpdate);
    window.addEventListener("storage", () => setShows(getStoredShows()));
    return () => {
      window.removeEventListener("lp_shows_updated", onUpdate);
    };
  }, []);

  return shows;
}

// --- ADMIN SESSION MANAGEMENT ---
export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminLogin(state: boolean): void {
  if (typeof window === "undefined") return;
  if (state) {
    localStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
  window.dispatchEvent(new Event("lp_admin_auth_changed"));
}

export function useAdminSession() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(isAdminLoggedIn());
    const onAuthChange = () => setIsAdmin(isAdminLoggedIn());
    window.addEventListener("lp_admin_auth_changed", onAuthChange);
    window.addEventListener("storage", onAuthChange);
    return () => {
      window.removeEventListener("lp_admin_auth_changed", onAuthChange);
    };
  }, []);

  return { isAdmin, setAdminLogin };
}
