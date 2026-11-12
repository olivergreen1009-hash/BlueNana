export type SavedIdea = {
  id: string;
  text: string;
  source: "good" | "better";
  createdAt: string;
};

export type LittleWin = {
  id: string;
  text: string;
  kind: "good" | "better";
  completedAt: string;
};

const IDEAS_KEY = "bluenana-saved-ideas";
const WINS_KEY = "bluenana-little-wins";
const BETTER_PROBLEM_KEY = "bluenana-better-problem";
const BETTER_SOLUTION_KEY = "bluenana-better-solution";

const storageListeners = new Set<() => void>();

export function subscribeStorage(onStoreChange: () => void): () => void {
  storageListeners.add(onStoreChange);
  return () => storageListeners.delete(onStoreChange);
}

export function bumpStorage(): void {
  storageListeners.forEach((l) => l());
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

export function getSavedIdeas(): SavedIdea[] {
  if (typeof window === "undefined") return [];
  return safeParse<SavedIdea[]>(localStorage.getItem(IDEAS_KEY), []);
}

export function addSavedIdea(text: string, source: "good" | "better"): SavedIdea {
  const idea: SavedIdea = {
    id: uuid(),
    text,
    source,
    createdAt: new Date().toISOString(),
  };
  const next = [idea, ...getSavedIdeas()];
  localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
  bumpStorage();
  return idea;
}

export function removeSavedIdea(id: string): void {
  const next = getSavedIdeas().filter((i) => i.id !== id);
  localStorage.setItem(IDEAS_KEY, JSON.stringify(next));
  bumpStorage();
}

export function getLittleWins(): LittleWin[] {
  if (typeof window === "undefined") return [];
  return safeParse<LittleWin[]>(localStorage.getItem(WINS_KEY), []);
}

export function addLittleWin(
  text: string,
  kind: "good" | "better",
): LittleWin {
  const win: LittleWin = {
    id: uuid(),
    text,
    kind,
    completedAt: new Date().toISOString(),
  };
  const next = [win, ...getLittleWins()];
  localStorage.setItem(WINS_KEY, JSON.stringify(next));
  bumpStorage();
  return win;
}

export function setBetterProblem(problem: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_PROBLEM_KEY, problem);
}

export function getBetterProblem(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BETTER_PROBLEM_KEY) ?? "";
}

export function setBetterSolution(solutionId: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(BETTER_SOLUTION_KEY, solutionId);
}

export function getBetterSolutionId(): string {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(BETTER_SOLUTION_KEY) ?? "";
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
