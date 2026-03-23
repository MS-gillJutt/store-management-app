
import { Router } from 'worktop';

const router = new Router();

router.add('*', '/', async (req, res) => {
  try {
    const { default: api } = await import('./functions/api.js');
    return await api.fetch(req, res);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
});

addEventListener('fetch', (event) => {
  event.respondWith(router.run(event));
});
