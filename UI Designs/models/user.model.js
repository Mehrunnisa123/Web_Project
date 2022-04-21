const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User {
  constructor(email, password, fullname, Adress) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.Adress=Adress;
  }

  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
     Adress:this.Adress
    });
  }
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;