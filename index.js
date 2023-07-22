const fs = require('fs');
const path = require("path");
const AdmZip = require("adm-zip");
const core = require("@actions/core");
const FormData = require("form-data");
const fetch = require("node-fetch");

let serverURL = core.getInput('server_url');
const repoFullName = core.getInput('repo_name');
const actionToken = core.getInput('action_token');
if (serverURL === '') {
    serverURL = 'http://127.0.0.1:5050';
}

(async () => {
    if (repoFullName.split('/').length !== 2) {
        core.setFailed('Invalid repo full name');
        return;
    }

    const destPath = path.join(process.env.GITHUB_WORKSPACE, 'dest.zip');
    console.log('Zipping files to ' + destPath);

    const zip = new AdmZip();
    zip.addLocalFolder(process.env.GITHUB_WORKSPACE);
    zip.writeZip(destPath);

    console.log(`Zipped file ${destPath} successfully`);
    console.log(`Preparing multipart form-data...`);

    const form = new FormData();
    form.append('repo_name', repoFullName);
    form.append('action_token', actionToken);
    form.append('archive', fs.createReadStream(destPath));

    let res = await fetch(`${serverURL}/upload`, {
        method: 'POST', body: form
    });
    console.log(res);
})();
