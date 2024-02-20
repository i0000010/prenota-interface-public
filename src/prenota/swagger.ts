import AccountsSchema from './accounts/swagger.js';
import AuthSchema from './auth/swagger.js';
import DatesSchema from './dates/swagger.js';
import TimeslotsSchema from './timeslots/swagger.js';
import ReservationsSchema from './reservations/swagger.js';

const paths = {
    ...AccountsSchema.paths,
    ...AuthSchema.paths,
    ...DatesSchema.paths,
    ...TimeslotsSchema.paths,
    ...ReservationsSchema.paths,
}

const schemas = {
    ...AccountsSchema.schemas,
    ...AuthSchema.schemas,
    ...DatesSchema.schemas,
    ...TimeslotsSchema.schemas,
    ...ReservationsSchema.schemas,
}

export default {
    paths,
    schemas,
}