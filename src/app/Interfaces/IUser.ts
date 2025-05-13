export default interface IUser {
    UserId: Number;
    Username: string;
    PasswordHash: string; // TODO - Replace with JWT
    ProflePicture: string; // A URL to the profile picture hosted on the server
}