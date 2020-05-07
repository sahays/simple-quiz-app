import { sortBy as _sortBy, find } from "underscore";

export const mean = (scores) => {
  if (scores && scores.length > 0) {
    let runningTotal = 0;
    scores.map((s) => {
      runningTotal = runningTotal + s;
      return null;
    });
    return Math.ceil(runningTotal / scores.length);
  }
  return 0;
};
export const median = (scores) => {
  if (scores && scores.length > 0) {
    const even = scores.length % 2 === 0;
    let result = 0;
    if (even) {
      const left = scores[scores.length / 2];
      const right = scores[scores.length / 2 + 1];
      result = (left + right) / 2;
    } else {
      result = scores[Math.floor(scores.length / 2) + 1];
    }
    return result;
  }
  return 0;
};
export const mode = (scores) => {
  if (scores && scores.length > 0) {
    const grouped = [
      {
        score: 0,
        count: 0,
      },
    ];
    scores.map((s) => {
      const found = find(grouped, (g) => {
        if (g.score === s) {
          g.count++;
        }
        return g.score === s;
      });
      if (!found) {
        grouped.push({
          score: s,
          count: 0,
        });
      }
      return null;
    });
    return _sortBy(grouped, (g) => -g.count)[0];
  }
  return 0;
};
export const min = (scores) => {
  if (scores && scores.length > 0) {
    return scores[scores.length - 1];
  }
  return 0;
};
export const max = (scores) => {
  if (scores && scores.length > 0) {
    return scores[0];
  }
  return 0;
};
