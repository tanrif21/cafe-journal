import fs from 'node:fs';import {spawnSync} from 'node:child_process';
for(const dir of ['api','lib','public'])for(const file of fs.readdirSync(dir))if(/\.(mjs|js)$/.test(file)){const r=spawnSync(process.execPath,['--check',dir+'/'+file],{stdio:'inherit'});if(r.status!==0)process.exit(1)}
JSON.parse(fs.readFileSync('vercel.json','utf8'));JSON.parse(fs.readFileSync('public/manifest.webmanifest','utf8'));if(fs.existsSync('public/index.html'))throw Error('The journal must be served through its protected route.');console.log('Vercel source and static files checked.');
