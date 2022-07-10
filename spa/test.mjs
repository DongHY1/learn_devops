import { resolve } from "path";
import readdirp from "readdirp";
const file = resolve("./dist", 'index.html');
console.log(file)
console.log(readdirp)
for (const entry of readdirp("./dist", { depth: 0, type: "files" })) {
    console.log(1)
}