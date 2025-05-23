export default interface IUser {
    UserId: number;
    Username: string;
    PasswordHash: string; // TODO - Replace with JWT
    ProflePicture: string; // A URL to the profile picture hosted on the server
}