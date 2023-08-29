import bcrypt from 'bcrypt';

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export default {
  hashPassword,
  comparePassword,
};
