
/**************************
  getElementById(root, id) and getElementsByClassName(root, className)

  LOGIC, ID version (first match or null)
  1. If root itself has the id, return root.
  2. Loop over root.children (elements only, not text nodes).
  3. Recurse into each child. If a recursive call finds something,
     return it right away. No need to keep searching.
  4. If no child finds it, return null.

  LOGIC, class version (all matches, in document order)
  1. Keep one results array and pass it down through the recursion.
  2. If root.classList contains the class, push root.
  3. Recurse into every child. No early return, because we want all matches.
  4. Return results.

  COMPLEXITY: O(n) time, n = number of nodes. O(h) call stack, h = tree depth.
*****************************/
function getElementById(root, id) {
  if (!root) return null;
  if (root.id === id) return root;

  for (const child of root.children) {
    const found = getElementById(child, id);
    if (found) return found;
  }
  return null;
}

function getElementsByClassName(root, className, results = []) {
  if (!root) return results;
  if (root.classList.contains(className)) results.push(root);

  for (const child of root.children) {
    getElementsByClassName(child, className, results);
  }
  return results;
}
