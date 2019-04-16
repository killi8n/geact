const path = require('path');
const fs = require('fs');

// const copyBuild = async () => {
//     try {
//         const buildPath = path.join(__dirname, '../build');
//         const distPath = path.join(__dirname, '../geact-serverless/dist');
//         const distBuildPath = path.join(distPath, './build');
//         const isDistExisting = await fs.existsSync(distPath);
//         const isDistBuildExisting = await fs.existsSync(distBuildPath);
//         if (!isDistExisting) {
//             await fs.mkdirSync(distPath);
//             if (!isDistBuildExisting) {
//                 await fs.mkdirSync(distBuildPath);
//             }
//         }

//         const buildFiles = await fs.readdirSync(
//             buildPath
//         );
//         buildFiles.forEach(async filename => {
//             if (filename === 'static') return;
//             await fs.copyFileSync(
//                 path.join(buildPath, `./${filename}`),
//                 path.join(distBuildPath, `./${filename}`)
//             );
//         });
//         const cssFiles = await fs.readdirSync(path.join(buildPath, './static/css'));
//         const isDistBuildCssExisting = await fs.existsSync(distBuildPath, './static/css')
//         cssFiles.forEach(async filename => {
//             await fs.copyFileSync()
//         })
//         const jsFiles = await fs.readdirSync(path.join(buildPath, './static/js'));
//     } catch (e) {
//         throw new Error(e);
//     }
// };

const copySsr = async () => {
    try {
        const distPath = path.join(__dirname, '../geact-serverless/dist');
        const distSsrPath = path.join(distPath, './ssr');
        const isDistExisting = await fs.existsSync(distPath);
        const isDistSsrExisting = await fs.existsSync(distSsrPath);
        if (!isDistExisting) {
            await fs.mkdirSync(distPath);
            if (!isDistSsrExisting) {
                await fs.mkdirSync(distSsrPath);
            }
        }

        const ssrIndex = path.join(__dirname, '../server/ssr/index.js');
        const serverlessDistSsrIndex = path.join(
            __dirname,
            '../geact-serverless/dist/ssr/index.js'
        );
        const serverlessSsrIndex = path.join(
            __dirname,
            '../geact-serverless/src/ssr/index.js'
        );
        await fs.copyFileSync(ssrIndex, serverlessDistSsrIndex);
        await fs.copyFileSync(ssrIndex, serverlessSsrIndex);
    } catch (e) {
        throw new Error(e);
    }
};

const main = async () => {
    try {
        // await copyBuild();
        await copySsr();
    } catch (e) {
        throw new Error(e);
    }
};

main();
