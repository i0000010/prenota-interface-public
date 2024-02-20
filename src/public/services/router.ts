import { Router } from 'express';
import { getServicesController, getActiveServicesController, getServiceController } from './controllers.js';
export const router = Router();

router.get('', getServicesController)
router.get('/active', getActiveServicesController)
router.get('/:serviceId', getServiceController)

// router.get('/:serviceId',
//     (req: Request, res: Response, next: NextFunction) => {
//         res.send('prenota services serviceId')
//     }
// )

// router.get('/reasons-for-visit',
//     (req: Request, res: Response, next: NextFunction) => {
//         res.send('prenota services reasons-for-visit')
//     }
// )