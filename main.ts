import { Application, Router, send } from "@oak/oak";
import * as path from "jsr:@std/path";

type Directory = {
    pasta: string;
    pdfs: string[];
};

async function readDirectories(
    rootDir: string,
    response: Directory[],
    maxDepth = 5,
) {
    for await (const content of Deno.readDir(rootDir)) {
        if (content.isDirectory && maxDepth > 0) {
            const nextDirectory = path.join(rootDir, content.name);
            await readDirectories(nextDirectory, response, maxDepth);
            maxDepth -= 1;
        }

        if (!content.isFile) continue;
        if (!content.name.endsWith(".pdf")) continue;

        const contentDir = rootDir.replaceAll(Deno.cwd(), "");
        const foundSame = response.find((x) => x.pasta === contentDir);
        if (foundSame) {
            foundSame.pdfs.push(content.name);
            continue;
        }

        response.push({ pasta: contentDir, pdfs: [content.name] });
    }
}

const router = new Router();

router.get("/", (context, next) => {
    context.response.redirect("/src/templates/index.html");
    return next();
});

router.get("/api/tree", async (context, next) => {
    const contentDirectory = path.join(Deno.cwd(), "content");
    const response: Directory[] = [];
    await readDirectories(contentDirectory, response);

    context.response.body = response;
    return next();
});

const app = new Application();

app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.startsWith("/src")) {
        const filePath = ctx.request.url.pathname.replace("/src", "");
        await send(ctx, filePath, { root: "./src" });
        return next();
    }

    if (ctx.request.url.pathname.startsWith("/content")) {
        const filePath = ctx.request.url.pathname.replace("/content", "");
        await send(ctx, filePath, { root: "./content" });
        return next();
    }

    return next();
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("PDFs amostradinhos já está de pé");
console.log();
console.log(
    "Clique no link e comece a utilizar http://localhost:4200",
);
console.log(
    "Nâo consegue clicar no link? Selecione todo o link e copie com CTRL + SHIFT + C",
);
console.log(
    "Agora basta colar na barra de pesquisa do seu navegador com CTRL + V e apertar ENTER",
);

console.log();
console.log("Deseja adicionar novas pastas e pdfs?");
console.log(
    `Basta copiar e colar tudo no seguinte caminho: ${
        path.join(Deno.cwd(), "content")
    }`,
);

await app.listen({ hostname: "localhost", port: 4200 });
