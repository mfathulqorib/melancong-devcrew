import FuzzySearch from "fuzzy-search";

export function Search(data, query, keyword) {
  const searcher = new FuzzySearch(data, query);
  const result = searcher.search(keyword);
  return result;
}
