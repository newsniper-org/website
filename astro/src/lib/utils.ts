import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function maybe<T, R>(m: (value: T) => R, raw?: T): R | undefined {
  if(raw) {
    return m(raw)
  } else {
    return undefined
  }
}


export class MatchMapper<T, R> {
  private guards: [(v: T) => boolean, (v: T) => R][];
  private otherwise: (v: T) => R;
  constructor(_otherwise: (v: T) => R) {
    this.guards = []
    this.otherwise = _otherwise
  }
  addGuard(_check: (v: T) => boolean, _map: (v: T) => R) {
    this.guards.push([_check, _map])
    return this
  }
  removeGuard(idx: number) {
    this.guards.splice(idx,1)
    return this
  }
  getGuardsCount() {
    return this.guards.length
  }
  map(input: T): R {
    for(const [_check, _map] of this.guards) {
      if (_check(input)) {
        return _map(input)
      }
    }
    return this.otherwise(input)
  }

}