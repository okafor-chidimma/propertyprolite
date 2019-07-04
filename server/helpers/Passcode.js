import bcrypt from 'bcrypt';
// to hash passwords on registration and verify passwords for login

class Passcode {
  static async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}
export default Passcode;
