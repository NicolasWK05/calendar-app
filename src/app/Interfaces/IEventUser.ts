export default interface IEventUser {
    UserId: Number;
    EventId: Number;
    Permissions: Number; // REVIEW - Calculate permissions based on a bitmask, or assign enum values
}