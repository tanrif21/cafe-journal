import {neon} from '@neondatabase/serverless';
export function postgresAdapter(query){return{prepare(sql){let i=0;const statement=sql.replace(/\?/g,()=>'$'+(++i));return{bind(...params){return{async first(){const result=await query(statement,params);return result.rows[0]??null},async run(){const result=await query(statement,params);return{meta:{changes:result.rowCount??0}}}}}}}}}
export function getDatabase(url){if(!url)return null;const sql=neon(url,{fullResults:true});return postgresAdapter((text,params)=>sql.query(text,params,{fullResults:true}))}
