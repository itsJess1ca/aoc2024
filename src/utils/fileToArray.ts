import * as fs from "node:fs";
import path from "node:path";
export function fileToArray(cwd: string, fileName: string): string[] {
  const file = fs.readFileSync(path.join(cwd, fileName), { encoding: 'utf-8'});
  return file.split('\r\n').filter(s => s !== "");
}