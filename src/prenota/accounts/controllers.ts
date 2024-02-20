import { Request, Response, NextFunction } from 'express'
import { goTo, wait, closeModal, click, setValue, selectByValue, setPageSession } from '../../utils/browser/middleware.js'
import { connectMailbox, waitForLink, waitForPasswordResetLink } from '../../utils/mail/middleware.js'
import { NAVIGATION_TIMEOUT, API_URL } from '../../config.js'
import { RegisterAccountSchema, ConfirmRegistrationSchema, RelocationSchema, RelocationResponseSchema, ChangePasswordSchema } from './schema.js'
import timeout from 'connect-timeout'
import { catchAllErrors, validateSchema } from '../../middleware.js'
import { page } from '../../utils/browser/index.js'
import { getRandomNumber } from '../../middleware.js'

export const registerAccountController = [
    timeout(NAVIGATION_TIMEOUT),
    validateSchema(RegisterAccountSchema),
    connectMailbox(),
    goTo(page, `${API_URL}/Account/Register`),
    closeModal(page),
    setValue(page, '#Name', 'name'),
    setValue(page, '#Surname', 'surname'),
    setValue(page, '#BirthPlace', 'birthPlace'),
    setValue(page, '#BirthDate', 'birthDate'),
    setValue(page, '#Email', 'email'),
    setValue(page, '#Password', 'password'),
    setValue(page, '#ConfirmPassword', 'password'),
    setValue(page, '#HomeAddress', 'homeAddress'),
    setValue(page, '#CAP', 'cap'),
    setValue(page, '#Town', 'town'),
    selectByValue(page, '#Nation', 'nation'),
    setValue(page, '#prefix', 'prefix'),
    setValue(page, '#PhoneNumber', 'phoneNumber'),
    selectByValue(page, '#Consulate', 'consulate'),
    click(page, '#PersonalDataAgreement'),
    click(page, '#btnRegister'),
    waitForLink(),
    catchAllErrors()
]

export const confirmAccountRegistrationController = [
    (req: Request, res: Response, next: NextFunction) => {
        console.log('did it work?')
        next()
    },
    validateSchema(ConfirmRegistrationSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      const link = req.body.link;
      await page.goto(link);
      const url = page.url();
      if (url === link) {
        res.send({success: true});
      } else {
        next(new Error('Link not valid'));
      }
    },
    catchAllErrors(),
]

export const relocateController = [
    validateSchema(RelocationSchema),
    setPageSession(page),
    // requireLoggedIn(page),
    goTo(page, `${API_URL}/Relocation`),
    selectByValue(page, '#IDPaese', 'IDPaese'),
    wait(page, getRandomNumber(1000,2000)),
    selectByValue(page, '#IDSede', 'IDSede'),
    click(page, '#btnSubmit'),
    // wait(page,1000),
    async (req: Request, res: Response, next: NextFunction) => {
        const successUrl = `${API_URL}/`;
        const failureUrl = `${API_URL}/Relocation/ChangeError`;
        const errorUrl = 'https://prenotami.esteri.it/Relocation/ChangeError?active=activeReservations';
        if (page.url() !== successUrl && page.url() !== failureUrl && page.url() !== errorUrl) {
            await page.waitForNavigation();
        }
    
        const url = page.url();
    
        if (url === successUrl) {
            // changed to new consulate
            const payload = {
                email: req.body.email,
                IDUtente: req.body.IDUtente,
                IDPaese: req.body.IDPaese,
                IDSede: req.body.IDSede,
                success: true
            };
            const { error, value } = RelocationResponseSchema.validate(payload);
            if (error) {
                next(error);
            } else {
                res.send(value);
            }
        } else if (url === failureUrl) {
            // tried to change to the current consulate
            const payload = {
                email: req.body.email,
                IDUtente: req.body.IDUtente,
                IDPaese: req.body.IDPaese,
                IDSede: req.body.IDSede,
                success: false
            };
            const { error, value } = RelocationResponseSchema.validate(payload);
            if (error) {
                next(error);
            } else {
                res.send(value);
            }
        } else if (url === errorUrl) {
            const error = new Error(`Failed to change consulate. ${req.body.email} has active reservations.`);
            next(error);
        } else {
            // failed to change consulates. likely due to confirmed appointments
            const error = new Error(`Failed to change consulate, but not sure why.`);
            next(error);
        }
    },
    catchAllErrors(),
]

export const changePasswordController = [
    validateSchema(ChangePasswordSchema),
    connectMailbox(),
    goTo(page, 'https://prenotami.esteri.it/Account/ForgotPassword'),
    setValue(page, '#Email', 'email'),
    click(page, '.button'),
    waitForPasswordResetLink(),
    async (req: Request, res: Response, next: NextFunction) => {
        const link = res.locals.resetPasswordLink;
        await page.goto(link);
        next();
    },
    setValue(page, '#Email', 'email'),
    setValue(page, '#Password', 'password'),
    setValue(page, '#ConfirmPassword', 'password'),
    click(page, '.button'),
    catchAllErrors(),

]