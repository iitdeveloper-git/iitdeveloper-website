import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return { name:'IITDEVELOPER', short_name:'IITDEVELOPER', description:'AI, cloud and software engineering for growing businesses.', start_url:'/', display:'standalone', background_color:'#071421', theme_color:'#00539C', icons:[{src:'/logo.png',sizes:'512x512',type:'image/png'}] }; }
