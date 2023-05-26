import bcrypt from "bcrypt";

const saltRounds = 10;

// create a hash
export const createHash = (valueToHash: string): string =>
  bcrypt.hashSync(valueToHash, saltRounds);

export const compareHash = (
  valueToCompare: string,
  hashValue: string
): boolean => {
  bcrypt.genSaltSync(saltRounds);
  return bcrypt.compareSync(valueToCompare, hashValue);
};
