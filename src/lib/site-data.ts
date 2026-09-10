import { useEffect, useState } from "react";

export type GalleryItemType = "image" | "video";

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  title: string;
  description?: string;
  url: string; // Image URL or YouTube URL
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

const GALLERY_STORAGE_KEY = "lp_site_gallery_v2";
const SHOWS_STORAGE_KEY = "lp_site_shows_v2";
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

// Initial items with the requested 4 YouTube videos and high quality photos
export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "yt-1",
    type: "video",
    title: "Leandro Pagura Cuarteto - Jet Lag in Hulum (live session)",
    description:
      "Sesión en vivo con el cuarteto presentando repertorio original de jazz fusión y funk.",
    url: "https://www.youtube.com/watch?v=jZKTvZNJuPo",
    thumbnail: "https://img.youtube.com/vi/jZKTvZNJuPo/hqdefault.jpg",
    category: "En vivo",
    order: 1,
  },
  {
    id: "yt-2",
    type: "video",
    title: "EY - 3,3 (Leandro Pagura)",
    description: "Composición original explorando métricas irregulares y diálogo armónico.",
    url: "https://www.youtube.com/watch?v=hLCUGWqtJjk",
    thumbnail: "https://img.youtube.com/vi/hLCUGWqtJjk/hqdefault.jpg",
    category: "Cuarteto",
    order: 2,
  },
  {
    id: "yt-3",
    type: "video",
    title: "Leandro Pagura - Pupupalec",
    description:
      "Material de estudio que combina groove sólido, texturas modernas y técnicas avanzadas de bajo.",
    url: "https://www.youtube.com/watch?v=jacoVUQzEDg",
    thumbnail: "https://img.youtube.com/vi/jacoVUQzEDg/hqdefault.jpg",
    category: "Estudio",
    order: 3,
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
    order: 4,
  },
  {
    id: "img-1",
    type: "image",
    title: "En vivo — Bajo & Escenario",
    description: "Captura de show en directo, potencia rítmica y conexión con el instrumento.",
    url: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&w=1200&q=80",
    category: "En vivo",
    order: 5,
  },
  {
    id: "img-2",
    type: "image",
    title: "Grabación en Estudio",
    description: "Sesión de estudio registrando tomas de bajo para el próximo álbum.",
    url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    category: "Estudio",
    order: 6,
  },
  {
    id: "img-3",
    type: "image",
    title: "Leandro Pagura Cuarteto",
    description: "Foto oficial del ensamble junto a destacados músicos de la escena.",
    url: "/71f23e85-f3c4-426b-af51-99fbc5ae9ccf-copied-media~2.jpg",
    category: "Cuarteto",
    order: 7,
  },
  {
    id: "img-4",
    type: "image",
    title: "Fotografía de Prensa Oficial",
    description: "Retrato para prensa y festivales internacionales.",
    url: "/leandro-prensa.jpg",
    category: "Prensa",
    order: 8,
  },
];

export const INITIAL_SHOWS: ShowItem[] = [
  {
    id: "show-1",
    date: "28 SEP 2026",
    title: "Leandro Pagura Cuarteto en Vivo",
    venue: "Complejo Cultural Atlas, Rosario",
    ticketUrl: "https://complejoculturalatlas.com.ar",
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
