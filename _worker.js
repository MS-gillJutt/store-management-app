
import { Router } from 'worktop';
import { listen } from 'worktop/cache';
import api from './functions/api';

const router = new Router();

router.add('*', '/', api.fetch);

listen(router.run);
