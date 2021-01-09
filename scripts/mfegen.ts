import * as yargs from "yargs";
import * as fs from "fs-extra";
import * as util from "util";
import * as cp from "child_process";
import * as path from "path";

const exec = util.promisify(cp.exec);

async function execInModule(cmd: string, cwd: string) {
  // TODO: Need to pipe the input via a writeable stream
  const execProcess = cp.exec(cmd, { cwd });
  execProcess.stdout?.pipe(process.stdout);
  // console.log(stdout);
  // console.log(stderr);
}

(async () => {
  try {
    // Usage: npm run mfegen module -> will save "module" to const below
    const modulePath = `/${yargs.argv._[0]}`;
    console.log(`Generating micro-frontend at path: ${modulePath}`);
    const cwd = path.resolve(__dirname, `..${modulePath}`);

    fs.emptyDirSync(cwd);

    const devDeps = [
      "@babel/core@7.12.10",
      "@babel/preset-react@7.12.10",
      "@babel/preset-typescript@7.12.7",
      "@types/node@14.14.20",
      "@types/react@17.0.0",
      "@types/react-dom@17.0.0",
      "babel-loader@8.2.2",
      "html-webpack-plugin@4.5.1",
      "ts-node@9.1.1",
      "typescript@4.1.3",
      "webpack@5.11.1",
      "webpack-cli@4.3.1",
      "webpack-dev-server@3.11.1",
      "webpack-merge@5.7.3",
    ];

    // `react-router-dom` and `rxjs` need to be manually installed
    const deps = [
      "react@17.0.1",
      "react-dom@17.0.1",
      "@emotion/react@11.1.4",
      "@emotion/styled@11.0.0",
      "@material-ui/core@4.11.2",
    ];

    cp.spawn(
      `npm init -y && npm i -D ${devDeps.join(" ")} && npm i ${deps.join(" ")}`,
      {
        cwd,
        shell: true,
        stdio: "inherit",
      }
    );

    // cp.spawn(`npm i -D ${devDeps.join(" ")}`, {
    //   cwd,
    //   shell: true,
    //   stdio: "inherit",
    // });
    // await execInModule(`npm i -D ${devDeps.join(" ")}`, cwd);
    //

    // await execInModule(`npm i ${deps.join(" ")}`, cwd);
  } catch (e) {
    console.error(e);
  }
})();
