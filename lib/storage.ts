export type SavedIdea = {
  id: string;
  text: string;
  source: "good" | "better";
  createdAt: string;
};

export type WinKind = "good" | "better" | "mix-and-bump";

export type LittleWin = {
  id: string;
  text: string;
  kind: WinKind;
  completedAt: string;
  reflection?: string;
};

const IDEAS_KEY = "bluenana-saved-ideas";
const WINS_KEY = "bluenana-wins";
const LEGACY_WINS_KEY = "bluenana-little-wins";
const BETTER_PROBLEM_KEY = "bluenana-better-problem";
const BETTER_WHO_KEY = "bluenana-better-who";
const BETTER_SOLUTION_KEY = "bluenana-better-solution";
const BETTER_ATTEMPT_KEY = "bluenana-better-attempt";

const storageListeners = new Set<() => void>();
const sessionListeners = new Set<() => void>();

function bumpSession(): void {
  sessionListeners.forEach((listener) => listener());
}

export function subscribeBetterSession(onStoreChange: () => void): () => void {
  sessionListeners.add(onStoreChange);
  return () => sessionListeners.delete(onStoreChange);
}

let ideasSnapshot: SavedIdea[] = [];
let winsSnapshot: LittleWin[] = [];
let ideasCacheReady = false;
let winsCacheReady = false;

export function subscribeStorage(onStoreChange: () => void): () => void {
  storageListeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (
      event.key === IDEAS_KEY ||
      event.key === WINS_KEY ||
      event.key === LEGACY_WINS_KEY
    ) {
      ideasCacheReady = false;
      winsCacheReady = false;
      onStoreChange();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    storageListeners.delete(onStoreChange);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

export function bumpStorage(): void {
  storageListeners.forEach((listener) => listener());
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function uuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function migrateLegacyWins(): void {
  if (typeof window === "undefined") return;
  const current = localStorage.getItem(WINS_KEY);
  if (current) return;
  const legacy = localStorage.getItem(LEGACY_WINS_KEY);
  if (!legacy) return;
  localStorage.setItem(WINS_KEY, legacy);
}

export function getSavedIdeas(): SavedIdea[] {
  if (typeof window === "undefined") return [];
  if (!ideasCacheReady) {
    ideasSnapshot = safeParse<SavedIdea[]>(
      localStorage.getItem(IDEAS_KEY),
      [],
    );
    ideasCacheReady = true;
  }
  return ideasSnapshot;
}

export function addSavedIdea(text: string, source: "good" | "better"): SavedIdea {
  const idea: SavedIdea = {
    id: uuid(),
    text,
    source,
    createdAt: new Date().toISOString(),
  };
  const next = [idea, ...getSavedIdeas()];
  ideasSnapshot = next;
  ideasCacheReady = true;
  localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
  bumpStorage();
  return idea;
}

export function removeSavedIdea(id: string): void {
  const next = getSavedIdeas().filter((i) => i.id !== id);
  ideasSnapshot = next;
  ideasCacheReady = true;
  localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
  bumpStorage();
}

export function getLittleWins(): LittleWin[] {
  if (typeof window === "undefined") return [];
  if (!winsCacheReady) {
    migrateLegacyWins();
    winsSnapshot = safeParse<LittleWin[]>(localStorage.getItem(WINS_KEY), []);
    winsCacheReady = true;
  }
  return winsSnapshot;
}

export function addLittleWin(
  text: string,
  kind: WinKind,
  reflection?: string,
): LittleWin {
  const win: LittleWin = {
    id: uuid(),
    text,
    kind,
    completedAt: new Date().toISOString(),
    ...(reflection?.trim() ? { reflection: reflection.trim() } : {}),
  };
  const next = [win, ...getLittleWins()];
  winsSnapshot = next;
  winsCacheReady = true;
  localStorage.setItem(WINS_KEY, JSON.stringify(next));
  bumpStorage();
  return win;
}

export function removeLittleWin(id: string): void {
  const next = getLittleWins().filter((w) => w.id !== id);
  winsSnapshot = next;
  winsCacheReady = true;
  localStorage.setItem(WINS_KEY, JSON.stringify(next));
  bumpStorage();
}

export function clearAllLittleWins(): void {
  winsSnapshot = [];
  winsCacheReady = true;
  if (typeof window !== "undefined") {
    localStorage.setItem(WINS_KEY, JSON.stringify([]));
  }
  bumpStorage();
}

export function setBetterProblem(problem: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_PROBLEM_KEY, problem);
  bumpSession();
}

export function getBetterProblem(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BETTER_PROBLEM_KEY) ?? "";
}

export type WhoAffects = "myself" | "someone" | "community" | "other";

export function setBetterWho(who: WhoAffects): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_WHO_KEY, who);
  bumpSession();
}

export function getBetterWho(): WhoAffects | "" {
  if (typeof window === "undefined") return "";
  const raw = sessionStorage.getItem(BETTER_WHO_KEY);
  if (
    raw === "myself" ||
    raw === "someone" ||
    raw === "community" ||
    raw === "other"
  ) {
    return raw;
  }
  return "";
}

export function setBetterSolution(solutionId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_SOLUTION_KEY, solutionId);
  bumpSession();
}

export function getBetterSolutionId(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BETTER_SOLUTION_KEY) ?? "";
}

export function setBetterAttempt(text: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_ATTEMPT_KEY, text);
  bumpSession();
}

export function getBetterAttempt(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BETTER_ATTEMPT_KEY) ?? "";
}

export function clearBetterFlow(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BETTER_PROBLEM_KEY);
  sessionStorage.removeItem(BETTER_WHO_KEY);
  sessionStorage.removeItem(BETTER_SOLUTION_KEY);
  sessionStorage.removeItem(BETTER_ATTEMPT_KEY);
  bumpSession();
}

export function getBetterFlowAttempt(): string {
  const attempt = getBetterAttempt();
  if (attempt) return attempt;
  return getBetterProblem();
}

export function formatDisplayDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    }).format(new Date(iso));
  } catch {
    return iso.slice(0, 10);
  }
}
