const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin"
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user"
  },
];

const userModel = {

  /* FIX ME (types) 😭 */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  /* FIX ME (types) 😭 */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
  findOrCreate: (id: number, name: string, email: string, username: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = database.find((user) => user.id === id);
        if (!user) {
          const newUser = {
            id: database.length + 1,
            name: name,
            email: email || `${username}@github.com`,
            password: "",
            role: "user"
          };
          database.push(newUser);
          resolve(newUser);
        } else {
          resolve(user);
        }
      }, 0); 
    });
  }
  
};

export { database, userModel };
