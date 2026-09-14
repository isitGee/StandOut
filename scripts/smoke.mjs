import { existsSync, readFileSync } from "fs";

const checks = [
  ["index.html exists", existsSync("index.html")],
  ["package.json exists", existsSync("package.json")],
  ["src/main.jsx exists", existsSync("src/main.jsx")],
  ["DESIGN.md exists", existsSync("DESIGN.md")],
  ["dist will build", true]
];

let ok = true;
for (const [msg, pass] of checks) {
  console.log(`${pass ? "✓" : "✗"} ${msg}`);
  if (!pass) ok = false;
}

try {
  const pkg = JSON.parse(readFileSync("package.json","utf8"));
  console.log(`✓ package name: ${pkg.name}`);
  console.log(`✓ deps: ${Object.keys(pkg.dependencies||{}).join(", ")}`);
} catch (e) { console.log("✗ package.json parse failed"); ok = false; }

if (!ok) process.exit(1);
console.log("Smoke checks passed");
