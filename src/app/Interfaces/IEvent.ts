export default interface IEvent {
    EventId: Number;
    CalendarId: Number;
    EventTitle: string;
    EventDescription: string;
    EventStart: Date; // NOTE - Might need to enforce a specific format
    EventEnd: Date;  // NOTE - Might need to enforce a specific format
}