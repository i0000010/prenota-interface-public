import { Request, Response, NextFunction } from 'express';
import { Page, Dialog } from 'puppeteer';
import { sessionRepository, Session } from '../cache/models/session.js'

import { NAVIGATION_TIMEOUT } from '../../config.js';

export function goTo(page: Page, url: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await page.goto(url, { timeout: NAVIGATION_TIMEOUT })
        .then(() => {
            next();
        })
        .catch((err: Error) => {
            next(err);
        });
    }
}

export function click(page: Page, selector: string, waitForNavigation: boolean = false) {
    // throws error if selector is not found
    return async (req: Request, res: Response, next: NextFunction) => {

        // Check if selector element exists on page
        const elem = await page.$(selector);
        if (!elem) {
            const err  = new Error(`${selector} not found in page at ${page.url()}`);
            next(err);
            return;
        }
        await page.click(selector).then(async () => {
            // if the page needs to wait for redirect
            // this is not appropriate when clicking a link, but more for
            // clicking a button that triggers a redirect that takes a long time.
            if (waitForNavigation) {
                await page.waitForNavigation();
            }
            next();
        }).
        catch((err: Error) => {
            next(err);
        });
    };
}
export function type(page: Page, selector: string, key: string) {
    return async(req: Request, res: Response, next: NextFunction) => {
        const value = req.body[key];
        const elem = await page.$(selector);
        if (!elem) {
            const err = new Error(`${selector} not found in page at ${page.url()}`);
            next(err);
            return;
        }
        await page.type(selector, value).then(() => {
            next();
        })
        .catch((err: Error) => {
            next(err);
        })
    }
}

export function setValue(page: Page, selector: string, key: string) {

    return async (req: Request, res: Response, next: NextFunction) => {

        // const value = req.body[selector];
        const value = req.body[key];
        // const value = req.body.selectors[selector];

        // ensure selector element exists on page
        const elem = await page.$(selector);
        if (!elem) {
            const err = new Error(`${selector} not found in page at ${page.url()}`);
            next(err);
            return;
        }
        
        /* istanbul ignore next */
        await page.evaluate((selector, value) => {
            const element = document.querySelector(selector) as HTMLInputElement;
            element.value = value;
        }, selector, value).then(() => {
            next();
        }).catch((err: Error) => {
            if (err.message.includes('cov_')) {
                // coverage error from conflict between jest and puppeteer. ignore.
                next();
                return
            }
            next(err);
        });
    };
}

export function check(page: Page, selector: string) {
    return async (req: Request, res: Response, next: NextFunction) => {

        // Check if selector element exists on page
        const elem = await page.$(selector);
        if (!elem) {
            const err = new Error(`${selector} not found in page at ${page.url()}`);
            next(err);
            return;
        }

        /* istanbul ignore next */
        await page.evaluate((selector) => {
            const element = document.querySelector(selector) as HTMLInputElement;
            element.checked = true;
        }, selector).then(() => {
            next();
        }).catch((err: Error) => {
            if (err.message.includes('cov_')) {
                // coverage error from conflict between jest and puppeteer. ignore.
                next();
                return
            }
            next(err.message);
        });
    }
}

export function closeModal(page: Page){
    return async (req: Request, res: Response, next: NextFunction) => {
        await page.waitForSelector('#register-modal')
        .then(async () => {
            const modal = await page.$('#register-modal');

            if (modal) {
                // delete modal
                /* istanbul ignore next */
                modal.evaluate((modal: any) => {
                    modal.remove();
                })
                .catch((err: Error) => {
                    if (err.message.includes('cov_')) {
                        // coverage error from conflict between jest and puppeteer. ignore.
                        return
                    }
                    next(err);
                });
            };

            const modalBackdrop = await page.$('.modal-backdrop');
            if (modalBackdrop) {
                // delete modal backdrop
                /* istanbul ignore next */
                modalBackdrop.evaluate((modalBackdrop: any) => {
                    modalBackdrop.remove()
                })
                .catch((err: Error) => {
                    if (err.message.includes('cov_')) {
                        // coverage error from conflict between jest and puppeteer. ignore.
                        return
                    } else {
                        next(err);
                    }
                });
            };
            next();
        }).catch((err: Error) => {
            next(err);
        });
    }
}

export function selectByText(page: Page, selector: string, key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {

        // const text = req.body[selector]
        const text = req.body[key];

        /* istanbul ignore next */
        await page.evaluate(async (selector, text) => {
            const element = document.querySelector(selector) as HTMLSelectElement;
            if (element) {
                // const option = element.querySelector(`option[label="${text}"]`) as HTMLOptionElement;
                const option = element.querySelector(text) as HTMLOptionElement;
                if (option) {
                    option.selected = true;
                    element.dispatchEvent(new Event('change'));
                } else {
                    throw new Error(`${text} not found for element ${selector}`);
                }
            } else {
                throw new Error(`${selector} not found in page at ${window.location.href}`);
            }
        }, selector, text).then(() => {
            next();
        })
        .catch((err: Error) => {
            if (err.message.includes('cov_')) {
                // coverage error from conflict between jest and puppeteer. ignore.
                next();
                return
            }
            next(err);
        });
    }
}

export function selectByValue(page: Page, selector: string, key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {

        // const value = req.body[selector]
        const value = req.body[key];
        const text = `option[value="${value}"]`;

        /* istanbul ignore next */
        await page.evaluate(async (selector, text) => {
            const element = document.querySelector(selector) as HTMLSelectElement;
            if (element) {
                // const option = element.querySelector(`option[label="${text}"]`) as HTMLOptionElement;
                const option = element.querySelector(text) as HTMLOptionElement;
                if (option) {
                    option.selected = true;
                    element.dispatchEvent(new Event('change'));
                } else {
                    throw new Error(`${text} not found for element ${selector}`);
                }
            } else {
                throw new Error(`${selector} not found in page at ${window.location.href}`);
            }
        }, selector, text).then(() => {
            next();
        })
        .catch((err: Error) => {
            if (err.message.includes('cov_')) {
                // coverage error from conflict between jest and puppeteer. ignore.
                next();
                return
            }
            next(err);
        });
    }
}

export function acceptDialog(page: Page) {
    return (req: Request, res: Response, next: NextFunction) => {

        const dialogHandler = (dialog: Dialog) => {
            dialog.accept();
            page.off('dialog', dialogHandler);
        };

        page.on('dialog', dialogHandler);

        next();
    }
}

export function additionalApplicants(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const typeofbooking = req.body.typeofbooking;
        if (typeofbooking === 1) {
            next();
            return;
        }

        // select number of additional applicants
        const additionalApplicants = req.body.additionalApplicants;

        const selector = '#ddlnumberofcompanions';
        const text = `option[value="${additionalApplicants.length}"]`;

        // page.click(selector);

        await page.evaluate(async (selector, text) => {
            const element = document.querySelector(selector) as HTMLSelectElement;
            if (element) {
                // const option = element.querySelector(`option[label="${text}"]`) as HTMLOptionElement;
                const option = element.querySelector(text) as HTMLOptionElement;
                if (option) {
                    option.selected = true;
                    element.dispatchEvent(new Event('change'));
                } else {
                    throw new Error(`${text} not found for element ${selector}`);
                }
            } else {
                throw new Error(`${selector} not found in page at ${window.location.href}`);
            }
        }, selector, text)
        .catch((err: Error) => {
            if (err.message.includes('cov_')) {
                // coverage error from conflict between jest and puppeteer. ignore.
                next();
                return
            }
            next(err);
        });

        // Add additional applicant details
        for (let i = 0; i < additionalApplicants.length; i++) {
            const surnameElementId = `#Accompagnatori_${i}__CognomeAccompagnatore`;
            const nameElementId = `#Accompagnatori_${i}__NomeAccompagnatore`;
            const dobElementId = `#Accompagnatori_${i}__DataNascitaAccompagnatore`;

            let selector = surnameElementId;
            let value = req.body.additionalApplicants[i].surname;
            await page.evaluate((selector, value) => {
                const element = document.querySelector(selector) as HTMLInputElement;
                element.value = value;
            }, selector, value).then(() => {
                next();
            }).catch((err: Error) => {
                if (err.message.includes('cov_')) {
                    // coverage error from conflict between jest and puppeteer. ignore.
                    next();
                    return
                }
                next(err);
            });

            selector = nameElementId;
            value = req.body.additionalApplicants[i].name;
            await page.evaluate((selector, value) => {
                const element = document.querySelector(selector) as HTMLInputElement;
                element.value = value;
            }, selector, value).then(() => {
                next();
            }).catch((err: Error) => {
                if (err.message.includes('cov_')) {
                    // coverage error from conflict between jest and puppeteer. ignore.
                    next();
                    return
                }
                next(err);
            });

            selector = dobElementId;
            value = req.body.additionalApplicants[i].birthDate;
            await page.type(selector, value)
                    .catch((err: Error) => {
                        next(err);
                    });
        }
        next();
    }
}

export function uploadFile(page: Page, selector: string, key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const passportFilePath = req.body[key];
        const value = req.body[key];
        const element = await page.$('input[type="file"]');
        if (!element) {
            const err = new Error(`${selector} not found in page at ${page.url()}`);
            next(err);
            return;
        }
        await element.uploadFile(passportFilePath).then(() => {
            next();
        })
        .catch((err: Error) => {
            next(err);
        })
    }
}

export function wait(page: Page, timeout: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await page.waitForTimeout(timeout).then(() => {
            next();
        }).catch((err: Error) => {
            next(err);
        });
    };
}

export function setPageSession(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const email: string = req.body.email;
        const session: Session = await sessionRepository.fetch(email) as Session;
        if (!session.cookies) {
            const error = new Error(`Session for ${email} not found in redis`);
            next(error);
        } else {
            const cookies = JSON.parse(session.cookies);
            await page.setCookie(...cookies);
            next();
        }
    }
}

export function clearCookies(page: Page) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cookies = await page.cookies();
        await page.deleteCookie(...cookies);
        next();
    }
}