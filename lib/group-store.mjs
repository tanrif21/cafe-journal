const defaults={people:['Tanvir','Labib','Adeeb'],archived:[],visits:[]};
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store, private','Vary':'Cookie','X-Content-Type-Options':'nosniff'}});
const isName=n=>typeof n==='string'&&n.trim()===n&&n.length>0&&n.length<=50&&n.toLowerCase()!=='no treat';
const money=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0&&n<=1000000&&Math.abs(n*100-Math.round(n*100))<0.00001;
const text=(s,max,empty=true)=>typeof s==='string'&&s.length<=max&&(empty||s.trim().length>0);
export function validState(s){if(!s||!Array.isArray(s.people)||s.people.length>100||!s.people.every(isName)||new Set(s.people.map(n=>n.toLowerCase())).size!==s.people.length||!Array.isArray(s.archived)||new Set(s.archived).size!==s.archived.length||!s.archived.every(n=>s.people.includes(n))||!Array.isArray(s.visits)||s.visits.length>5000)return false;
const ids=new Set();for(const v of s.visits){if(!v||!text(v.id,100,false)||ids.has(v.id)||!text(v.date,10,false)||!/^\d{4}-\d{2}-\d{2}$/.test(v.date)||!Number.isFinite(Date.parse(v.date))||new Date(v.date).toISOString().slice(0,10)!==v.date||!text(v.place,100,false)||!text(v.food,150,false)||!text(v.notes,250)||!s.people.includes(v.collector)||!money(v.snacks)||!money(v.cha))return false;for(const field of ['snackBy','chaBy']){const names=Array.isArray(v[field])?v[field]:v[field]==='No treat'?[]:[v[field]];if(names.length>100||new Set(names).size!==names.length||!names.every(n=>s.people.includes(n)))return false}ids.add(v.id)}return true}
export async function groupRequest(request,db){try{const uid=request.headers.get('x-cafe-group-member');if(!uid)return json({error:'Sign in to access your group.'},401);if(!db)return json({error:'Shared database is not available yet.'},503);
if(request.method==='GET'){const row=await db.prepare('SELECT state, revision, updated_at FROM cafe_group WHERE id = ?').bind('main').first();return json(row?{...JSON.parse(row.state),revision:row.revision,updatedAt:row.updated_at}:{...defaults,revision:0,updatedAt:null})}
if(request.method!=='PUT')return json({error:'Method not allowed.'},405);
const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return json({error:'Request origin not allowed.'},403);
const raw=await request.text();if(raw.length>2000000)return json({error:'Your group is too large to save.'},413);let body;try{body=JSON.parse(raw)}catch{return json({error:'Invalid request.'},400)}
if(!Number.isSafeInteger(body.revision)||body.revision<0||!validState(body.state))return json({error:'Some entries are invalid. Check names, dates and amounts.'},400);
const state=JSON.stringify({people:body.state.people,archived:body.state.archived,visits:body.state.visits}),now=new Date().toISOString();let result;
if(body.revision===0)result=await db.prepare('INSERT INTO cafe_group (id, state, revision, updated_at, updated_by) VALUES (?, ?, 1, ?, ?) ON CONFLICT(id) DO NOTHING').bind('main',state,now,uid).run();
else result=await db.prepare('UPDATE cafe_group SET state = ?, revision = revision + 1, updated_at = ?, updated_by = ? WHERE id = ? AND revision = ?').bind(state,now,uid,'main',body.revision).run();
if(!result.meta?.changes)return json({error:'Someone updated the group. Refresh, then try your change again.'},409);return json({revision:body.revision+1,updatedAt:now});
}catch{return json({error:'Could not reach the shared database. Please try again.'},500)}}
