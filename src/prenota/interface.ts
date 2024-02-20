interface ICalendarRequestPayload {
    selectedDay: string;
    servizio: string;
}

interface ICalendarDay {
    dateLibere: string;
    slotLibere: number;
    slotRimanenti: number;
}

export interface ITimeslot {
    IDCalendarioGlobale: number;
    Data: string;
    IDCalendarioServizioGiornaliero: number;
    IDCalendarioServizioFasce: number;
    IDCalendarioServizioFascePersonalizzate: number | null;
    OrarioInizioFascia: {
        Hours: number;
        Minutes: number;
        Seconds: number;
        Milliseconds: number;
        Ticks: number;
        Days: number;
        TotalDays: number;
        TotalHours: number;
        TotalMilliseconds: number;
        TotalMinutes: number;
        TotalSeconds: number;
    };
    OrarioFineFascia: {
        Hours: number;
        Minutes: number;
        Seconds: number;
        Milliseconds: number;
        Ticks: number;
        Days: number;
        TotalDays: number;
        TotalHours: number;
        TotalMilliseconds: number;
        TotalMinutes: number;
        TotalSeconds: number
    };
    SlotLiberi: 1;
    SlotRimanenti: 0;
}

export interface INewBookingPayload {
    idCalendarioGiornaliero: number;
    selectedDay: string;
    selectedHour: string;
}

export interface IInvalidBookingResponse {
    result: string;
    url: string;
    errorMessage: string;
}

export interface IValidBookingResponse {
    result: string;
    url: string;
}

export interface ICancelBookingPayload {
    isConfirmed: boolean;
    idPren: number;
}

// Check isExpired field to see if the reservation is still valid
// If isExpired is true, the reservation is no longer valid
// If isExpired is false, the reservation is still valid
export interface IReservation {
    IDPrenotazione: number
    isExpired: boolean;
    isAvailable: false;
    CodicePrenotazione: string; // Eg - CONMIAM-20230718-631390
    ServizioConsolare: string; // Eg - Schengen or Study
    DescrizioneServizio: string; // Visa type
    DataPrenotazione: string; // DD Month YYYY
    DataPrenotazioneOrdine: string; // YYYYMMDD
    OraPrenotazione: string; // HH:MM
    IDTipoStatoPrenotazione: number;
    StatoPrenotazione: string; // Eg - Confirmed (not not mean the appointment is actually in confirmed status)
    StatoPrenotazioneOrdine: string; // Eg - 1
    isAnnullabile: boolean;
    isLavorata: boolean;
    NomeRichiedente: string; // Eg - Nancy Proturbante
    isContoTerzi: boolean;
}

// EX:
// "IDPrenotazione": 1658697,
// "isExpired": false,
// "isAvailable": false,
// "CodicePrenotazione": "CONMIAM-20230718-631390",
// "ServizioConsolare": "Schengen",
// "DescrizioneServizio": "Visa",
// "DataPrenotazione": "10 October 2023",
// "DataPrenotazioneOrdine": "20231010", // YYYYMMDD
// "OraPrenotazione": "10:55",
// "IDTipoStatoPrenotazione": 1,
// "StatoPrenotazione": "To be confirmed",
// "StatoPrenotazioneOrdine": "2",
// "isAnnullabile": true,
// "isLavorata": false,
// "NomeRichiedente": "Nancy Proturbante",
// "isContoTerzi": false

export interface IUser {
    email: string;
    password: string;
}

export interface IAppointment {
    IDPrenotazione: number, // for cancellation
    date: Date;
    service: number;
    user: IUser;
    confirmed: boolean;
    purchased: boolean;
    bookingPayload: INewBookingPayload; // for rebooking
}