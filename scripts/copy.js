const path = require('path');
const fs = require('fs');

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.APP_ENV = 'server';

require('../config/env');

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

const copyAssetManifest = async () => {
    const serverlessManifestPath = path.join(
        __dirname,
        '../geact-serverless/src/manifest.json'
    );
    const serverlessDistPath = path.join(__dirname, '../geact-serverless/dist');
    try {
        const assetManifest = require('../build/asset-manifest.json');
        let assetManifestWithCDN = {};
        const keys = Object.keys(assetManifest);
        keys.forEach(key => {
            assetManifestWithCDN[key] = `${
                process.env.REACT_APP_BUILD_S3_CLOUD_FRONT_URL
            }${assetManifest[key]}`;
        });
        await fs.writeFileSync(
            serverlessManifestPath,
            JSON.stringify(assetManifestWithCDN)
        );
        const isServerlessDistExisting = await fs.existsSync(
            serverlessDistPath
        );
        if (!isServerlessDistExisting) {
            await fs.mkdirSync(serverlessDistPath);
        }
        await fs.writeFileSync(
            path.join(serverlessDistPath, './manifest.json'),
            JSON.stringify(assetManifestWithCDN)
        );
    } catch (e) {
        throw new Error(e);
    }
};

const copySsr = async () => {
    const serverlessSsrIndexJs = path.join(
        __dirname,
        '../geact-serverless/src/ssr/index.js'
    );
    const serverlessDistSsr = path.join(
        __dirname,
        '../geact-serverless/dist/ssr'
    );
    try {
        const isServerlessDistSsrExisting = await fs.existsSync(
            serverlessDistSsr
        );
        if (!isServerlessDistSsrExisting) {
            await fs.mkdirSync(serverlessDistSsr);
        }
        await fs.copyFileSync(
            serverlessSsrIndexJs,
            path.join(serverlessDistSsr, './index.js')
        );
    } catch (e) {
        throw new Error(e);
    }
};

const main = async () => {
    try {
        // await copyBuild();
        await copyAssetManifest();
        await copySsr();
    } catch (e) {
        throw new Error(e);
    }
};

main();
