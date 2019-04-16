process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

require('../config/env');
require('dotenv').config();

const path = require('path');
const fs = require('fs');
const awsSdk = require('aws-sdk');

const {
    REACT_APP_AWS_KEY_ID: awsAccessKeyId,
    REACT_APP_AWS_SECRET: awsSecret,
    REACT_APP_S3_BUCKET_NAME: s3BucketName,
} = process.env;

awsSdk.config.update({
    region: 'ap-northeast-2',
    credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecret,
    },
});

const s3 = new awsSdk.S3();

async function uploadToS3() {
    const buildPath = path.join(__dirname, '../build');
    // console.log(buildPath);
    // const staticBuildDirPath = path.join(__dirname, './build/static')
    const cssPath = path.join(__dirname, '../build/static/css');
    const jsPath = path.join(__dirname, '../build/static/js');
    const mediaPath = path.join(__dirname, '../build/static/media');
    try {
        const files = await fs.readdirSync(buildPath);
        // console.log(files);
        files.forEach(async filename => {
            if (filename === 'static') return;
            const targetfile = await fs.readFileSync(
                path.join(buildPath, `./${filename}`)
            );
            const params = {
                Bucket: s3BucketName,
                Key: `build/${filename}`,
                Body: targetfile,
                ContentType: 'text/plain',
            };
            const result = await s3.putObject(params).promise();
            console.log(result);
        });
        const cssfiles = await fs.readdirSync(cssPath);
        cssfiles.forEach(async filename => {
            const targetfile = await fs.readFileSync(
                path.join(cssPath, `./${filename}`)
            );
            const params = {
                Bucket: s3BucketName,
                Key: `build/static/css/${filename}`,
                Body: targetfile,
                ContentType: 'text/css',
            };
            const result = await s3.putObject(params).promise();
            console.log(result);
        });
        const jsfiles = await fs.readdirSync(jsPath);
        jsfiles.forEach(async filename => {
            const targetfile = await fs.readFileSync(
                path.join(jsPath, `./${filename}`)
            );
            const params = {
                Bucket: s3BucketName,
                Key: `build/static/js/${filename}`,
                Body: targetfile,
                ContentType: 'text/javascript',
            };
            const result = await s3.putObject(params).promise();
            console.log(result);
        });
        const mediaExists = await fs.existsSync(mediaPath);
        if (mediaExists) {
            const mediafiles = await fs.readdirSync(mediaPath);
            mediafiles.forEach(async filename => {
                const targetfile = await fs.readFileSync(
                    path.join(mediaPath, `./${filename}`)
                );
                const params = {
                    Bucket: s3BucketName,
                    Key: `build/static/media/${filename}`,
                    Body: targetfile,
                    ContentType: 'image/jpeg',
                };
                const result = await s3.putObject(params).promise();
                console.log(result);
            });
        }
    } catch (e) {
        throw new Error(e);
    }
}

uploadToS3();

module.exports = { uploadToS3 };
