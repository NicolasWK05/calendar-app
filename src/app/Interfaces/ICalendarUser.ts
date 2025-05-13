export default interface ICalendarUser {
    CalendarId: Number;
    UserId: Number;
    Permissions: Number; // TODO - Calculate permissions based on a bitmask, or assign enum values
}