export type Level = "Easy" | "Medium" | "Hard";
export type Problem = {
  id: string;
  slug: string;
  title: string;
  level: Level;
  timer: number; // min
  companies: string[];
  article: string;
  youtube: string;
  practice: string;
  tags: string[];
};

export type Day = { day: number; topic: string; problems: Problem[] };

const C = {
  amazon: "Amazon", google: "Google", microsoft: "Microsoft", meta: "Meta", apple: "Apple",
  linkedin: "LinkedIn", swiggy: "Swiggy", walmart: "Walmart", quikr: "Quikr", snapdeal: "Snapdeal",
  synopsys: "Synopsys", adobe: "Adobe", flipkart: "Flipkart", uber: "Uber", paypal: "PayPal",
  oracle: "Oracle", salesforce: "Salesforce", goldman: "Goldman Sachs", morgan: "Morgan Stanley",
};

const mk = (i: number, slug: string, title: string, level: Level, timer: number, companies: string[], tags: string[]): Problem => ({
  id: `p-${i}`,
  slug,
  title,
  level,
  timer,
  companies,
  article: `/dashboard/dsa/${slug}`,
  youtube: `https://youtu.be/${slug}`,
  practice: `https://leetcode.com/problems/${slug}`,
  tags,
});

export const days: Day[] = [
  { day: 1, topic: "Array (Part 1)", problems: [
    mk(101, "majority-element", "Majority Element", "Easy", 30, [C.amazon, C.google], ["array", "hashing"]),
    mk(102, "find-missing-and-repeated-values", "Repeat & Missing Number", "Easy", 30, [C.amazon], ["array", "math"]),
    mk(103, "merge-sorted-array", "Merge 2 Sorted Arrays w/o Extra Space", "Easy", 30, [C.quikr, C.snapdeal, C.synopsys], ["array", "two-pointer"]),
    mk(104, "single-number", "Single Number", "Easy", 30, [C.apple, C.amazon, C.microsoft], ["bitmask"]),
    mk(105, "best-time-to-buy-and-sell-stock", "Stock Buy & Sell", "Easy", 30, [C.walmart, C.swiggy, C.google], ["greedy"]),
    mk(106, "powx-n", "Pow(x, n)", "Medium", 45, [C.linkedin, C.amazon, C.meta], ["recursion", "math"]),
  ]},
  { day: 2, topic: "Array (Part 2)", problems: [
    mk(201, "next-permutation", "Next Permutation", "Medium", 45, [C.flipkart, C.amazon], ["array"]),
    mk(202, "trapping-rain-water", "Trapping Rain Water", "Hard", 60, [C.google, C.meta, C.amazon], ["two-pointer", "dp"]),
    mk(203, "subarray-sum-equals-k", "Subarray Sum = K", "Medium", 45, [C.uber, C.adobe], ["prefix-sum", "hashing"]),
    mk(204, "spiral-matrix", "Spiral Matrix", "Medium", 40, [C.microsoft, C.amazon], ["matrix"]),
    mk(205, "set-matrix-zeroes", "Set Matrix Zeroes", "Medium", 40, [C.meta], ["matrix"]),
    mk(206, "rotate-image", "Rotate Image", "Medium", 35, [C.apple, C.amazon], ["matrix"]),
  ]},
  { day: 3, topic: "Strings", problems: [
    mk(301, "valid-anagram", "Valid Anagram", "Easy", 25, [C.amazon, C.adobe], ["string", "hashing"]),
    mk(302, "longest-substring-without-repeating-characters", "Longest Substring w/o Repeat", "Medium", 45, [C.amazon, C.google, C.meta], ["sliding-window"]),
    mk(303, "group-anagrams", "Group Anagrams", "Medium", 40, [C.uber, C.amazon], ["string", "hashing"]),
    mk(304, "longest-palindromic-substring", "Longest Palindromic Substring", "Medium", 50, [C.amazon, C.microsoft], ["dp", "string"]),
    mk(305, "valid-parentheses", "Valid Parentheses", "Easy", 20, [C.google, C.meta], ["stack"]),
  ]},
  { day: 4, topic: "Binary Search", problems: [
    mk(401, "search-in-rotated-sorted-array", "Search in Rotated Sorted Array", "Medium", 40, [C.amazon, C.linkedin], ["binary-search"]),
    mk(402, "median-of-two-sorted-arrays", "Median of Two Sorted Arrays", "Hard", 60, [C.google, C.adobe, C.goldman], ["binary-search"]),
    mk(403, "find-first-and-last-position-of-element-in-sorted-array", "First & Last Position", "Medium", 35, [C.linkedin], ["binary-search"]),
    mk(404, "koko-eating-bananas", "Koko Eating Bananas", "Medium", 40, [C.google], ["binary-search"]),
  ]},
  { day: 5, topic: "Recursion & Backtracking", problems: [
    mk(501, "subsets", "Subsets", "Medium", 35, [C.amazon, C.meta], ["backtracking"]),
    mk(502, "permutations", "Permutations", "Medium", 35, [C.amazon, C.linkedin], ["backtracking"]),
    mk(503, "n-queens", "N-Queens", "Hard", 60, [C.amazon, C.adobe, C.uber], ["backtracking"]),
    mk(504, "word-search", "Word Search", "Medium", 45, [C.meta, C.amazon], ["backtracking", "grid"]),
    mk(505, "combination-sum", "Combination Sum", "Medium", 40, [C.amazon, C.uber], ["backtracking"]),
  ]},
  { day: 6, topic: "Linked List", problems: [
    mk(601, "reverse-linked-list", "Reverse Linked List", "Easy", 25, [C.amazon, C.apple, C.microsoft], ["linked-list"]),
    mk(602, "linked-list-cycle", "Linked List Cycle", "Easy", 25, [C.amazon, C.meta], ["two-pointer"]),
    mk(603, "merge-two-sorted-lists", "Merge Two Sorted Lists", "Easy", 25, [C.amazon, C.apple, C.linkedin], ["linked-list"]),
    mk(604, "add-two-numbers", "Add Two Numbers", "Medium", 35, [C.amazon, C.meta, C.adobe], ["linked-list"]),
    mk(605, "lru-cache", "LRU Cache", "Medium", 50, [C.amazon, C.meta, C.google, C.microsoft], ["design", "hashing"]),
  ]},
  { day: 7, topic: "Trees", problems: [
    mk(701, "binary-tree-inorder-traversal", "Inorder Traversal", "Easy", 25, [C.microsoft], ["tree", "stack"]),
    mk(702, "maximum-depth-of-binary-tree", "Max Depth of Binary Tree", "Easy", 20, [C.amazon, C.linkedin], ["tree", "dfs"]),
    mk(703, "lowest-common-ancestor-of-a-binary-tree", "LCA of Binary Tree", "Medium", 40, [C.amazon, C.meta, C.linkedin], ["tree"]),
    mk(704, "binary-tree-level-order-traversal", "Level Order Traversal", "Medium", 30, [C.amazon, C.meta], ["tree", "bfs"]),
    mk(705, "serialize-and-deserialize-binary-tree", "Serialize/Deserialize Binary Tree", "Hard", 55, [C.amazon, C.linkedin, C.meta], ["tree", "design"]),
  ]},
  { day: 8, topic: "Graphs", problems: [
    mk(801, "number-of-islands", "Number of Islands", "Medium", 35, [C.amazon, C.meta, C.google], ["graph", "bfs", "dfs"]),
    mk(802, "course-schedule", "Course Schedule", "Medium", 45, [C.amazon, C.meta], ["graph", "topological"]),
    mk(803, "clone-graph", "Clone Graph", "Medium", 40, [C.meta, C.amazon], ["graph", "bfs"]),
    mk(804, "word-ladder", "Word Ladder", "Hard", 55, [C.amazon, C.linkedin, C.meta], ["graph", "bfs"]),
    mk(805, "network-delay-time", "Network Delay Time", "Medium", 45, [C.amazon], ["graph", "dijkstra"]),
  ]},
  { day: 9, topic: "Dynamic Programming", problems: [
    mk(901, "climbing-stairs", "Climbing Stairs", "Easy", 20, [C.amazon, C.adobe], ["dp"]),
    mk(902, "house-robber", "House Robber", "Medium", 30, [C.amazon, C.linkedin], ["dp"]),
    mk(903, "longest-increasing-subsequence", "Longest Increasing Subsequence", "Medium", 45, [C.microsoft, C.amazon], ["dp"]),
    mk(904, "edit-distance", "Edit Distance", "Hard", 55, [C.google, C.amazon, C.adobe], ["dp"]),
    mk(905, "coin-change", "Coin Change", "Medium", 40, [C.amazon, C.uber, C.goldman], ["dp"]),
  ]},
  { day: 10, topic: "Greedy & Misc", problems: [
    mk(1001, "jump-game", "Jump Game", "Medium", 35, [C.amazon, C.meta], ["greedy"]),
    mk(1002, "gas-station", "Gas Station", "Medium", 40, [C.amazon, C.morgan], ["greedy"]),
    mk(1003, "task-scheduler", "Task Scheduler", "Medium", 40, [C.meta, C.amazon], ["greedy", "heap"]),
    mk(1004, "merge-intervals", "Merge Intervals", "Medium", 35, [C.amazon, C.google, C.meta], ["array", "sort"]),
    mk(1005, "kth-largest-element-in-an-array", "Kth Largest Element", "Medium", 35, [C.amazon, C.linkedin, C.meta], ["heap"]),
  ]},
];

export const allCompanies = Array.from(new Set(days.flatMap(d => d.problems.flatMap(p => p.companies)))).sort();
export const totalProblems = days.reduce((s, d) => s + d.problems.length, 0);
export const counts = {
  total: totalProblems,
  easy: days.flatMap(d => d.problems).filter(p => p.level === "Easy").length,
  medium: days.flatMap(d => d.problems).filter(p => p.level === "Medium").length,
  hard: days.flatMap(d => d.problems).filter(p => p.level === "Hard").length,
};

export function findProblem(slug: string): { problem: Problem; day: Day } | null {
  for (const d of days) {
    const p = d.problems.find(x => x.slug === slug);
    if (p) return { problem: p, day: d };
  }
  return null;
}
