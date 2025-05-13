
/*
    Only exists while the invitation is pending.
    REVIEW - Should we add a status field to indicate if the invitation is accepted, rejected, or pending?
    REVIEW - Should we add a timestamp for when the invitation was sent?
*/
export default interface IEventInvitation {
    InvitationId: Number;
    SenderId: Number;
    RecipientId: Number;
    EventId: Number;
}